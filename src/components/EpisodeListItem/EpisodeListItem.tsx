import * as React from "react";
import { PodcastEpisodeData } from "../../shared/interfaces";
import './EpisodeListItem.css';
import pauseIcon from '../../assets/episode_item/pause.svg';
import playIcon from '../../assets/episode_item/play.svg';
import AudioPlayer from "../../utils/AudioPlayer";
import { playerStore } from "../../redux/playerStore";
import TimeAgo from "../../utils/TimeAgo";

export interface Props {
    children?: React.ReactNode;
    episode: PodcastEpisodeData;
}

export interface State {
    titleData: string;
    isPlaying: boolean;
}

export default class EpisodeListItem extends React.Component<Props, State> {
    
    private titleRef = React.createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);

        this.state = {
            titleData: "",
            isPlaying: false,
        }
    }
    
    playerButton_onClick = () => {
        if (AudioPlayer.getInstance().episodeIsPlaying(this.props.episode)) {
            AudioPlayer.getInstance().pause();
        }
        else {
            AudioPlayer.getInstance().playEpisode(this.props.episode);
        }
    }
    
    componentDidMount() {        
        let titleData = '';

        if (this.titleRef.current !== null) {
            const currentTitle = this.titleRef.current;
            titleData = currentTitle.scrollWidth > currentTitle.offsetWidth ? this.props.episode.title : "";
        }
        if (titleData !== '') this.setState({titleData: titleData});

        playerStore.subscribe(() => {
            const isPlaying = AudioPlayer.getInstance().episodeIsPlaying(this.props.episode);
            this.setState({
                isPlaying: isPlaying
            })
        });
    }

    render() {
        const playerButtonIcon = this.state.isPlaying ? pauseIcon : playIcon;
        const episode: PodcastEpisodeData = this.props.episode;
        const playerButtonStyle = {backgroundImage: 'url(' + playerButtonIcon + ')'};

        const time = TimeAgo.timeAgo(new Date(episode.publishDate));

        return (
            <div className={'episodeListItem_block'}>
                <button className={'episodeListItem_playerButton'} 
                style={playerButtonStyle}
                onClick={this.playerButton_onClick}></button>
                <div className={'episodeListItem_title'}>{ episode.title }</div>
                <div className={'episodeListItem_description'}>{ episode.description }</div>
                <div className={'episodeListItem_date'}>{ time }</div>
            </div> 
        )
    }
}

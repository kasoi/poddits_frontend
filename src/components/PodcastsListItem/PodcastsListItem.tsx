import * as React from "react";
import { PodcastEpisodeData } from "../../shared/interfaces";
import "./PodcastsListItem.css";
import TimeAgo from "../../utils/TimeAgo";
import AudioPlayer from "../../utils/AudioPlayer";
import pauseIcon from '../../assets/episode_item/pause.svg';
import playIcon from '../../assets/episode_item/play.svg';
import { playerStore } from "../../redux/playerStore";
import { Link } from "react-router-dom";

export interface Props {
    children?: React.ReactNode;
    data: PodcastEpisodeData;
}

export interface State {
    titleData: string;
    isPlaying: boolean;
}

export default class PodcastsListItem extends React.Component<Props, State> {

    private titleRef = React.createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);

        this.state = {
            titleData: "",
            isPlaying: false
        }
    }

    componentDidMount() {        
        let titleData = '';

        if (this.titleRef.current !== null) {
            const currentTitle = this.titleRef.current;
            titleData = currentTitle.scrollWidth > currentTitle.offsetWidth ? this.props.data.title : "";
        }
        if (titleData !== '') this.setState({titleData: titleData});

        playerStore.subscribe(() => {
            const isPlaying = AudioPlayer.getInstance().episodeIsPlaying(this.props.data);
            this.setState({
                isPlaying: isPlaying
            })
        });
    }

    playerButton_onClick = () => {
        if (AudioPlayer.getInstance().episodeIsPlaying(this.props.data)) {
            AudioPlayer.getInstance().pause();
        }
        else {
            AudioPlayer.getInstance().playEpisode(this.props.data);
        }
    }

    render() {
        const data = this.props.data; 
        // TODO: fix it
        const thumbUrl = data.thumbnail.replace("30x30", "120x120");
        const date: Date = new Date(data.publishDate);
        const dateText = date.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'});

        let titleData = this.state.titleData;
        if (this.titleRef.current !== null) {
            const currentTitle = this.titleRef.current;
            titleData = currentTitle.scrollWidth > currentTitle.offsetWidth ? data.title : "";
        }

        const playerButtonIcon = this.state.isPlaying ? pauseIcon : playIcon;
        const playerButtonStyle = {backgroundImage: 'url(' + playerButtonIcon + ')'};
        
        return (
            <div className={"container"}>
                <Link to={`/podcast/${data.podcastId}`}><img src={thumbUrl} alt={"thumbnail"} className={"image"} /></Link>
                <button className={'podcastListItem_playerButton'} 
                    style={playerButtonStyle}
                    onClick={this.playerButton_onClick}></button>
                <div className={"title"} title={titleData} ref={this.titleRef}> {data.title}</div>
                <div className={"description"}>{ data.description }</div>
                <div className={"bottomDiv"}>
                    <span className={"dateColor"} title={dateText} >{ TimeAgo.timeAgo(date) }</span>&nbsp;
                    <span className={"dateColor"}>{ " by " }</span>
                    <Link to={`/podcast/${data.podcastId}`} className={"secondaryLink"}>{ data.name }</Link>
                </div>
            </div>
        )
    }
}

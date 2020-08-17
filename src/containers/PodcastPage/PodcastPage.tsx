import * as React from "react";
import axios from "axios";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { EpisodeData, PodcastEpisodeData, PodcastData } from "../../shared/interfaces";
import AudioPlayer from "../../utils/AudioPlayer";
import EpisodeList from "../../components/EpisodeList/EpisodeList";
import './PodcastPage.css';

interface PodcastPageProps {
    podcastId: string;
}

interface ComponentProps extends RouteComponentProps<PodcastPageProps> {
}

interface State {
    podcastData: PodcastData;
    episodes: PodcastEpisodeData[];
}

class PodcastPage extends React.Component<ComponentProps, State> {

    constructor(props: ComponentProps) {
        super(props);

        console.log(props.match.params.podcastId);
        

        this.state = {
            podcastData: {} as any,
            episodes: {} as any,
        }
    }

    async componentDidMount() {     
        const podcastId = this.props.match.params.podcastId;
        let podcast: PodcastData;

        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_PATH}/query/podcast/${podcastId}`);

            podcast = response.data[0] as PodcastData;   
            this.setState({podcastData: podcast});         
        } catch (e) {
            console.log('error:', e);
            
        }
        
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_PATH}/query/episode/${podcastId}`);

            const pudeEpisodes: EpisodeData[] = response.data;

            const episodes: PodcastEpisodeData[] = [];

            pudeEpisodes.forEach(episode => { episodes.push({...podcast, ...episode}); });
            
            if (AudioPlayer.getInstance().currentEpisodeIsNull()) {
                AudioPlayer.getInstance().setEpisode(episodes[0]);
            }

            const cut = episodes.slice(0, 50);
            this.setState({episodes: cut});
            
        } catch (e) {
            console.log("error catched: " + e);
        }
    }

    render() {
        let thumbUrl = '';
        const data = this.state.podcastData;
        if (data.thumbnail) thumbUrl = data.thumbnail.replace("30x30", "200x200");

        const tags = [];
        if (data.genres) {
            for (let i = 0; i < data.genres.length; i++) {
                const element = data.genres[i];
                const item = <Link to={`/genre/${element}`} className={'podcastPage_genreTag_link'} key={i}>{element}</Link>;
                tags.push(item);
            }
        }

        return (
            <div className={'podcastPage_content'}>
                <div className={'podcastPage_block'}>
                    <img src={ thumbUrl } className={'podcastPage_artwork'} alt={'artwork'} />
                    <div className={'podcastPage_podcast_info_block'}>
                        <div className={'podcastPage_title'}>{ data.name }</div>
                        <div className={'podcastPage_author'}>{ data.author }</div>
                        <div className={'podcastPage_tags'}>{ tags }</div>
                    </div>
                </div>
                <EpisodeList episodes={this.state.episodes}></EpisodeList>
            </div>
        )
    }
}

export default withRouter(PodcastPage);
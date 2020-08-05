import * as React from "react";
import axios from "axios";
import {PodcastEpisodeData} from "../../shared/interfaces";
import PodcastsList from "../../components/PodcastsList/PodcastsList";

export interface Props {
    children?: React.ReactNode
}

export interface State {
    podcasts: PodcastEpisodeData[];
}

export default class HomePage extends React.Component<Props, State> {

    currentPodcasts: PodcastEpisodeData[];

    constructor(props: Props) {
        super(props);

        this.currentPodcasts = [];

        this.state = {
            podcasts: this.currentPodcasts
        }
    }

    async componentDidMount() {
        console.log("Homepage did mount. Load podcast list");
        
        try {
            // const response = await axios.get("https://skatilsya.com/test/upwork/poddits/assets/podcast.php");
            const response = await axios.get("http://localhost:8010/query/podcast_episode");

            const episodes: PodcastEpisodeData[] = response.data;

            const cut = episodes.slice(0, 50);
            this.setState({podcasts: cut});
            
        } catch (e) {
            console.log("error catched: " + e);
        }
    }

    render() {
        return (
            <PodcastsList podcasts={this.state.podcasts}></PodcastsList>
        )
    }
}

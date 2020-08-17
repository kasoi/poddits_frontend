import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from 'axios';
import { PodcastEpisodeData } from "../../shared/interfaces";
import PodcastsList from "../../components/PodcastsList/PodcastsList";
import './SearchPage.css';

interface RouteInfo {
    topic: string;
}

interface State {
    searchQuery: string;
    podcasts: PodcastEpisodeData[];
    searchParam: string;
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {
}

class SearchPage extends React.Component<ComponentProps, State> {

    state: State;

    searchData: string;

    constructor(props: ComponentProps) {
        super(props);
        const params = new URLSearchParams(this.props.location.search);
        this.searchData = params.get("q") || '';

        this.state = {
            podcasts: [],
            searchParam: '',
            searchQuery: ''
        }
    }

    async componentDidUpdate(props: ComponentProps) {
        if (props.location.search === this.props.location.search) return;
        await this.loadPodcasts(this.props.location.search);
    }

    async componentDidMount() {
        await this.loadPodcasts(this.props.location.search);
    }

    async loadPodcasts(query: string) {

        if(query === undefined || query === '') return;
        
        const params = new URLSearchParams(query);
        this.searchData = params.get("q") || '';

        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_PATH}/query/search/${this.searchData}`);

            const podcasts: PodcastEpisodeData[] = response.data;

            const cut = podcasts.slice(0, 50);
            this.setState({podcasts: cut, searchQuery: this.searchData, searchParam: query});
            
        } catch (e) {
            console.log("Search page: error catched: " + e);
        }
    }

    render() {

        const params = new URLSearchParams(this.props.location.search);
        this.searchData = params.get("q") || '';

        return (
            <div className={"searchPage"}>
                <h1>Search page</h1>
                {this.searchData === '' ? <div>Type something to search</div> : <div>Search query: {this.state.searchQuery}</div> }
                <br />
                <PodcastsList podcasts={this.state.podcasts} />
            </div>
        );
    };
};

export default withRouter(SearchPage);
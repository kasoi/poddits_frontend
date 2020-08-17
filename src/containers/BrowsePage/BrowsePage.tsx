import * as React from "react";
import axios from 'axios';
import { GenreData } from "../../shared/interfaces";
import './BrowsePage.css';
import BrowseLink from "../../components/ui/BrowseLink/BrowseLink";

interface Props {
    children?: React.ReactNode
}

interface State {
    genres: GenreData[];
}

export default class BrowsePage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            genres: []
        }
    }

    componentDidMount() {
        this.loadGenres();
    }

    async loadGenres() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_PATH}/query/genre`);

            const gens: GenreData[] = response.data;

            console.log('genres:', gens);

            this.setState({genres: gens});
        } catch (e) {
            console.log("Search page: error catched: " + e);
        }
    }

    render() {

        const links: any[] = [];
        for (let index = 0; index < this.state.genres.length; index++) {
            const genre = this.state.genres[index];
            const element = <BrowseLink url={`/genre/${genre.genre}`} text={genre.genre} key={index} />;
            links.push(element);
        }

        return (
            <div className={"browserPage"}><h2>Select your favorite genre</h2><p>{ links }</p></div>
        )
    }
}

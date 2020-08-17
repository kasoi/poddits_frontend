import * as React from "react";
import { PodcastEpisodeData } from "../../shared/interfaces";
import EpisodeListItem from "../EpisodeListItem/EpisodeListItem";
import './EpisodeList.css';

export interface Props {
    children?: React.ReactNode;
    episodes: PodcastEpisodeData[];
}

export interface State {
}

export default class EpisodeList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        const list = [];
        for (let i = 0; i < this.props.episodes.length; i++) {
            const ep = this.props.episodes[i];
            const item = <EpisodeListItem episode={ep} key={i}></EpisodeListItem>;
            list.push(item);
        }

        return (
            <div className={'episodeList_content'}>{ list }</div>
        )
    }
}

import * as React from "react";
import { PodcastEpisodeData } from "../../shared/interfaces";
import PodcastsListItem from "../PodcastsListItem/PodcastsListItem";
import "./PodcastsList.css";

export interface Props {
    children?: React.ReactNode;
    podcasts: PodcastEpisodeData[];
}

export interface State {
    podcasts: PodcastEpisodeData[];
}

export default class PodcastsList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);        

        this.state = {
            podcasts: this.props.podcasts,
        }
    }

    render() {
        const items = [];

        let content = <div className={'podcastsList_content'}>Loading content...</div>;

        if (this.props.podcasts) {
            for (let index = 0; index < this.props.podcasts.length; index++) {
                const podcast = <PodcastsListItem data={this.props.podcasts[index]} key={index} />;
                items.push(podcast);
            }

            content = <div className={'podcastsList_content'}>{ items }</div>;
        }

        return (
            content
        )
    }
}

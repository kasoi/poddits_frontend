import * as React from "react";
import { PodcastEpisodeData } from "../../../shared/interfaces";
import './SoundPlayerTrackInfo.css';
import { Link } from "react-router-dom";

export interface Props {
    children?: React.ReactNode,
    episode: PodcastEpisodeData
}

export interface State {
}

export default class SoundPlayerTrackInfo extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {

        return (
            <div className={"soudplayer__track-info__block"}>
                <Link to={`/podcast/${this.props.episode.podcastId}`} style={{backgroundImage: `url(${this.props.episode.thumbnail})`}} className={"soudplayer__track-info__thumbnail"}></Link>
                <div className={'soundplayer__track-info__name-block'}>
                    <p 
                        className={'soundplayer__track-info__podcast-title'} 
                        title={this.props.episode.title}>{ this.props.episode.title }</p>
                    <Link
                        to={`/podcast/${this.props.episode.podcastId}`}  
                        className={'soundplayer__track-info__podcast-subtitle'} title={this.props.episode.name}>{ this.props.episode.name }</Link>
                </div>
            </div>
        )
    }
}

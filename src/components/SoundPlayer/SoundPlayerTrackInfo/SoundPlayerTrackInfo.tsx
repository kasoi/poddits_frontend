import * as React from "react";
import { PodcastEpisodeData } from "../../../shared/interfaces";
import SoundPlayerButton from "../SoundPlayerButton/SoundPlayerButton";

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

    thumbnail_onClick() {
        console.log("open track");
    }

    render() {
        return (
            <div className={"soudl-player__track-info__block"}>
                <SoundPlayerButton icon={this.props.episode.thumbnail} className={"soudl-player__track-info__thumbnail"} onClick={this.thumbnail_onClick}></SoundPlayerButton>
            </div>
        )
    }
}

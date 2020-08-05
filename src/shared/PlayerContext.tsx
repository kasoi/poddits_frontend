import { PodcastEpisodeData } from "./interfaces";
import React from "react";

export interface IPlayerContext {
    episode: PodcastEpisodeData | null;
    volume: number;
    progress: number;
    isPlaying: boolean;
}

export const PlayerContextStore = React.createContext({} as IPlayerContext);

export function PlayerContextProvider(props: any) {
    const data: IPlayerContext = {
        episode: null,
        volume: 1,
        progress: 0,
        isPlaying: false
    }

    return (
        <PlayerContextStore.Provider value={data}>{props.children}</PlayerContextStore.Provider>
    )
}
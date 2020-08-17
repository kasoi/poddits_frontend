import { PodcastEpisodeData } from './../shared/interfaces';
import * as redux from 'redux';

export const TYPE_ADD_EPISODE = 'ADD_EPISODE';
export const TYPE_CHANGE_VOLUME = 'CHANGE_VOLUME';
export const TYPE_CHANGE_PROGRESS = 'CHANGE_PROGRESS';
export const TYPE_CHANGE_TIME = 'TYPE_CHANGE_TIME';
export const TYPE_SET_AUDIO = 'SET_AUDIO';
export const TYPE_CHANGE_PLAY_STATE = 'TYPE_CHANGE_PLAY_STATE';

export interface PlayerAction {
    type: string,
    payload?: any
}

export interface PlayerStoreState {
    currentPodcastEpisode?: PodcastEpisodeData | null;
    volume: number;
    progress: number;
    currentTime: number;
    totalTime: number;
    isPlaying: boolean;
}

const initialState: PlayerStoreState = {
    currentPodcastEpisode: null,
    volume: 1,
    progress: 0,
    currentTime: 0,
    totalTime: 0,
    isPlaying: false
}

const playerReducer = (state = initialState, action: PlayerAction): PlayerStoreState => {

    if (action.type === TYPE_ADD_EPISODE) {
        return {
            ...state,
            currentPodcastEpisode: action.payload
        }
    }

    if (action.type === TYPE_CHANGE_VOLUME) {
        return {
            ...state,
            volume: action.payload
        }
    }

    if (action.type === TYPE_CHANGE_PROGRESS) {
        return {
            ...state,
            progress: action.payload
        }
    }

    if (action.type === TYPE_CHANGE_TIME) {
        return {
            ...state,
            currentTime: action.payload
        }
    }

    if (action.type === TYPE_CHANGE_PLAY_STATE) {
        return {
            ...state,
            isPlaying: action.payload
        }
    }

    if (action.type === TYPE_SET_AUDIO) {
        return {
            ...state,
            totalTime: action.payload
        }
    }

    return state
}

export const audioStore = redux.createStore(playerReducer);

export const playerStore = redux.createStore(playerReducer);

export const SetEpisode = (episode: PodcastEpisodeData) => {
    return {
        type: TYPE_ADD_EPISODE,
        payload: episode
    }
}

export const ChangeVolume = (volume: number) => {
    return {
        type: TYPE_CHANGE_VOLUME,
        payload: volume
    }
}

export const ChangeProgress = (number: number) => {
    return {
        type: TYPE_CHANGE_PROGRESS,
        payload: number
    }
}

export const ChangeTime = (number: number) => {
    return {
        type: TYPE_CHANGE_TIME,
        payload: number
    }
}

// export const ChangeProgressFromAudio = (number: number) => {
//     return {
//         type: TYPE_CHANGE_PROGRESS_FROM_AUDIO,
//         payload: number
//     }
// }

export const SetAudio = (duration: number) => {
    return {
        type: TYPE_SET_AUDIO,
        payload: duration
    }
}

export const SetPlayState = (isPlaying: boolean) => {
    return {
        type: TYPE_CHANGE_PLAY_STATE,
        payload: isPlaying
    }
}
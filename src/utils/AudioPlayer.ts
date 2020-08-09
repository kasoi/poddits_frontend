import { playerStore, SetAudio, SetEpisode, ChangeTime, SetPlayState, ChangeVolume, ChangeProgress } from './../redux/playerStore';
import { PodcastEpisodeData } from './../shared/interfaces';

export default class AudioPlayer {
    private static instance: AudioPlayer;

    public static getInstance(): AudioPlayer {
        if (!this.instance) this.instance = new AudioPlayer();

        return this.instance;
    }

    private constructor() { 
        this.audio = {} as any;
        this.source = {} as any;
    }

    private audio: HTMLAudioElement;

    private source: HTMLSourceElement;

    public init(audio: HTMLAudioElement, source: HTMLSourceElement) {
        this.audio = audio;
        this.source = source;

        this.audio.addEventListener('loadedmetadata', this.audio_onMetaData);
        this.audio.addEventListener('timeupdate', this.audio_onTimeUpdate);

        // playerStore.subscribe(() => {
        //     const state = playerStore.getState();
        // });
    }

    audio_onTimeUpdate = (event: Event) => {        
        playerStore.dispatch(ChangeTime(this.audio.currentTime));
        playerStore.dispatch(ChangeProgress(this.audio.currentTime / this.audio.duration));
    }

    audio_onMetaData = (event: any) => {        
        playerStore.dispatch(SetAudio(this.audio.duration));
    }

    private currentEpisode: PodcastEpisodeData | null = null;

    public setEpisode(episode: PodcastEpisodeData) {
        this.currentEpisode = episode;

        playerStore.dispatch(SetEpisode(episode));
        
        this.audio.src = episode.audioFile;
    }

    public playEpisode(episode: PodcastEpisodeData) {
        if (this.currentEpisode === episode) {
            this.resume();
            return;
        }

        this.currentEpisode = episode;

        if (this.currentEpisodeIsNull()) return;

        this.audio.src = episode.audioFile;
        this.resume();
    }

    public pause() {
        this.audio.pause();
        playerStore.dispatch(SetPlayState(false));
    }

    public resume() {
        this.audio.play();
        playerStore.dispatch(SetPlayState(true));
    }

    public seek(progress: number) {
        const toTime = this.audio.duration * progress
        this.audio.currentTime = toTime;
        playerStore.dispatch(ChangeTime(toTime));
        playerStore.dispatch(ChangeProgress(progress));
    }

    public toggleMute() {
        const willBeMuted = !(playerStore.getState().volume > 0);
        playerStore.dispatch(ChangeVolume(!willBeMuted ? 0 : 1));

        this.audio.volume = willBeMuted ? 1 : 0;
    }

    public currentEpisodeIsNull(): boolean {
        return this.currentEpisode === null || this.currentEpisode === undefined;
    }

    public getCurrentEpisode(): PodcastEpisodeData {
        return this.currentEpisode as PodcastEpisodeData;
    }

    public episodeIsPlaying(episode: PodcastEpisodeData): boolean {
        if (episode !== this.currentEpisode) return false;

        return playerStore.getState().isPlaying;
    }
}
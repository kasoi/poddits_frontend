import { PodcastEpisodeData } from './../shared/interfaces';


export default class AudioPlayer {
    private static instance: AudioPlayer;

    public static getInstance(): AudioPlayer {
        if (!this.instance) this.instance = new AudioPlayer();

        return this.instance;
    }

    private constructor() { 
        this.currentEpisode = {} as any;
        this.audio = {} as any;
        this.source = {} as any;
    }

    private audio: HTMLAudioElement;

    private source: HTMLSourceElement;


    public init(audio: HTMLAudioElement, source: HTMLSourceElement) {
        console.log("init with elements: ", audio, source);
        this.audio = audio;
        this.source = source;
    }

    private currentEpisode: PodcastEpisodeData | null;

    public playEpisode(episode: PodcastEpisodeData) {
        this.currentEpisode = episode;

        if (this.currentEpisodeIsNull()) return;

        console.log("play src: ", episode.audioFile);
        
        this.audio.src = episode.audioFile;
        // this.source.src = episode.audioFile;
        this.audio.play();

        console.log('source src:', this.source.src);
        console.log('source:', this.source);
        
        
    }

    public pause() {
        this.audio.pause();
    }

    public resume() {
        this.audio.play();
    }

    public currentEpisodeIsNull(): boolean {
        return this.currentEpisode === undefined || this.currentEpisode === null;
    }

    public getCurrentEpisode(): PodcastEpisodeData {
        return this.currentEpisode as PodcastEpisodeData;
    }
}
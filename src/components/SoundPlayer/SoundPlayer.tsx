import * as React from "react";
import AudioPlayer from "../../utils/AudioPlayer";
import './SoundPlayer.css';
import SoundPlayerButton from "./SoundPlayerButton/SoundPlayerButton";
import prevIcon from '../../assets/soundPlayer/prev.svg';
import nextIcon from '../../assets/soundPlayer/next.svg';
import playIcon from '../../assets/soundPlayer/play.svg';
import pauseIcon from '../../assets/soundPlayer/pause.svg';
import SoundPlayerProgressBar from "./SoundPlayerProgressBar/SoundPlayerProgressBar";
import volumeFull from '../../assets/soundPlayer/volume_full.svg';
import volumeLow from '../../assets/soundPlayer/volume_low.svg';
import volumeMid from '../../assets/soundPlayer/volume_mid.svg';
import volumeSilent from '../../assets/soundPlayer/volume_silent.svg';
import { playerStore } from "../../redux/playerStore";
import ValuesConverter from "../../utils/ValuesConverter";
import SoundPlayerTrackInfo from "./SoundPlayerTrackInfo/SoundPlayerTrackInfo";
import { PodcastEpisodeData } from "../../shared/interfaces";

export interface Props {
    children?: React.ReactNode
}

export interface State {
    isPlaying: boolean,
    volume: number,
    isMuted: boolean,
    currentTime: number,
    progress: number,
    progressWidth: number
}

export default class SoundPlayer extends React.Component<Props, State> {

    audio = React.createRef<HTMLAudioElement>();
    source = React.createRef<HTMLSourceElement>();
    controlsDiv = React.createRef<HTMLDivElement>();
    volumeBlockDiv = React.createRef<HTMLDivElement>();
    timeStartDiv = React.createRef<HTMLDivElement>();
    timeEndDiv = React.createRef<HTMLDivElement>();
    // playerContext: IPlayerContext = React.useContext(PlayerContextStore);

    constructor(props: Props) {
        super(props)

        this.state = {
            isPlaying: false,
            volume: 1,
            isMuted: false,
            currentTime: 0,
            progress: 0,
            progressWidth: 100
        }
    }

    componentDidMount() {
        AudioPlayer.getInstance().init(this.audio.current as HTMLAudioElement, this.source.current as HTMLSourceElement);

        playerStore.subscribe(() => {
            const pState = playerStore.getState();

            // this.render();
            this.setState({
                currentTime: pState.currentTime as number,
                isPlaying: pState.isPlaying,
                volume: pState.volume,
                progress: pState.progress
            });
        });

        window.addEventListener('resize', this.onResize);
        this.onResize();
    }

    onResize = () => {
        const windowW = window.innerWidth < 960 ? window.innerWidth : 960;
        const progressDivW = windowW - ((this.controlsDiv.current?.clientWidth as number) + (this.volumeBlockDiv.current?.clientWidth as number)) || 0;
        const timeStartW = this.timeStartDiv.current?.clientWidth as number;
        const timeEndW = this.timeEndDiv.current?.clientWidth as number;
        const timeSpaces = 60;
        const progressW = progressDivW - (timeStartW + timeEndW + timeSpaces);
        
        this.setState({progressWidth: progressW});
    }

    playPrev = () => {
        console.log('play prev');
        
    }

    playNext = () => {
        console.log('play next');
        
    }

    play = () => {
        // this.setState({isPlaying: true});
        AudioPlayer.getInstance().resume();
    }

    pause = () => {
        // this.setState({isPlaying: false});
        AudioPlayer.getInstance().pause();
    }

    toggleVolume = () => {
        AudioPlayer.getInstance().toggleMute();
        // this.setState({isMuted: willBeMuted});
    }

    onProgressChange = (progress: number) => {
        AudioPlayer.getInstance().seek(progress);
    }

    onVolumeChange = (volume: number) => {
        AudioPlayer.getInstance().setVolume(volume);
    }

    onVolumeMouseChange = (volume: number) => {
        AudioPlayer.getInstance().setVolume(volume);
    }

    render() {
        const vol = this.state.isMuted ? 0 : this.state.volume;

        let volumeIcon = volumeFull;
        if (vol < 0.7) volumeIcon = volumeMid;
        if (vol < 0.35) volumeIcon = volumeLow;
        if (vol === 0) volumeIcon = volumeSilent;

        const pState = playerStore.getState();
        const totalTime = ValuesConverter.convertTime(pState.totalTime || 0);
        const currentTime = ValuesConverter.convertTime(pState.currentTime as number || 0);

        const trackInfo = pState.currentPodcastEpisode ? <SoundPlayerTrackInfo 
            episode={pState.currentPodcastEpisode as PodcastEpisodeData}></SoundPlayerTrackInfo> : <div></div>
        
        const timeProgressWidth = this.state.progressWidth;

        const timeProgress = <SoundPlayerProgressBar 
            width={timeProgressWidth}
            progress={pState.progress} 
            onChange={this.onProgressChange}></SoundPlayerProgressBar>;

        const volumeProgress = <SoundPlayerProgressBar progress={pState.volume} onChange={this.onVolumeChange}
            onMouseChange={this.onVolumeMouseChange}
            width={100}></SoundPlayerProgressBar>;

        return (
            <div className={"panel"}>
                <div className={"soundPlayerContentBlock"}>
                    <div className={"soundPlayerContent"}>
                        {trackInfo}
                        <div className={'soundPlayer_controlsBlock'}>
                            <div ref={this.controlsDiv} className={"soundPlayer__buttons"}>
                                <SoundPlayerButton icon={prevIcon} onClick={this.playPrev}></SoundPlayerButton>
                                <SoundPlayerButton 
                                    icon={this.state.isPlaying ? pauseIcon : playIcon}
                                    onClick={this.state.isPlaying ? this.pause : this.play}></SoundPlayerButton>
                                <SoundPlayerButton icon={nextIcon}
                                    onClick={this.playNext}></SoundPlayerButton>
                            </div>
                            <div className={"soundPlayer__progressBlock"}>
                                <p ref={this.timeStartDiv} className={"progressTime start"}>{ currentTime }</p>
                                { timeProgress }
                                <p ref={this.timeEndDiv} className={"progressTime progressTime__end"}>{ totalTime }</p>
                            </div>
                            <div ref={this.volumeBlockDiv} className={'soundPlayer__volumeControl'}>
                                <SoundPlayerButton
                                    icon={volumeIcon} onClick={this.toggleVolume}></SoundPlayerButton>
                                <div className={'soundPlayer__volumeProgress'}>{volumeProgress}</div>
                            </div>
                            <audio ref={this.audio}>
                                <source ref={this.source} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

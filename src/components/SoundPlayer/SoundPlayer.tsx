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
import volumeSilent from '../../assets/soundPlayer/volume_silent.svg';
import { IPlayerContext, PlayerContextStore } from "../../shared/PlayerContext";

export interface Props {
    children?: React.ReactNode
}

export interface State {
    isPlaying: boolean,
    volume: number,
    isMuted: boolean
}

export default class SoundPlayer extends React.Component<Props, State> {
// const SoundPlayer = () => {

    audio = React.createRef<HTMLAudioElement>();
    source = React.createRef<HTMLSourceElement>();
    // playerContext: IPlayerContext = React.useContext(PlayerContextStore);

    constructor(props: Props) {
        super(props)

        this.state = {
            isPlaying: false,
            volume: 1,
            isMuted: false
        }
    }

    componentDidMount() {
        AudioPlayer.getInstance().init(this.audio.current as HTMLAudioElement, this.source.current as HTMLSourceElement);
    }

    playPrev = () => {
        console.log('play prev');
        
    }

    playNext = () => {
        console.log('play next');
        
    }

    play = () => {
        console.log('play');
        this.setState({isPlaying: true});
        AudioPlayer.getInstance().resume();
    }

    pause = () => {
        console.log('pause');
        this.setState({isPlaying: false});
        AudioPlayer.getInstance().pause();
    }

    toggleVolume = () => {
        this.setState({isMuted: !this.state.isMuted});
    }

    render() {

        const vol = this.state.isMuted ? 0 : this.state.volume;

        let volumeIcon = volumeFull;
        if (vol < 0.6) volumeIcon = volumeLow;
        if (vol === 0) volumeIcon = volumeSilent;

        return (
            <div className={"panel"}>
                <div className={"soundPlayerContentBlock"}>
                    <div className={"soundPlayerContent"}>
                        <SoundPlayerButton icon={prevIcon} onClick={this.playPrev}></SoundPlayerButton>
                        <SoundPlayerButton 
                            icon={this.state.isPlaying ? pauseIcon : playIcon}
                            onClick={this.state.isPlaying ? this.pause : this.play}></SoundPlayerButton>
                        <SoundPlayerButton icon={nextIcon}
                            onClick={this.playNext}></SoundPlayerButton>
                        <SoundPlayerProgressBar></SoundPlayerProgressBar>
                        <p className={"progressTime"}>08:15</p>
                        <audio ref={this.audio}>
                            <source ref={this.source} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                        <SoundPlayerButton
                            icon={volumeIcon} onClick={this.toggleVolume}></SoundPlayerButton>
                        
                    </div>
                </div>
            </div>
        )
    }
}

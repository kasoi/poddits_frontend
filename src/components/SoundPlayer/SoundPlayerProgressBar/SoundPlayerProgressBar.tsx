import * as React from "react";
import './SoundPlayerProgressBar.css';
import { playerStore, ChangeProgress } from "../../../redux/playerStore";

export interface Props {
    children?: React.ReactNode,
    backgroundColor?: string,
    activeColor?: string,
    width?: number,
    progress: number,
    onChange: Function,
}

export interface State {
    width: number,
    changingProgress: number,
    isChanging: boolean,
}

interface CircleStyle {
    left: number,
    opacity?: number,
    transition?: string,
}

export default class SoundPlayerProgressBar extends React.Component<Props, State> {

    blockRef = React.createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
        

        this.state = {
            width: props.width || 400,
            changingProgress: props.progress,
            isChanging: false,
        }
    }

    componentDidMount() {
        // playerStore.subscribe(() => {
        //     console.log('player store changed progress:', playerStore.getState().progress);
            
        //     this.setState({
        //         progress: playerStore.getState().progress as number
        //     })
        // });
    }

    startMouseListen() {
        window.addEventListener('mouseup', this.window_onMouseUp);
        window.addEventListener('mousemove', this.window_onMouseMove);
    }

    stopMouseListen() {        
        window.removeEventListener('mouseup', this.window_onMouseUp);
        window.removeEventListener('mousemove', this.window_onMouseMove);
    }

    window_onMouseMove = (event: MouseEvent) => {
        event.preventDefault(); // prevent text selection

        this.calculateProgress(event.pageX);
    }

    calculateProgress(mouseX: number) {
        const rect = this.blockRef.current?.getBoundingClientRect();
        if (rect === undefined) return;
        let localX = mouseX - rect.x;
        if (localX < 0) localX = 0;
        if (localX > this.state.width) localX = this.state.width;
        
        const progress = localX / this.state.width;
        playerStore.dispatch(ChangeProgress(progress));

        this.setState({
            changingProgress: progress
        })
    }

    window_onMouseUp = (event: MouseEvent) => {
        this.stopMouseListen();

        this.props.onChange(this.state.changingProgress);
        this.setState({isChanging: false});
    }

    progressBar_onMouseDown = (event: React.MouseEvent) => {
        this.startMouseListen();
        this.calculateProgress(event.pageX);
        this.setState({isChanging: true});
    }

    render() {
        let progress = this.props.progress;
        if (this.state.isChanging) progress = this.state.changingProgress;

        if (isNaN(progress)) progress = 0;
        
        let circleStyle: CircleStyle = {
            left: progress * this.state.width
        }

        if (this.state.isChanging) {
            circleStyle.opacity = 1;
        }
        else {
            circleStyle.transition = '0.13s';
        }

        return (
            <div className={"progressBarBlock"} style={{ width: this.state.width }} 
                onMouseDown={this.progressBar_onMouseDown} 
                ref={this.blockRef}>
                <div className={"backgroundLine"}></div>
                <div 
                    className={"progressLine"}
                    style={{width: progress * this.state.width}}></div>
                <div 
                    className={"progressCircle"}
                    style={circleStyle}
                ></div>
            </div>
        )
    }
}

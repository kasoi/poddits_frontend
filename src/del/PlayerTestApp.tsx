import React from "react"
import { connect } from 'react-redux';
import * as redux from 'redux';
import { playerStore, PlayerAction, ChangeVolume, ChangeProgress } from "../redux/playerStore";


interface PlayerTestProps {
    children?: any
}

interface TestState {
    counter: number
}


export default class PlayerTestApp extends React.Component<PlayerTestProps, TestState> {

    constructor(props: PlayerTestProps) {
        super(props);

        this.state = {
            counter: 0
        }
    }

    componentDidMount() {
        playerStore.subscribe(() => {
            console.log(playerStore.getState());
            
        })
    }

    setVolume = (event: React.MouseEvent) => {
        playerStore.dispatch(ChangeVolume(0.26));
    }
    
    setProgress = (event: React.MouseEvent) => {
        playerStore.dispatch(ChangeProgress(0.15));
    }

    render() {
        return (
            <div><p>Ya test app</p>
                <button onClick={this.setVolume}>set volume</button>
                <button onClick={this.setProgress}>set progress</button>
                <div>{ this.state.counter }</div>

                <hr/>
            </div>
        )
    }
}
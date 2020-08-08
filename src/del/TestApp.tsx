import React from "react"
import { connect } from 'react-redux';
import * as redux from 'redux';
import TestChild from "./TestChild";


interface TestProps {
    children?: any
}

interface TestState {
    counter: number
}

export interface TestAction {
    type: string
}

const initialState = {
    rCounter: 0
}

const reducer = (state = initialState, action: TestAction) => {

    if (action.type === 'ADD') {
        return {
            rCounter: state.rCounter + 1
        }
    }

    return state
}

export const testStore = redux.createStore(reducer);

export const addCounter: TestAction = {
    type: 'ADD'
}

export default class TestApp extends React.Component<TestProps, TestState> {

    constructor(props: TestProps) {
        super(props);

        this.state = {
            counter: 0
        }
    }

    componentDidMount() {
        
        testStore.subscribe(() => {
            const counter = testStore.getState().rCounter;
            this.setState({
                counter: counter
            });
        })
    }

    increase = (event: React.MouseEvent) => {
        testStore.dispatch(addCounter);
        console.log(testStore.getState());
        this.setState({
            counter: testStore.getState().rCounter
        })
    }

    render() {
        return (
            <div><p>Ya test app</p>
                <button onClick={this.increase}>increase</button>
                <div>{ this.state.counter }</div>

                <hr/>
                <TestChild />
            </div>
        )
    }
}
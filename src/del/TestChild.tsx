import React from 'react';
import { testStore, addCounter } from './TestApp';

export default class TestChild extends React.Component {
    increaseCounter(event: React.MouseEvent) {
        testStore.dispatch(addCounter);
    }

    render() {
        return (
            <div>
                <button onClick={this.increaseCounter}>Increase from child</button>
            </div>
        )
    }
}
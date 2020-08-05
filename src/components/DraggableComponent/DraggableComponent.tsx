import * as React from "react";

export interface DraggableComponentProps {
    children?: React.ReactNode,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    progressX?: number,
    progressY?: number,
}

export interface DraggableComponentState {
    progressX: number,
    progressY: number,
    isChanging: boolean,
}

export class DraggableComponent extends React.Component<DraggableComponentProps, {}> {

    public documentOnMouseMove(event: MouseEvent) {

    }

    public documentOnMouseUp(event: MouseEvent) {

    }

    constructor(props: DraggableComponentProps) {
        super(props)

        this.state = {
            progressX: this.props.progressX || 0,
            progressY: this.props.progressY || 0,
            isChanging: false
        }
    }

    render() {
        return (
            <div>{ this.props.children }</div>
        )
    }
}

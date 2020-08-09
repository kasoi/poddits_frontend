import * as React from "react";

export interface Props {
    children?: React.ReactNode;
    podcastId: string;
}

export interface State {
}

export default class PodcastPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div>{ this.props.children }</div>
        )
    }
}

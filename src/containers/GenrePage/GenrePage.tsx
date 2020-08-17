import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface GenrePageProps {
    genreName: string;
}

interface ComponentProps extends RouteComponentProps<GenrePageProps> {
}

export interface Props {
    children?: React.ReactNode
}

export interface State {
}

class GenrePage extends React.Component<ComponentProps, State> {

    constructor(props: ComponentProps) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div>{ this.props.children } Info about <b>{ this.props.match.params.genreName }</b></div>
        )
    }
}

export default withRouter(GenrePage);
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface PodcastPageProps {
    podcastId: string;
}

interface ComponentProps extends RouteComponentProps<PodcastPageProps> {
}

export interface State {
}

class PodcastPage extends React.Component<ComponentProps, State> {

    constructor(props: ComponentProps) {
        super(props);

        console.log(props.match.params.podcastId);
        

        this.state = {
        }
    }

    render() {
        return (
            <div>{ this.props.children }</div>
        )
    }
}

export default withRouter(PodcastPage);
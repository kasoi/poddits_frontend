import * as React from "react";
import './BrowseLink.css';

export interface Props {
    children?: React.ReactNode;
    text: string;
    url: string;
}

export interface State {
}

export default class BrowseLink extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
           <a className={"browseLink"} href={this.props.url}>{this.props.text}</a>
        )
    }
}

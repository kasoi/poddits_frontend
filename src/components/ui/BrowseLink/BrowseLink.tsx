import * as React from "react";
import './BrowseLink.css';
import { Link } from "react-router-dom";

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
           <Link className={"browseLink"} to={this.props.url}>{this.props.text}</Link>
        )
    }
}

import * as React from "react";
import classes from './Layout.module.css';
import { Route } from "react-router-dom";
import MainNavbar from "../../components/ui/MainNavbar/MainNavbar";
import HomePage from "../../containers/HomePage/HomePage";
import BrowsePage from "../../containers/BrowsePage/BrowsePage";
import SearchPage from "../../containers/SearchPage/SearchPage";
import SoundPlayer from "../../components/SoundPlayer/SoundPlayer";
import PodcastPage from "../../containers/PodcastPage/PodcastPage";
import GenrePage from "../../containers/GenrePage/GenrePage";

export interface Props {
    children?: React.ReactNode
}

export interface State {
}

export default class Layout extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div>
                    <MainNavbar />
                    <SoundPlayer />
                    <div className={classes.content}>
                        <Route path={"/"} exact component={HomePage} />
                        <Route path={"/home"} component={HomePage} />
                        <Route path={"/about"} exact/>
                        <Route path={"/browse"} component={BrowsePage} />
                        <Route path={"/search"} component={SearchPage} />
                        <Route path={"/podcast/:podcastId"} component={PodcastPage} />
                        <Route path={"/genre/:genreName"} component={GenrePage} />
                        <hr />
                    </div>
            </div>
        )
    }
}

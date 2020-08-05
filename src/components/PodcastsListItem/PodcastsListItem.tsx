import * as React from "react";
import { PodcastEpisodeData } from "../../shared/interfaces";
import "./PodcastsListItem.css";
import TimeAgo from "../../utils/TimeAgo";
import AudioPlayer from "../../utils/AudioPlayer";

export interface Props {
    children?: React.ReactNode;
    data: PodcastEpisodeData;
}

export interface State {
    titleData: string;
}

export default class PodcastsListItem extends React.Component<Props, State> {

    private titleRef = React.createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);

        this.state = {
            titleData: ""
        }
    }

    componentDidMount() {        
        let titleData = '';

        if (this.titleRef.current !== null) {
            const currentTitle = this.titleRef.current;
            titleData = currentTitle.scrollWidth > currentTitle.offsetWidth ? this.props.data.title : "";
        }
        if (titleData !== '') this.setState({titleData: titleData});
    }

    playOrPause = () => {
        console.log('call play episode: ', this.props.data);
        
        AudioPlayer.getInstance().playEpisode(this.props.data);
    }

    render() {
        const data = this.props.data; 
        // TODO: fix it
        const thumbUrl = data.thumbnail.replace("30x30", "120x120");
        const date: Date = new Date(data.publishDate);
        const dateText = date.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'});

        let titleData = this.state.titleData;
        if (this.titleRef.current !== null) {
            const currentTitle = this.titleRef.current;
            titleData = currentTitle.scrollWidth > currentTitle.offsetWidth ? data.title : "";
        }
        
        return (
            <div className={"container"}>
                <img src={thumbUrl} alt={"thumbnail"} className={"image"} onClick={this.playOrPause} />
                <div className={"title"} title={titleData} ref={this.titleRef}> {data.title}</div>
                <div className={"description"}>{ data.description }</div>
                <div className={"bottomDiv"}>
                    <span className={"dateColor"} title={dateText} >{ TimeAgo.timeAgo(date) }</span>&nbsp;
                    <span className={"dateColor"}>{ " by " }</span>
                    <a href={"#/"} className={"secondaryLink"}>{ data.author }</a>
                </div>
            </div>
        )
    }
}

import * as React from "react";
import './SoundPlayerButton.css';

export interface Props {
    children?: React.ReactNode,
    icon: string,
    onClick: Function,
    className?: string
}

export interface State {
    className: string
}

export default class SoundPlayerButton extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            className: props.className || 'playerButton'
        }
    }

    callOnClick = () => {
        this.props.onClick();
    }

    render() {        
        return (
                <button 
                    className={this.state.className} 
                    style={{backgroundImage: 'url(' + this.props.icon + ')'}} 
                    onClick={this.callOnClick} />
        )
    }
}

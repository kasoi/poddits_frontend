import * as React from "react";
import './ImageButton.css';

interface Props {
    children?: React.ReactNode,
    icon: string,
    onClick: Function,
    className?: string
}

interface State {
    className: string
}

export default class ImageButton extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            className: props.className || 'imageButton_button'
        }
    }

    callOnClick = () => {
        this.props.onClick();
    }

    render() {
        return (
            <div>
                <button 
                    className={this.state.className} 
                    style={{backgroundImage: 'url(' + this.props.icon + ')'}} 
                    onClick={this.callOnClick} />
            </div>
        )
    }
}

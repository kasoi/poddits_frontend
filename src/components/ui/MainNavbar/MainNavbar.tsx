import * as React from "react";
import Logo from '../../../assets/logo.svg';
import './MainNavbar.scss';
import MenuSearch from "../MenuSearch/MenuSearch";

export interface Props {
    children?: React.ReactNode
}

export interface State {
}

export default class MainNavbar extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        
        this.state = {
        }
    }

    render() {
        return (
            <div className={"MainNavbar"}>
                <div className={"Menu"}>
                    <a href="/" className={"logo"}>
                    <img src={Logo} className={"image"} alt="Poddits"/>
                    </a>
                    <div className="divider"/>
                        <a href={"/browse"} className="link">Browse</a>
                    <div className="divider"/>
                    <MenuSearch />
                    { this.props.children }
                </div>
            </div>
        )
    }
}

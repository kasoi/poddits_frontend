import * as React from "react";
import Logo from '../../../assets/logo.svg';
import './MainNavbar.scss';
import MenuSearch from "../MenuSearch/MenuSearch";
import { Link } from "react-router-dom";

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
                    <Link to={"/"} className={"logo"}>
                        <img src={Logo} className={"image"} alt="Poddits"/>
                    </Link>
                    <div className="divider"/>
                        <Link to={"/browse"} className="link">Browse</Link>
                    <div className="divider"/>
                    <MenuSearch />
                    { this.props.children }
                </div>
            </div>
        )
    }
}

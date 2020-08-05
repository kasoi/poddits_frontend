import * as React from "react";
import './MenuSearch.css';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";


export interface FormData {
    search: string;
};

export interface Props {
    children?: React.ReactNode
};

export interface State {
};

export default function MenuSearch() {

    let routeHistory = useHistory();
    const { register, handleSubmit } = useForm<FormData>();
    const onSubmit = handleSubmit(({ search }) => {
        if(search.trim() === '') {
            return;
        }

        routeHistory.push({
            pathname: '/search',
            search: '?q=' + search,
        });
    });

    // constructor(props: Props) {
    //     super(props)

    //     this.state = {
    //     }
    // }

    // render() {
        return (
            <div className={"searchSize"}>
                <form onSubmit={onSubmit}>
                    <input type={"text"} name="search" className={"search background"} placeholder={"Search"} ref={register}></input>
                    <button name="icon" className={"searchIcon"}></button>
                </form>
            </div>
        )
    // }
}
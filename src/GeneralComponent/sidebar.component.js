import React from 'react';
import Store from '../store';
import { push, replace } from 'react-router-redux';

export default class Sidebar extends React.Component {

    constructor() {
        super();
        this.state = {
            active: 'projects',
            navItems: ['dashboard', 'projects', 'user', 'result', 'setting']
        }
    }

    redirect = (address) => {
        Store.dispatch(push(`/${address}`));
    }

    clickTest = () => {
        console.log("click testing ");
    }
    getNavigationItems = () => {


        return this.state.navItems.map((item, index) => {

            let status = (item === this.state.active) ? 'active' : '';
            let clsName = `nav_item ${item} ${status}`
            return (
                <li className={clsName} key={index} onClick={() => this.redirect(item)}>
                    <a><span className="nav_icon"></span><span className="nav_text">{item}</span> </a>
                </li>
            )
        })
    }

    render() {
        return (
            <section className="nav_bar">
                <ul className="navigation">
                    {this.getNavigationItems()}
                </ul>
            </section>
        )
    }
}



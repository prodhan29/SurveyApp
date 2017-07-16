import React from 'react';
import Logo from '../styles/img/logo.png';
import { push, replace } from 'react-router-redux';
import Store from '../store';

export default class Header extends React.Component {

    logout = () => {
        sessionStorage.setItem('auth_token', '');
        sessionStorage.setItem('roleName', '');
        Store.dispatch(replace('/'));
    }
    render() {
        return (

            <section className="header">
                <div className="logo"><img src={Logo} /></div>
                <div className="header_main">
                    <h2 className="header_title">{this.props.name}</h2>
                    <div className="user dropdown">
                        <img src="assets/img/user.png" data-toggle="dropdown" />
                        <div className="dropdown_panel action_dropdown dropdown-menu profile_dropdown">
                            <img src="assets/img/user.png" data-toggle="dropdown" />
                            <ul>
                                <li>View Profile</li>
                                <li onClick={this.logout}>Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
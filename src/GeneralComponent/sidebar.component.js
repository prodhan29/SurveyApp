import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Store from '../store';
import { push, replace } from 'react-router-redux';
import * as SidebarAction from '../GeneralActions/sidebar.action';

class Sidebar extends React.Component {

    constructor() {
        super();
    }

    redirect = (address) => {
        Store.dispatch(push(`/${address}`));
        this.props.setSelectedPage(address);
    }

    clickTest = () => {
        console.log("click testing ");
    }
    getNavigationItems = () => {
        let userRole = sessionStorage.getItem('roleName').replace(/ /g, '');
        console.log(userRole);
        return this.props.sidebar.featureAccess[userRole].map((item, index) => {

            let status = (item === this.props.sidebar.active) ? 'active' : '';
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

function mapStateToProps(state) {
    console.log('sidbar');
    console.log(state.Sidebar);
    return {
        user: state.User,
        sidebar: state.Sidebar,
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        setSelectedPage: SidebarAction.setSelectedPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);



import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from '../../styles/img/logo.png'
//components
import Sidebar from '../../GeneralComponent/sidebar.component';
//actions
import * as SettingsAction from '../actions/settings.action';
//containers
import License from './license';
import Organization from './organization';
import ProjectUser from './projectUser';
import UserGroup from './userGroup';
import ProjectUserGroup from './projectUserGroup';

class Settings extends React.Component {

    constructor(props) {
        super(props);
    }

    getSettingsTab = () => {
        let userType = sessionStorage.getItem('roleName').replace(/ /g, '');
        
        return this.props.settings.tab[userType].map((item, index) => {

            let clsName = (this.props.settings.tab.active === item) ? 'tab_nav_item active' : 'tab_nav_item';
            return (
                <li className={clsName} key={index} onClick={() => this.props.setActiveTab(item)}>
                    {item}
                </li>
            )
        });
    }

    getActivePanel = (tab) => {
        console.log(tab);
        switch (tab) {
            case 'User':
                return <ProjectUser />;

            case 'User Group':
                return <UserGroup />;

            case 'Manage Project Permissions':
                return <ProjectUserGroup />
                break;

            case 'License':
                return <License />;

            case 'Organization':
                return <Organization />;
                break;
        }
    }

    render() {

        return (
            <div className="main_container">

                <section className="header">
                    <div className="logo"><img src={logo} /></div>
                    <div className="header_main">
                        <h2 className="header_title">{this.props.sidebar.active}</h2>
                        <div className="user"><img src="styles/img/user.png" /></div>
                    </div>
                </section>
                <section className="content_body">
                    <Sidebar />
                    <section className="content_panel settings_content">
                        <div className="setting_btm_tab">
                            <ul className="tab_nav compact_nav">
                                {this.getSettingsTab()}
                            </ul>
                        </div>
                        {this.getActivePanel(this.props.settings.tab.active)}
                    </section>
                </section>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        sidebar: state.Sidebar,
        settings: state.Settings,
        license: state.License,
        organization: state.organization,
        projectUser: state.ProjectUser,
        userGroup: state.UserGroup,
        projectUserGroup: state.projectUserGroup
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        setActiveTab: SettingsAction.setActiveTab
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from '../../styles/img/logo.png'

//components
import Sidebar from '../../General/Component/sidebar.component';
import Header from '../../General/Component/header.component';
import Privilege from '../components/privilege.component';
import ReduxToastr from 'react-redux-toastr';
import { toastr } from 'react-redux-toastr';
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
        let userType = sessionStorage.getItem('roleName').replace(/ /g, '');
        this.state = {
            userType,
            selectedTab: (userType === 'Admin') ? 'User' : 'License'
        }
    }

    componentDidMount() {
        window.onerror = function (msg) {
            toastr.error('Error: ' + msg);
        };
    }

    setActiveTab=(tabName)=>{
        this.setState({
            selectedTab: tabName
        });
        this.props.setActiveTab(tabName);
    }

    getSettingsTab = () => {
        
        console.log('settings selected tab '+ this.props.settings.tab.active)
        return this.props.settings.tab[this.state.userType].map((item, index) => {

            let clsName = (this.state.selectedTab === item) ? 'tab_nav_item active' : 'tab_nav_item';
            return (
                <li className={clsName} key={index} onClick={() => this.setActiveTab(item)}>
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

            case 'Privilege':
                return <Privilege />
                break;    
        }
    }

    render() {

        return (
            <div className="main_container">

                <Header name={this.props.sidebar.active}/>
                <ReduxToastr preventDuplicates />
                <section className="content_body">
                    <Sidebar />
                    <section className="content_panel settings_content">
                        <div className="setting_btm_tab">
                            <ul className="tab_nav compact_nav">
                                {this.getSettingsTab()}
                            </ul>
                        </div>
                        {this.getActivePanel(this.state.selectedTab)}
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

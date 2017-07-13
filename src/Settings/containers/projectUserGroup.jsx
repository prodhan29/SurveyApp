import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//components
import Modal from '../components/projectUserGroupModal.component';
//actions
import { fetchAllProjects } from '../../Projects/actions/allProjects.action';
import { deepClone } from '../../GeneralActions/action';
import * as UserGroupAction from '../actions/userGroup.action';
import * as ProjectUserGroupAction from '../actions/projectUserGroup.action';

var initialState = {
    showModal: false,
    selectedGroups: [],
    removeGroupIds: [],
    activeProjectUserGroup: null,
    edit: {
        enable: false,
        project: null,
        index: -1
    }
}

class ProjectUserGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = deepClone(initialState);
    }

    componentDidMount() {
        this.props.fetchAllProjects();
        this.props.fetchAllUserGroup();
        this.props.fetchAllProjectUserGroup();
    }

    toggleModal = () => {
        let _this = this;
        this.setState({
            showModal: !_this.state.showModal,
            activeProjectUserGroup: null,
            selectedGroups: [],
            removeGroupIds: [],
            edit: {
                enable: false,
                project: null,
                grpName: ''
            }
        });
    }

    isAlreadyAdded = (group) => {
        for (let i = 0; i < this.state.selectedGroups.length; i++) {
            if (this.state.selectedGroups[i].accountGroupId == group.accountGroupId)
                return true;
        }
        return false;
    }

    addTotselectedGroups = (group) => {
        let selectedGroups = this.state.selectedGroups;
        if (!this.isAlreadyAdded(group)) {
            selectedGroups.push(group);
            this.setState({ selectedGroups });
        }
    }

    removeFromSelectedGroups = (index) => {
        let selectedGroups = this.state.selectedGroups;
        let removeGroupIds = this.state.removeGroupIds;

        let account = selectedGroups.splice(index, 1);
        console.log(' project user group will be deleted -->' + JSON.stringify(account));
        removeGroupIds.push(account[0].accountGroupId);
        this.setState({ selectedGroups, removeGroupIds });
    }

    setEditable = (project, data, index) => {
        this.setState({
            selectedGroups: data.accountGroupList,
            showModal: true,
            edit: {
                enable: true,
                project,
                index,
            }
        })
    }

    createProjectUserGroup = (project) => {

        this.props.createProjectUserGroup({
            project_id: project.projectId,
            account_group_ids: ProjectUserGroupAction.makeSendAble(this.state.selectedGroups)
        });
        this.setState(deepClone(initialState));
    }

    updateProjectUserGroup = (project) => {
        let _this = this;
        let ob = {
            account_group_ids: ProjectUserGroupAction.makeSendAble(_this.state.selectedGroups),
            remove_ids: this.state.removeGroupIds
        }

        ProjectUserGroupAction.updateProjectUserGroup(this.state.edit.index, project, ob);
        this.setState(deepClone(initialState));
    }

    makeSingularPlural=(num, name)=>{
        return (num > 1) ? `${num} ${name}s` : `${num} ${name}`;
    }

    getProjectUserGroup = () => {
        if (typeof this.props.projectUserGroup.list === 'undefined') return null;

        return this.props.projectUserGroup.list.map((item, index) => {

            let project = ProjectUserGroupAction.getProjectbyId(item.projectId, this.props.projects.list);
            return (
                <tr key={index}>
                    <td>
                        <div className="project_name">
                            {item.projectName}
                        </div>
                    </td>
                    <td className="user_group_details">
                        <b> {this.makeSingularPlural(item.accountGroupList.length, 'User Group')}</b>
                    </td>
                    <td className="text_center">
                        <button className="button manage_user" onClick={() => this.setEditable(project, item, index)}>Manage Users</button>
                        &nbsp; <button className="button manage_user" onClick={() => ProjectUserGroupAction.deleteGroup(project, index)}>Delete Group</button>
                    </td>
                </tr>
            )
        })
    }

    render() {

        return (
            <div className="data_container">
                <div className="list_view_control_bar">
                    <span className="icon_item search_panel">
                        <input className="search_bar" type="text" placeholder="Search Here " name="search" />
                    </span>
                </div>
                <div className="settings_list">
                    <table className="bordered_table">
                        <thead>
                            <tr>
                                <th>Project Name </th>
                                <th>User Group Details</th>
                                <th className="text_center">Manage Users</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.getProjectUserGroup()}
                        </tbody>
                    </table>
                </div>
                {
                    this.state.showModal ?
                        <Modal toggleModal={this.toggleModal}
                            allProjects={this.props.projects.list}
                            userGroup={this.props.userGroup}
                            selectedGroups={this.state.selectedGroups}
                            addTotselectedGroups={this.addTotselectedGroups}
                            removeFromSelectedGroups={this.removeFromSelectedGroups}
                            createProjectUserGroup={this.createProjectUserGroup}
                            updateProjectUserGroup={this.updateProjectUserGroup}
                            edit={this.state.edit}
                        /> : null
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        settings: state.Settings,
        projects: state.AllProject,
        projectUserGroup: state.ProjectUserGroup,
        userGroup: state.UserGroup
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        fetchAllProjects,
        createProjectUserGroup: ProjectUserGroupAction.createProjectUserGroup,
        fetchAllProjectUserGroup: ProjectUserGroupAction.fetchAllProjectUserGroup,
        fetchAllUserGroup: UserGroupAction.fetchAllUserGroup,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserGroup);

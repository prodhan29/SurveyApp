import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//components
import Modal from '../components/userGroupModal.component';
//actions
import * as ProjectUserAction from '../actions/projectUser.action';
import * as UserGroupAction from '../actions/userGroup.action';
import { deepClone } from '../../General/Actions/action';


var initialState = {
    searchText: '',
    showModal: false,
    selectedUsers: [],
    removeAccountIds: [],
    edit: {
        enable: false,
        data: null,
        grpName: ''
    }
}

class UserGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = deepClone(initialState);
    }

    componentDidMount() {
        this.props.fetchAllProjectUser();
        this.props.fetchAllUserGroup();
    }

    toggleModal = () => {
        let _this = this;
        this.setState({
            searchText: '',
            showModal: !_this.state.showModal,
            selectedUsers: [],
            removeAccountIds: [],
            edit: {
                enable: false,
                data: null,
                grpName: ''
            }
        });
    }

    addTotselectedUsers = (user) => {
        let selectedUsers = this.state.selectedUsers;
        selectedUsers.push(user);
        this.setState({ selectedUsers });
    }

    removeFromSelectedUsers = (index) => {
        let selectedUsers = this.state.selectedUsers;
        let removeAccountIds = this.state.removeAccountIds;

        let account = selectedUsers.splice(index, 1);
        removeAccountIds.push(account[0].accountId);
        this.setState({ selectedUsers });
    }

    setEditable = (data, index) => {
        this.setState({
            selectedUsers: UserGroupAction.projectUserMapper(data, this.props.projectUser.list),
            showModal: true,
            edit: {
                enable: true,
                grpName: data.name,
                index,
                userGroupId: data.accountGroupId
            }
        })
    }

    createUserGroup = (name) => {

        this.props.createUserGroup({
            name,
            account_ids: UserGroupAction.makeSendAble(this.state.selectedUsers)
        });
        this.setState(deepClone(initialState));
    }

    updateUserGroup = (name) => {
        let _this = this;
        let userGrp = {
            name,
            userGroupId: _this.state.edit.userGroupId,
            account_ids: UserGroupAction.makeSendAble(this.state.selectedUsers)
        }

        UserGroupAction.updateUserGroup(this.state.edit.index, this.state.removeAccountIds, userGrp);
        this.setState(deepClone(initialState));
    }

    getTotalUser = (item) => {
        let count = 0;
        count += item.totalEnumerators;
        count += item.totalFormDesigner;
        count += item.totalSupervisor;
        count += item.totalResultUser;
        return count;
    }

    makeSingularPlural = (num, name) => {
        return (num > 1) ? `${name}s` : name;
    }

    filteredGroup = () => {
        let groups = [];
        for (let i = 0; i < this.props.userGroup.list.length; i++) {
            if (this.props.userGroup.list[i].name.toLowerCase().indexOf(this.state.searchText) > -1) {
                groups.push(this.props.userGroup.list[i]);
            }
        }
        return groups;
    }

    getuserGroup = () => {
        if (typeof this.props.userGroup.list === 'undefined') return null;

        return this.filteredGroup().map((item, index) => {

            return (
                <tr key={index}>
                    <td>
                        <div className="project_name">
                            {item.name}
                        </div>
                    </td>
                    <td className="user_group_details">
                        <span className="text_bold user_count">{this.getTotalUser(item)} {this.makeSingularPlural(this.getTotalUser(item), 'User')} </span>
                        {
                            `( ${item.totalEnumerators} ${this.makeSingularPlural(item.totalEnumerators, 'Enumerator')}, 
                            ${item.totalFormDesigner} ${this.makeSingularPlural(item.totalFormDesigner, 'From Designer')}, 
                            ${item.totalSupervisor} ${this.makeSingularPlural(item.totalSupervisor, 'Supervisor')}, 
                            ${item.totalResultUser} ${this.makeSingularPlural(item.totalResultUser, 'Result User')} )`
                        }
                    </td>
                    <td className="text_center">
                        <button className="button manage_user" onClick={() => UserGroupAction.readUserGroup(item.accountGroupId, index, this.setEditable)}>Manage User</button>
                        &nbsp; <button className="button manage_user" onClick={() => UserGroupAction.deleteUserGroup(item, index)}>Delete Group</button>
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
                        <input type="text"
                            className="search_bar"
                            placeholder="Search Here"
                            name="search"
                            onChange={(e) => this.setState({ searchText: e.target.value })}
                        />
                    </span>
                    <span className="button_area">
                        <button className="button create_btn" onClick={this.toggleModal} >create User Group</button>
                    </span>
                </div>

                <div className="settings_list">
                    <table className="bordered_table">
                        <thead>
                            <tr>
                                <th>User Group name </th>
                                <th>Group Details</th>
                                <th className="text_center">Manage Users</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.getuserGroup()}
                        </tbody>
                    </table>
                </div>
                {
                    this.state.showModal ?
                        <Modal toggleModal={this.toggleModal}
                            allUsers={this.props.projectUser.list}
                            selectedUsers={this.state.selectedUsers}
                            addTotselectedUsers={this.addTotselectedUsers}
                            removeFromSelectedUsers={this.removeFromSelectedUsers}
                            createUserGroup={this.createUserGroup}
                            updateUserGroup={this.updateUserGroup}
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
        projectUser: state.ProjectUser,
        userGroup: state.UserGroup
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        fetchAllProjectUser: ProjectUserAction.fetchAllProjectUser,
        fetchAllUserGroup: UserGroupAction.fetchAllUserGroup,
        createUserGroup: UserGroupAction.createUserGroup,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGroup);

import React from 'react';

export default class UserGroupModal extends React.Component {

    constructor(props) {
        super(props);

        console.log(JSON.stringify(this.props.edit));
        this.state = {
            userWindow: false,
            userListDropdown: false,
            grpName: this.props.edit.enable ? this.props.edit.grpName : '',
            searchName: '',
            users: this.props.allUsers,
            colors: ['moonstone_blue', 'light_green', 'olive_green', 'dark_salmon']
        }
    }

    setName = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleUserWindow = (e) => {
        e.stopPropagation();
        let _this = this;
        this.setState({
            userWindow: !_this.state.userWindow
        })
    }

    showUserList = () => {
        return (this.state.userWindow) ? { display: 'block' } : { display: 'none' };
    }

    getRandomString = () => {
        var randomNumber = Math.floor(Math.random() * this.state.colors.length);
        return this.state.colors[randomNumber];
    }

    shortName = (name) => {
        let nameArr = name.split(' ');
        let shortName = [];
        for (let i = 0; i < nameArr.length; i++) {
            shortName.push(nameArr[i].substr(0, 1))
        }
        return shortName.join('');
    }

    isAlreadySelected = (user) => {
        for (let i = 0; i < this.props.selectedUsers.length; i++) {
            if (this.props.selectedUsers[i].accountId == user.accountId)
                return [true, i];
        }
        return [false, -1]
    }

    userFilter = (e) => {

        let users = [];
        for (let i = 0; i < this.props.allUsers.length; i++) {
            let name = this.props.allUsers[i].accountInfo.firstName.concat(` ${this.props.allUsers[i].accountInfo.lastName}`)
            if (name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
                users.push(this.props.allUsers[i]);
            }
        }
        this.setState({
            [e.target.name]: e.target.value,
            users,
        })
    }

    selectUser = (e) => {
        console.log(e.target.dataset.value);
    }
    getFilteredUser = () => {
        if (this.state.users.length === 0) return null;
        return this.state.users.map((item, index) => {
            return (
                <li key={index} >
                    <label>
                        <input type="checkbox"
                            data-value={index}
                            checked={this.isAlreadySelected(item)[0]}
                            onChange={() => this.addToSelected(item)}
                        />
                        {item.accountInfo.firstName.concat(` ${item.accountInfo.lastName}`)}
                    </label>
                </li>
            )
        })
    }

    addToSelected = (user) => {

        this.setState({
            searchName: '',
            users: this.props.allUsers
        });
        let ans = this.isAlreadySelected(user);
        ans[0] ? this.props.removeFromSelectedUsers(ans[1]) : this.props.addTotselectedUsers(user);
    }

    showSelectedUsers = () => {
        return this.props.selectedUsers.map((item, index) => {
            let name = item.accountInfo.firstName.concat(` ${item.accountInfo.lastName}`);
            return (
                <div className="user_data_list" key={index}>
                    <div className={`user_avatar ${this.getRandomString()}`}> {this.shortName(name)}</div>
                    <div className="user_name">{name}<span className="user_role">{item.role.roleName}</span></div>
                    <div className="close_action" onClick={() => this.props.removeFromSelectedUsers(index)}><a href="#"><img src="styles/img/close.png" /></a></div>
                </div>
            )
        })
    }
    showUserList = () => {
        let _this = this;
        this.setState({ userListDropdown: !_this.state.userListDropdown });
    }

    render() {
        return (
            <div className="popup-mask">
                <div className="popup open">
                    <div className="popup-header">
                        <span className="title">Create User Group</span>
                        <span className="popup-close"><button className="button close_btn" onClick={this.props.toggleModal}>Close</button></span>
                    </div>
                    <div className="popup_content">
                        <div className="popup-body scrollable">
                            <div className="form_row">
                                <span className="form_label">User Group Name</span>
                                <span className="form_field">
                                    <input type="text"
                                        name="grpName"
                                        value={this.state.grpName}
                                        onChange={this.setName}
                                    />
                                </span>
                            </div>
                            <div className="user_data_container">
                                <div className="data_container_top">
                                    <span className="title">Users</span>
                                </div>
                                <div className="form_row user_search_field">
                                    <div className="form_field">
                                        <input type="text"
                                            name="searchName"
                                            value={this.state.searchName}
                                            onChange={this.userFilter}
                                            placeholder="Search user"
                                            onClick={this.showUserList}
                                        />
                                        {
                                            !this.state.userListDropdown ? null : (<div className="dropdown_panel multi_selection_dropdown">
                                                <ul className="user_list">
                                                    {this.getFilteredUser()}
                                                </ul>
                                            </div>)
                                        }
                                    </div>
                                </div>

                                {this.showSelectedUsers()}
                            </div>
                        </div>
                        <div className="popup-footer">
                            <div className="button-line">
                                <button className="button cancel_btn" onClick={this.props.toggleModal}><span className="icon_cross"><i className="fa fa-times" aria-hidden="true"></i></span>Cancel</button>
                                {
                                    this.props.edit.enable ? <button className="button create_btn" onClick={() => this.props.updateUserGroup(this.state.grpName)} >Update</button> :
                                        <button className="button create_btn" onClick={() => this.props.createUserGroup(this.state.grpName)} >Create</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
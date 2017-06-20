import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//components
import Modal from '../components/projectUserModal.component';
//actions
import * as ProjectUserAction from '../actions/projectUser.action';
import { deepClone } from '../../GeneralActions/action';

var initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: null,
  permanentAddress: '',
  presentAddress: '',
  roleId: 1
}

class Organization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            edit: {
                enable: false,
                index: -1
            },
            data: deepClone(initialState)
        }
    }

    componentDidMount() {
        this.props.fetchAllProjectUser();
    }

    dataChange = (e) => {
        let data = this.state.data;
        this.state.data[e.target.name] = e.target.value;
        this.setState({ data });
    }

    selectUserRole = (id) => {
        let data = this.state.data;
        data.roleId = id;
        this.setState({ data });
    }

    toggleModal = () => {
        let _this = this;
        this.setState({ showModal: !_this.state.showModal });
    }

    createProjectUser = () => {
        this.props.submit(this.state.data);
        this.setState({
            showModal: false,
            data: deepClone(initialState)
        });
    }

    updateProjectUser = () => {
        this.setState({
            showModal: false,
            data: deepClone(initialState),
            edit: {
                enable: false,
                index: -1
            }
        });
        ProjectUserAction.updateProjectUser(this.state.data, this.state.edit.index);
    }

    showEditableProjectUser = (data, index) => {
        this.setState({
            showModal: true,
            data: ProjectUserAction.makeEditable(data),
            edit: {
                enable: true,
                index
            }
        });
    }

    getProjectUser = () => {
        return this.props.projectUser.list.map((item, index) => {

            return (
                <tr key={index}>
                    <td className="selection"><span className="ui_checkbox unchecked"></span></td>
                    <td className="text_left">
                        <div className="project_name">
                            {`${item.accountInfo.firstName} ${item.accountInfo.lastName}`}
                            <span className="expiry_date org_name">
                                <label><i className="fa fa-envelope" aria-hidden="true"></i><a >{item.email}</a></label>
                                <label><i className="fa fa-phone" aria-hidden="true"></i><a >{item.accountInfo.phone}</a></label>
                            </span>
                        </div>
                    </td>
                    <td className="text_center">{item.role.roleName}</td>
                    <td className="text_center">{item.accountInfo.age}</td>
                    <td className="text_center">{item.accountInfo.presentAddress}</td>
                    <td className="text_center">{item.accountInfo.permanentAddress}</td>
                    <td>
                        <button className="button manage_user" onClick={() => ProjectUserAction.deleteProjectUser(item, index)} >Delete</button> &nbsp;
                        <button className="button manage_user" onClick={() => this.showEditableProjectUser(item, index)}> Edit</button>
                    </td>
                </tr>
            )
        })
    }

    render() {

        return (
            <div className="data_container">
                <div className="list_view_control_bar">
                    <div className="list_view_control_bar">
                        <span className="icon_item search_panel">
                            <input className="search_bar" type="text" placeholder="Search Here " name="search" /></span><br></br><br></br>
                        <button className="button manage_user" onClick={this.toggleModal}> create User</button>
                    </div>
                </div>

                <div className="settings_list">
                    <table className="bordered_table">
                        <thead>
                            <tr>
                                <th className="selection"><span className="ui_checkbox checked"></span></th>
                                <th className="text_left"> Name</th>
                                <th className="text_center">Role</th>
                                <th className="text_center">Age</th>
                                <th className="text_center">Permanent Address</th>
                                <th className="text_center">Present Address</th>
                                <th className="text_center"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getProjectUser()}
                        </tbody>
                    </table>
                </div>
                {
                    this.state.showModal ?
                        <Modal toggleModal={this.toggleModal}
                            dataChange={this.dataChange}
                            data={this.state.data}
                            userTypes={this.props.projectUser.userTypes}
                            submit={this.createProjectUser}
                            edit={this.state.edit}
                            updateOrganization={this.updateProjectUser}
                            selectUserRole={this.selectUserRole}
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
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        submit: ProjectUserAction.createProjectUser,
        fetchAllProjectUser: ProjectUserAction.fetchAllProjectUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
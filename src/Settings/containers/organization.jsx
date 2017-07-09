import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//components
import OranizationModal from '../components/organizationModal.component';
//actions
import * as OrganizationAction from '../actions/organization.action';
import { fetchAllLicense } from '../actions/license.action';
import { deepClone } from '../../GeneralActions/action';

var initialState = {
    orgName: '',
    licenseId: -1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    permanentAddress: '',
    presentAddress: '',
    age: null
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
        this.props.fetchAllOrganization();
        this.props.fetchAllLicense();
    }

    dataChange = (e) => {
        let data = this.state.data;
        this.state.data[e.target.name] = e.target.value;
        this.setState({ data });
    }

    selectLicense = (id) => {
        let data = this.state.data;
        data.licenseId = id;
        this.setState({ data });
    }

    toggleModal = () => {
        let _this = this;
        this.setState({ showModal: !_this.state.showModal });
    }

    createOrganization = () => {
        this.props.submit(this.state.data);
        this.setState({
            showModal: false,
            data: deepClone(initialState)
        });
    }

    updateOrganization = () => {
        this.setState({
            showModal: false,
            data: deepClone(initialState),
            edit: {
                enable: false,
                index: -1
            }
        });
        OrganizationAction.updateOrganization(this.state.data, this.state.edit.index);
    }

    showEditableOrganization = (data, index) => {
        this.setState({
            showModal: true,
            data: OrganizationAction.makeEditable(data),
            edit: {
                enable: true,
                index
            }
        });
    }

    getOrganiztion = () => {
        return this.props.organization.list.map((item, index) => {

            return (
                <tr key={index}>
                    <td className="text_left">
                        <div className="project_name">
                            {item.organization.orgName}
                            <span className="expiry_date org_name">
                                <label><i className="fa fa-envelope" aria-hidden="true"></i><a href="">{item.email}</a></label>
                                <label><i className="fa fa-phone" aria-hidden="true"></i><a href="">{item.accountInfo.phone}</a></label>
                            </span>
                        </div>
                    </td>
                    <td className="text_center">{`${item.accountInfo.firstName} ${item.accountInfo.lastName}`}</td>
                    <td className="text_center">{item.accountInfo.presentAddress}</td>
                    <td className="text_center">{item.accountInfo.permanentAddress}</td>
                    <td>
                        <button className="button manage_user" onClick={() => OrganizationAction.deleteOrganization(item, index)} >Delete</button> &nbsp;
                        <button className="button manage_user" onClick={() => this.showEditableOrganization(item, index)}> Edit</button>
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
                            <input className="search_bar" type="text" placeholder="Search Here" name="search" /></span><br></br><br></br>
                        <button className="button manage_user" onClick={this.toggleModal}> create Organization</button>
                    </div>
                </div>

                <div className="settings_list">
                    <table className="bordered_table">
                        <thead>
                            <tr>
                                <th className="text_left">Organization Name</th>
                                <th className="text_center">Contact Person</th>
                                <th className="text_center">Permanent Address</th>
                                <th className="text_center">Present Address</th>
                                <th className="text_center"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getOrganiztion()}
                        </tbody>
                    </table>
                </div>
                {
                    this.state.showModal ?
                        <OranizationModal toggleModal={this.toggleModal}
                            dataChange={this.dataChange}
                            data={this.state.data}
                            license={this.props.license}
                            submit={this.createOrganization}
                            edit={this.state.edit}
                            updateOrganization={this.updateOrganization}
                            selectLicense={this.selectLicense}
                        /> : null
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        settings: state.Settings,
        organization: state.Organization,
        license: state.License
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        submit: OrganizationAction.createOrganization,
        fetchAllLicense,
        fetchAllOrganization: OrganizationAction.fetchAllOrganization
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Organization);

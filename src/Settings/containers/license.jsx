import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//components
import Modal from '../components/licenseModal.component';
import { toastr } from 'react-redux-toastr';
//actions
import * as LicenseAction from '../actions/license.action';
import { deepClone } from '../../General/Actions/action';


var initialState = {
    licenseId: -1,
    name: '',
    projectLimit: 4,
    formDesignUserLimit: 4,
    supervisorUserLimit: 5,
    enumeratorUserLimit: 5,
    resultUserLimit: 5,
    licenseExpired: '2025-12-31 15:27:50'
}
class License extends React.Component {

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

    dataChange = (e) => {
        let data = this.state.data;
        this.state.data[e.target.name] = e.target.value;
        this.setState({ data });
    }

    componentDidMount() {
        this.props.fetchAllLicense();
    }

    componentDidUpdate() {
        let _this = this;
        if (this.props.license.toastr.msg != '') {
            toastr[this.props.license.toastr.type](this.props.license.toastr.msg, '', {
                onHideComplete: _this.props.resetToastrMsg
            });
        }
    }

    toggleModal = () => {
        let _this = this;
        console.log('clicking')
        this.setState({ showModal: !_this.state.showModal });
    }

    createLicense = () => {

        if (this.validation(this.state.data)) {
            this.props.submit(this.state.data);
            this.setState({
                showModal: false,
                data: deepClone(initialState)
            });
        }
        else {
            this.props.setToastrMsg('error', 'license name has to be unique and can not be empty');
        }
    }

    updateLicense = () => {
        if (this.validation(this.state.data)) {
            this.setState({
                showModal: false,
                data: deepClone(initialState),
                edit: {
                    enable: false,
                    index: -1
                }
            });
            LicenseAction.updateLicense(this.state.data, this.state.edit.index);
        }
        else {
            this.props.setToastrMsg('error', 'license name has to be unique and can not be empty');
        }
    }

    validation = (license) => {
        if (license.name === "") {
            return false;
        }

        for (let i = 0; i < this.props.license.list.length; i++) {
            if (this.props.license.list[i].name === license.name) {
                return false;
            }
        }
        return true;
    }

    showEditableLicense = (data, index) => {
        this.setState({
            showModal: true,
            data,
            edit: {
                enable: true,
                index
            }
        });
    }

    onCreateBtn =()=>{
        this.setState({
            data: deepClone(initialState),
            edit: {
                enable: false,
                index: -1
            }
        });
        this.toggleModal();
    }

    getLicense = () => {
        return this.props.license.list.map((item, index) => {

            return (
                <tr key={index}>
                    <td className="text_left">
                        <div className="project_name">
                            {item.name}
                            <span className="expiry_date">
                                <label>Expiry-date:</label> {item.licenseExpired}</span>
                        </div>
                    </td>
                    <td className="text_center">{item.projectLimit}</td>
                    <td className="text_center">{item.formDesignUserLimit}</td>
                    <td className="text_center">{item.supervisorUserLimit}</td>
                    <td className="text_center">{item.enumeratorUserLimit}</td>
                    <td className="text_center">{item.resultUserLimit}</td>
                    <td>
                        <button className="button manage_user" onClick={() => LicenseAction.deleteLicense(item, index)} >Delete</button> &nbsp;
                        <button className="button manage_user" onClick={() => this.showEditableLicense(item, index)}> Edit</button>
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
                        <input type="text" className="search_bar" placeholder="Search Here" name="search" />
                    </span>
                    <span className="button_area">
                        <button className="button create_btn" onClick={this.onCreateBtn}>Create License</button>
                    </span>
                </div>



                <div className="settings_list">
                    <table className="bordered_table">
                        <thead>
                            <tr>
                                <th className="text_left">Name</th>
                                <th className="text_center">Project</th>
                                <th className="text_center">Form Designer</th>
                                <th className="text_center">Supervisor User</th>
                                <th className="text_center">Enumerator User</th>
                                <th className="text_center">Result User</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getLicense()}
                        </tbody>
                    </table>
                </div>
                {
                    this.state.showModal ?
                        <Modal toggleModal={this.toggleModal}
                            dataChange={this.dataChange}
                            data={this.state.data}
                            submit={this.createLicense}
                            edit={this.state.edit}
                            updateLicense={this.updateLicense}
                        /> : null
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        license: state.License,
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        fetchAllLicense: LicenseAction.fetchAllLicense,
        submit: LicenseAction.submit,
        setToastrMsg: LicenseAction.setToastrMsg,
        resetToastrMsg: LicenseAction.resetToastrMsg,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(License);

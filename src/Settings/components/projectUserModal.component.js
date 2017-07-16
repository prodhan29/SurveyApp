import React from 'react';

export default class ProjectUserModal extends React.Component {

    getUserTypes = () => {
        return this.props.userTypes.map((item, index) => {
            return (
                <li key={index} onClick={() => this.props.selectUserRole(item.roleId)}>
                    <a href="#">{item.roleName}</a>
                </li>
            )
        })
    }

    getSeletedRole=()=>{
        for(let i=0; i<this.props.userTypes.length; i++) {
            if(this.props.userTypes[i].roleId === this.props.data.roleId)
                return this.props.userTypes[i].roleName;
        }
        return 'Select a role';
    }

    render() {

        return (
            <div className="popup-mask">
                <div className="popup open">
                    <div className="popup-header">
                        <span className="title">{this.props.edit.enable ? 'Update User' : 'Create User'}</span>
                        <span className="popup-close"><button className="button close_btn" onClick={this.props.cancelUserModal}>Close</button></span>
                    </div>
                    <div className="popup_content">
                        <div className="popup-body scrollable">

                            <div className="dual_input_row">
                                <div className="form_row">
                                    <span className="form_label">First Name</span>
                                    <span className="form_field">
                                        <input type="text"
                                            name="firstName"
                                            value={this.props.data.firstName}
                                            onChange={this.props.dataChange}
                                        />
                                    </span>
                                </div>
                                <div className="form_row">
                                    <span className="form_label">Last Name</span>
                                    <span className="form_field">
                                        <input type="text"
                                            name="lastName"
                                            value={this.props.data.lastName}
                                            onChange={this.props.dataChange} />
                                    </span>
                                </div>
                            </div>
                            <div className="dual_input_row">
                                <div className="form_row">
                                    <span className="form_label">Age</span>
                                    <span className="form_field">
                                        <input type="number"
                                            name="age"
                                            value={this.props.data.age || ''}
                                            onChange={this.props.dataChange} />
                                    </span>
                                </div>
                                <div className="form_row">
                                    <span className="form_label">Role</span>
                                    <span className="form_field rule_cell">
                                        
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                {this.getSeletedRole()}
                                                 <i className="fa fa-chevron-down"></i>
                                            </a>
                                            <ul className="dropdown-menu">

                                                {this.getUserTypes()}
                                            </ul>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="form_row">
                                <span className="form_label">Email</span>
                                <span className="form_field">
                                    <input type="email"
                                        name="email"
                                        value={this.props.data.email}
                                        onChange={this.props.dataChange}
                                    />
                                </span>
                            </div>
                            <div className="form_row">
                                <span className="form_label">Phone</span>
                                <span className="form_field">
                                    <input type="text"
                                        name="phone"
                                        value={this.props.data.phone}
                                        onChange={this.props.dataChange}
                                    />
                                </span>
                            </div>
                            <div className="form_row">
                                <span className="form_label">Permanent Address</span>
                                <span className="form_field">
                                    <input type="text"
                                        name="permanentAddress"
                                        value={this.props.data.permanentAddress}
                                        onChange={this.props.dataChange} />
                                </span>
                            </div>
                            <div className="form_row">
                                <span className="form_label">Present Address</span>
                                <span className="form_field">
                                    <input type="text"
                                        name="presentAddress"
                                        value={this.props.data.presentAddress}
                                        onChange={this.props.dataChange} />
                                </span>
                            </div>
                        </div>
                        <div className="popup-footer">
                            <div className="button-line">
                                <button className="button cancel_btn" onClick={this.props.cancelUserModal}><span className="icon_cross"><i className="fa fa-times" aria-hidden="true"></i></span>Cancel</button>
                                {this.props.edit.enable ? <button className="button create_btn" onClick={this.props.updateOrganization}>Update</button> : <button className="button create_btn" onClick={this.props.submit}>Create</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 
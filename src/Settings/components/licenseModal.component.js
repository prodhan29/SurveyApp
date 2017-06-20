import React from 'react';

export default class LicenseModal extends React.Component {

    render() {
        return (
            <div className="modal popup-mask">
                <div className="popup open">
                    <div className="popup-header">
                        <span className="title">{this.props.edit.enable ? 'Update License' : 'Create license'}</span>
                        <span className="popup-close">
                            <button className="button close_btn" onClick={this.props.toggleModal}>Close</button></span>
                    </div>
                    <div className="popup_content">
                        <div className="popup-body">
                            <div className="form_row">
                                <span className="form_label">Name</span>
                                <span className="form_field">
                                    <input type="text"
                                        name="name"
                                        value={this.props.data.name}
                                        onChange={this.props.dataChange}
                                    />
                                </span>
                            </div>
                            <div className="dual_input_row">
                                <div className="form_row">
                                    <span className="form_label">Project Limit</span>
                                    <span className="form_field">
                                        <input type="number"
                                            name="projectLimit"
                                            value={this.props.data.projectLimit}
                                            onChange={this.props.dataChange}
                                        />
                                    </span>
                                </div>
                                <div className="form_row">
                                    <span className="form_label">Form Designer Limit</span>
                                    <span className="form_field">
                                        <input type="number"
                                            name="formDesignUserLimit"
                                            value={this.props.data.formDesignUserLimit}
                                            onChange={this.props.dataChange}
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="dual_input_row">
                                <div className="form_row">
                                    <span className="form_label">Enumerator User Limit</span>
                                    <span className="form_field">
                                        <input type="number"
                                            name="enumeratorUserLimit"
                                            value={this.props.data.enumeratorUserLimit}
                                            onChange={this.props.dataChange}
                                        />
                                    </span>
                                </div>
                                <div className="form_row">
                                    <span className="form_label">Supervisior User Limit</span>
                                    <span className="form_field">
                                        <input type="number"
                                            name="supervisorUserLimit"
                                            value={this.props.data.supervisorUserLimit}
                                            onChange={this.props.dataChange}
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="form_row">
                                <span className="form_label">Expiry Date</span>
                                <span className="form_field">
                                    <input type="date"
                                        name="licenseExpired"
                                        value={this.props.data.licenseExpired}
                                        onChange={this.props.dataChange} />
                                </span>
                            </div>
                        </div>



                        <div className="popup-footer">
                            <div className="button-line">
                                <button className="button cancel_btn" onClick={this.props.toggleModal}><span className="icon_cross"><i className="fa fa-times" aria-hidden="true"></i></span>Cancel</button>
                                {this.props.edit.enable ? (<button className="button create_btn" onClick = {this.props.updateLicense}>Update</button>) : (<button className="button create_btn" onClick = {this.props.submit}>Create</button>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
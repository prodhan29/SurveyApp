import React from 'react';

export default class ProjectCreateModal extends React.Component {

    render() {
        return (
            <div className="popup-mask">
                <div className="popup open">
                    <div className="popup-header">
                        <span className="title">Create Project</span>
                        <span className="popup-close"><button className="button close_btn" onClick={this.props.toggleModal}>Close</button></span>
                    </div>
                    <div className="popup_content">
                        <div className="popup-body scrollable">
                            <div className="form_row">
                                <span className="form_label">Permanent Address</span>
                                <span className="form_field">
                                    <input type="text" name="full_name" />
                                </span>
                            </div>
                            <div className="form_row">
                                <span className="ui_checkbox checked"></span>
                                Section allowed
                        </div>
                            <div className="form_row">V1.0.0</div>
                        </div>
                        <div className="popup-footer">
                            <div className="button-line">
                                <button className="button cancel_btn" onClick={this.props.toggleModal}><span className="icon_cross"><i className="fa fa-times" aria-hidden="true"></i></span>Cancel</button>
                                <button className="button create_btn">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
import React from 'react';

export default class ProjectCreateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            published: false,
            sectionAllowed: true,
            version: '1.00'
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    booleanChange = (e) => {
        let _this = this;
        this.setState({
            [e.target.name]: e.target.checked
        })
    }

    createProject = () => {
        this.props.createProject(this.state);
        this.props.toggleModal();
    }
    render() {
        return (
            <div className="popup-mask">
                <div className="popup open">
                    <div className="popup-header">
                        <span className="title">Create Project</span>
                        <span className="popup-close">
                            <button className="button close_btn" onClick={this.props.toggleModal}>Close</button></span>
                    </div>
                    <div className="popup_content">
                        <div className="popup-body scrollable">
                            <div className="form_row">
                                <span className="form_label">Name</span>
                                <span className="form_field">
                                    <input type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        placeholder='sample project'
                                    />
                                </span>
                            </div>

                            <div className="form_row">
                                <span className="form_label">Version</span>
                                <input type="text"
                                    name="version"
                                    value={this.state.version}
                                    onChange={this.handleChange}
                                    placeholder='v.1.0'
                                />
                            </div>
                            <div className="form_row">
                                <lable>
                                    <input type="checkbox"
                                        name="sectionAllowed"
                                        checked={this.state.sectionAllowed}
                                        onChange={this.booleanChange}
                                    /> &nbsp;
                                    Section allowed
                                </lable>
                            </div>
                            
                        </div>
                        <div className="popup-footer">
                            <div className="button-line">
                                <button className="button cancel_btn" onClick={this.props.toggleModal}><span className="icon_cross"><i className="fa fa-times" aria-hidden="true"></i></span>Cancel</button>
                                <button className="button create_btn" onClick={this.createProject}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
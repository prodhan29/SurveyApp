import React from 'react';
import {getUserPrivilege} from '../actions/privilege.component.js';

export default class Privilege extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data:{}
        }

    }
    componentDidMount() {
        getUserPrivilege(this.setUserPrivilege);
    }

    setUserPrivilege=(response)=>{
        console.log(response);
        this.setState({data: response});
    }

    render() {
        return (
            <div className="container">
                <div className="form_row">
                    <span className="form_label">Name</span>
                    <span className="form_field">
                        <input type="text"
                            name="name"
                            value={this.state.data.name}
                            disabled={true}
                        />
                    </span>
                </div>
                <div className="dual_input_row">
                    <div className="form_row">
                        <span className="form_label">Project Limit</span>
                        <span className="form_field">
                            <input type="number"
                                name="projectLimit"
                                value={this.state.data.projectLimit}
                                disabled={true}
                            />
                        </span>
                    </div>
                    <div className="form_row">
                        <span className="form_label">Form Designer Limit</span>
                        <span className="form_field">
                            <input type="number"
                                name="formDesignUserLimit"
                                value={this.state.data.formDesignUserLimit}
                                disabled={true}
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
                                value={this.state.data.enumeratorUserLimit}
                                disabled={true}
                            />
                        </span>
                    </div>
                    <div className="form_row">
                        <span className="form_label">Supervisior User Limit</span>
                        <span className="form_field">
                            <input type="number"
                                name="supervisorUserLimit"
                                value={this.state.data.supervisorUserLimit}
                                disabled={true}
                            />
                        </span>
                    </div>
                </div>
                <div className="form_row">
                    <span className="form_label">Expiry Date</span>
                    <span className="form_field">
                        <input type="text"
                            name="licenseExpired"
                            value={this.state.data.licenseExpired}
                            disabled={true} />
                    </span>
                </div>
            </div>
        );
    }
}
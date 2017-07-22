'use strict'

import React from 'react';
import TickValidation from '../common/tickValidation.component';

// seperated this component for barcode. because barcode don't need this validation
class OtherValidation extends React.Component {

    render() {
        return (
            <div>
                <div className="segment_title">Smart Correct</div>
                <div className="form_row checkbox_row">
                    <div className="">
                        <label>
                            <input type="checkbox"
                                name="removeAccessSpace"
                                data=''
                                onChange={this.props.onchange}
                                checked={this.props.data.removeAccessSpace} />
                            &nbsp; Remove Access Space
                            </label>
                    </div>
                    <div className="">
                        <label>
                            <input type="checkbox"
                                name="oneWord"
                                data=''
                                onChange={this.props.onchange}
                                checked={this.props.data.oneWord} />
                            &nbsp; One word
                            </label>
                    </div>
                </div>
                <TickValidation data='caseNormalization'
                    onchange={this.props.onchange}
                    ans={this.props.data.caseNormalization} />
            </div>
        );
    }
}

export default class TextValidation extends React.Component {

    getOtherValidation = () => {
        return (this.props.project.active.panel === 'barcode') ?
            null : <OtherValidation data={this.props.data}
                onchange={this.props.dataChange} />;
    }

    getAns = () => {
        if (!this.props.data.fieldType.treatAsError && !this.props.data.fieldType.treatAsWarning) { return 3; }
        else if (this.props.data.fieldType.treatAsError) { return 2; }
        else { return 1; }
    }

    render() {
        return (
            <div>
                <div className="form_row">
                    <span className="form_label">Length</span>
                    <span className="form_field">
                        <input type="number"
                            name="length"
                            data=''
                            value={this.props.data.length}
                            onChange={this.props.dataChange} />
                    </span>
                </div>
                {this.getOtherValidation()}
                <TickValidation data="treatValidation"
                    onchange={this.props.dataChange}
                    ans={this.getAns()} />
            </div>
        );
    }
}


import React from 'react';
import TreatValidation from '../common/tickValidation.component'

const TextInput = (props) => (
    <div className="form_row">
        <span className="form_label">{props.name}</span>
        <span className="form_field">
            <input type="text"
                name={props.name}
                value={props.value}
                onChange={props.handleChange} />
        </span>
    </div>
);

export default class NumberValidation extends React.Component {

    getAns = () => {
        if (!this.props.data.fieldType.treatAsError && !this.props.data.fieldType.treatAsWarning) { return 3; }
        else if (this.props.data.fieldType.treatAsError) { return 2; }
        else { return 1; }
    }

    handleChange = (e) => {

        var ob = {
            target: {
                name: 'validationRange',
                value: '',
                attributes: {
                    data: ''
                }
            }
        }
        var value = this.props.data.validationRange.split('-');
        if (e.target.name === 'From') value[0] = e.target.value;
        else value[1] = e.target.value;

        ob.target.value = value.join('-');
        this.props.dataChange(ob);
    }

    render() {

        return (
            <div>
                <div className="segment_title">Set range</div>
                <TextInput name="From"
                    value={this.props.data.validationRange.split('-')[0]}
                    handleChange={this.handleChange} />

                <TextInput name="To"
                    value={this.props.data.validationRange.split('-')[1]}
                    handleChange={this.handleChange} />

                <TreatValidation data="treatValidation"
                    onchange={this.props.dataChange}
                    ans={this.getAns()} />
            </div>
        );
    }
}

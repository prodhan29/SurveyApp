'use strict'

import React from 'react';

export default class AllowedValues extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            ob: {
                target: {
                    name: 'allowedValues',
                    value: '',
                    attributes: {
                        data: ''
                    }
                }
            }
        }
    }

    nameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    submit = (e) => {
        if (e.charCode === 13) {
            this.props.data.push(e.target.value);
            this.state.ob.target.value = this.props.data;
            this.props.dataChange(this.state.ob);
            this.setState({ name: '' })
        }
    }

    deleteOption = (index) => {
        this.props.data.splice(index, 1);
        this.state.ob.target.value = this.props.data;
        this.props.dataChange(this.state.ob);
    }

    render() {
        var _this = this;
        const optionELements = this.props.data.map(function (value, index) {
            return (
                <tr key={index}>
                    <td>{value}</td>
                    <td className="value_action" onClick={() => _this.deleteOption(index)}>
                        <span className="delete_row"><i className="material-icons">close</i></span>
                    </td>
                </tr>
            );
        })

        return (
            <div>
                <div className="segment_title">Set Allowed Values</div>
                <div className="form_row">
                    <span className="form_label">Name:</span>
                    <span className="form_field">
                        <input type="text"
                            value={this.state.name}
                            onChange={this.nameChange}
                            onKeyPress={this.submit} />
                    </span>
                </div>
                <div className="values_block">
                    <table className="value_table">
                        <thead>
                            <tr>
                                <th className="option_name">Allowed Values</th>
                                <th className="value_action"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {optionELements}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

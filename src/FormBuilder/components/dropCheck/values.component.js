'use strict'

import React from 'react';

export default class NumberValidation extends React.Component {

    constructor() {
        super();
        this.state = {
            optionName: '',
            exportValue: '',
            ob :{
                target:{
                    name: 'optionValues',
                    value: [],
                    attributes:{
                        data:''
                    }
                }
            }
        }
    }

    handleChange=(e)=>{
        this.state[e.target.name] = e.target.value;
        var state = this.state;
        this.setState({state});
    }

    submitOption=(e)=>{
        if(e.charCode == 13){
            var _this = this;
            this.state.ob.target.value.push({
                option: _this.state.optionName,
                value: _this.state.exportValue
            });
            this.setState({optionName: '', exportValue: ''})
            this.props.dataChange(this.state.ob);
        }
    }

    deleteOption=(index)=>{
        this.props.data.splice(index, 1);
        this.state.ob.target.value = this.props.data;
        this.props.dataChange(this.state.ob);
    }

    render() {

        var _this = this;
        const optionELements = this.props.data.map(function(ob, index){
            return(
                <tr key = {index}>
                    <td>{ob.option}</td>
                    <td>{ob.value}</td>
                    <td className="value_action" onClick = {()=> _this.deleteOption(index)}>
                        <span className="delete_row"><i className="material-icons">close</i></span>
                    </td>
                </tr>
            );
        })

        return(
            <div>
                <div className="segment_title">Set Options</div>
                <div className="form_row">
                    <span className="form_label">Option name</span>
                    <span className="form_field">
                        <input type="text"
                                name='optionName'
                                value = {this.state.optionName}
                                onChange = {this.handleChange}  />
                    </span>
                </div>
                <div className="form_row">
                    <span className="form_label">Export Value</span>
                    <span className="form_field">
                        <input type="text" name = 'exportValue'
                                            value = {this.state.exportValue}
                                            onChange = {this.handleChange}
                                            onKeyPress = {this.submitOption} />
                    </span>
                </div>
                <div className="values_block">
                    <table className="value_table">
                        <thead>
                            <tr>
                                <th className="option_name">Option Name</th>
                                <th className="export_value">Export Value</th>
                                <th className="value_action"> </th>
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

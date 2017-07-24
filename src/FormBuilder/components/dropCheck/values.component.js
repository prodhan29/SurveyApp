import React from 'react';
import {downloadSample} from '../../actions/question.action.js';

var resetEdit = {
    mode: false,
    index: -1,
    optionName: '',
    exportValue: ''
}

export default class NumberValidation extends React.Component {

    constructor() {
        super();
        this.state = {
            optionName: '',
            exportValue: '',
            edit: resetEdit,
            ob: {
                target: {
                    name: 'optionValues',
                    value: [],
                    attributes: {
                        data: ''
                    }
                }
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitOption = (e) => {
        if (e.charCode === 13) {
            var _this = this;
            // this.state.ob.target.value.push();
            this.props.data.push({
                name: _this.state.optionName,
                exportValue: _this.state.exportValue
            });
            this.state.ob.target.value = this.props.data;
            this.setState({ optionName: '', exportValue: '' })
            this.props.dataChange(this.state.ob);
        }
    }

    deleteOption = (index) => {
        this.props.data.splice(index, 1);
        this.state.ob.target.value = this.props.data;
        this.props.dataChange(this.state.ob);
    }

    editOption = (e) => {
        let edit = this.state.edit;
        edit[e.target.name] = e.target.value;
        this.setState({ edit });
    }

    turnOnEditOption = (index) => {
        let _this = this;
        this.setState({
            edit: {
                mode: !_this.state.edit.mode,
                index,
                optionName: _this.props.data[index].name,
                exportValue: _this.props.data[index].exportValue,
            }
        })
    }

    doneEdit = () => {
        let index = this.state.edit.index;
        this.props.data[index].name = this.state.edit.optionName;
        this.props.data[index].exportValue = this.state.edit.exportValue;
        this.state.ob.target.value = this.props.data;
        this.props.dataChange(this.state.ob);
        this.setState({
            edit: resetEdit
        })
    }

    cancelEdit = () => {
        this.setState({
            edit: resetEdit
        })
    }

    getOption = (ob, index) => {
        let _this = this;
        if (index === this.state.edit.index) {
            return (
                <tr className="edit_row" key={index}>
                    <td>
                        <input type='text'
                            style={{ width: '100%' }}
                            name='optionName'
                            value={_this.state.edit.optionName}
                            onChange={_this.editOption} />
                    </td>
                    <td>
                        <input type='text'
                            style={{ width: '100%' }}
                            name='exportValue'
                            value={_this.state.edit.exportValue}
                            onChange={_this.editOption} />
                    </td>
                    <td className="value_action">
                        <div className="value_action_block">
                            <span className="update"><i className="material-icons" onClick={_this.doneEdit}>done</i></span>
                            <span className="delete"><i className="material-icons" onClick={_this.cancelEdit}>close</i></span>
                        </div>
                    </td>
                </tr>
            );
        }
        else {
            return (
                <tr key={index} onClick={() => _this.turnOnEditOption(index)}>
                    <td>{ob.name}</td>
                    <td>{ob.exportValue}</td>
                    <td className="value_action" onClick={function (e) { e.stopPropagation(); _this.deleteOption(index) }}>
                        <span className="delete_row"><i className="material-icons">close</i></span>
                    </td>
                </tr>
            );
        }
    }

    uploadOption = (e) => {
        var file = e.target.files[0];
        let reader = new FileReader();
        let _this = this;

        reader.onload = function (e) {
            var res = e.target.result;
            var words = res.split("\n");

            words.forEach(function (value) {
                _this.state.ob.target.value.push({
                    name: value.split(',')[0],
                    exportValue: value.split(',')[1]
                });
            }, this);

            _this.setState({ optionName: '', exportValue: '' })
            _this.props.dataChange(_this.state.ob);
            document.getElementById("file-upload").value = "";
        }
        reader.readAsText(file);
    }

    removeAll = () => {
        this.state.ob.target.value = [];
        this.props.dataChange(this.state.ob);
    }

    render() {

        var _this = this;
        const optionELements = this.props.data.map(function (ob, index) {
            return _this.getOption(ob, index);
        })

        return (
            <div>
                <div className="segment_title segment_title_with_action">Set Options
                    <span className="add dropdown">
                        <i className="material-icons" data-toggle="dropdown">more_vert</i>
                        <div className="dropdown_panel action_dropdown dropdown-menu">
                            <ul>
                                <li onClick={this.removeAll}>Remove All</li>
                                <li onClick={()=>downloadSample('optionValues')}> Sample</li>
                                <li><input id='file-upload' type='file' onChange={this.uploadOption} /> Import </li>
                            </ul>
                        </div>
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
                            <tr className="edit_row">
                                <td>
                                    <input type="text"
                                        name='exportValue'
                                        value={this.state.exportValue}
                                        onChange={this.handleChange}
                                        onKeyPress={this.submitOption} />
                                </td>
                                <td>
                                    <input type="text"
                                        name='optionName'
                                        value={this.state.optionName}
                                        onChange={this.handleChange}
                                        onKeyPress={this.submitOption} />
                                </td>
                                <td className="value_action">

                                </td>
                            </tr>
                            {optionELements}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

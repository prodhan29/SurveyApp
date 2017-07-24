import React from 'react';
import {downloadSample} from '../../actions/question.action.js';

var resetEdit = {
    mode: false,
    index: -1,
    name: ''
}

export default class AllowedValues extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            edit: resetEdit,
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

    componentWillMount() {
        if(this.props.data ===null){
            this.state.ob.target.value = [];
            this.props.dataChange(this.state.ob);
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

    editOption = (e) => {
        let edit = this.state.edit;
        edit.name = e.target.value;
        this.setState({ edit });
    }

    deleteOption = (index) => {
        this.props.data.splice(index, 1);
        this.state.ob.target.value = this.props.data;
        this.props.dataChange(this.state.ob);
    }

    turnOnEditOption = (index) => {
        let _this = this;
        this.setState({
            edit: {
                mode: !_this.state.edit.mode,
                index,
                name: _this.props.data[index]
            }
        })
    }

    doneEdit = () => {
        let index = this.state.edit.index;
        this.props.data[index] = this.state.edit.name;
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

    getOption = (value, index)=>{
          let _this = this;
        if (index === this.state.edit.index) {
            return (
                <tr className="edit_row" key={index}>
                    <td>
                        <input type='text'
                            style={{ width: '100%' }}
                            name='name'
                            value={_this.state.edit.name}
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
                    <td>{value}</td>
                    <td className="value_action" onClick={function (e) { e.stopPropagation(); _this.deleteOption(index) }}>
                        <span className="delete_row"><i className="material-icons">close</i></span>
                    </td>
                </tr>
            );
        }
    }

    removeAll=(e)=>{
        this.state.ob.target.value = [];
        this.props.dataChange(this.state.ob);
    }

    uploadOption = (e) => {
        var file = e.target.files[0];
        let reader = new FileReader();
        let _this = this;

        reader.onload = function (e) {
            var res = e.target.result;
            var words = res.split("\n");

            words.forEach(function (value) {
                console.log(value);
                _this.state.ob.target.value.push(value);
            }, this);

            _this.props.dataChange(_this.state.ob);
            document.getElementById("file-upload").value = "";
        }
        reader.readAsText(file);
    }

    getOptionELements=(e)=>{
        if(this.props.data === null) {
            return null;
        }
        return this.props.data.map((value, index)=>{
            return this.getOption(value, index);
        })
    }

    render() {
        return (
            <div>
                  <div className="segment_title segment_title_with_action">Set Allowed Values
                    <span className="add dropdown">
                        <i className="material-icons" data-toggle="dropdown">more_vert</i>
                        <div className="dropdown_panel action_dropdown dropdown-menu">
                            <ul>
                                <li onClick={this.removeAll}>Remove All</li>
                                <li onClick={()=> downloadSample('suggestions')}>sample </li>
                                <li><input id='file-upload' type='file' onChange={this.uploadOption} /> </li>
                            </ul>
                        </div>
                    </span>
                </div>
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
                            {this.getOptionELements()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

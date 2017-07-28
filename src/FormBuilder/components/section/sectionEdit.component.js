import React from 'react';

export default class SectionEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(this.props.data));
    }

    changeData = (e) => {
        if (e.target.type === 'checkbox') {
            this.setState({
                repetitive: e.target.checked
            })
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    updateData = () => {
        this.props.updateData(this.state);
        this.props.cancelEdit();
    }

    copyData =()=>{
        this.props.copyData(this.state);
        this.props.cancelEdit();
    }

    render() {
        return (
            <div className="add_section_dropdown dropdown_panel edit_section">
                <form className="add_section_form">
                    <div className="form_row">
                        <span className="form_label">Section Name</span>
                        <span className="form_field">
                            <input type="text"
                                name="name"
                                onChange={this.changeData}
                                value={this.state.name} />
                        </span>
                    </div>
                    <div className="form_row">
                        <span className="form_label">Description</span>
                        <span className="form_field">
                            <textarea name="description"
                                onChange={this.changeData}
                                value={this.state.description}>
                        </textarea>
                        </span>
                    </div>
                    <div className="form_row checkbox_row">
                        <div className="">
                            <label>
                                <input type="checkbox"
                                    checked={this.state.repetitive}
                                    onChange={this.changeData}
                                    name="repetitive" />Repeatable
                            </label>
                        </div>
                    </div>
                </form>
                <div className="btn_row flex_btn_row">
                    
                    {this.props.editOrCopy ? <button onClick={this.copyData}>Copy</button> : <button onClick={this.updateData}>Update</button>}
                    <button onClick={this.props.cancelEdit}>Cancel</button>
                </div>
            </div>
        );
    }
}

import React from 'react';

export default class AddSection extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            repetitive: false
        }
    }

    handleChange = (e) => {
        var ob = {};
        ob[e.target.name] = e.target.value;
        this.setState(ob);
    }

    repetitiveChange = (e) => {
        this.setState({ repetitive: this.state.repetitive ? false : true });
    }

    render() {
        return (
            <div id="sectionAdd" className="action_item">Add Section
            <div className="add_section_dropdown dropdown_panel">
                    <div className="add_section_form">
                        <div className="form_row">
                            <span className="form_label">Section Name</span>
                            <span className="form_field">
                                <input type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange} />
                            </span>
                        </div>
                        <div className="form_row">
                            <span className="form_label">Description</span>
                            <span className="form_field">
                                <textarea name="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}>

                                </textarea>
                            </span>
                        </div>
                        <div className="form_row checkbox_row">
                            <div className="">
                                <label>
                                    <input type="checkbox"
                                        name="repetitive"
                                        checked={this.state.repetitive}
                                        onChange={this.repetitiveChange} />
                                    Repeatable
                            </label>
                            </div>
                        </div>
                    </div>
                    <div className="btn_row flex_btn_row">
                        <button onClick={() => this.props.submit(this.state)}>
                            Add
                        </button>
                        <button onClick={this.props.close}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

        );
    }
}

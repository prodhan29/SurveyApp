import React from 'react';

export default class SectionInitial extends React.Component {

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
            <div className="add_section_content" style={this.props.display}>
                <div className="add_section_blurb">
                    <h3>To get started with<br></br>form builder, Add Section first</h3>
                </div>
                <section className="add_section_form">
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
                    <div className="form_row">
                        <button className="black_btn" onClick={() => this.props.submit(this.state)} >Create</button>
                    </div>
                    <div className="add_section_or"><span>Or</span></div>
                    <div className="form_row">
                        <button className="red_btn">Import Section</button>
                    </div>
                </section>
            </div>
        )
    }
}
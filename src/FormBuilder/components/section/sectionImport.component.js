import React from 'react';

export default class AddSection extends React.Component {

    submit =(e)=>{
        this.props.submit(e);
        this.props.close();
    }

    toggleWindow=(e)=>{
        e.stopPropagation(); 
        this.props.close();
    }
    render() {
        return (
            <div id="sectionAdd" className="action_item" onClick = {this.toggleWindow}>Import Section
                <div className="import_section_dropdown dropdown_panel">
                    <input id="import-section" type="file" onChange={this.submit} />
                </div>
            </div>
        );
    }
}

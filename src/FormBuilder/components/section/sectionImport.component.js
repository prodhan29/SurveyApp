import React from 'react';

export default class ImportSection extends React.Component {

    detectOutside = (e) => {
        console.log(e.target);
        if (e.target != null && document.getElementById('sectionImport').contains(e.target)) {}
        else if (e.target.id != 'import_2nd_button') {
            // Clicked outside the box
            this.props.close();
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.detectOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.detectOutside, false);
    }

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
            <div className="action_item" >Import Section
                <div className="import_section_dropdown dropdown_panel">
                    <input id="import-section" type="file" onChange={this.submit} />
                </div>
            </div>
        );
    }
}

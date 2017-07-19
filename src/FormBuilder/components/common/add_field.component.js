import React from 'react';


export default class AddField extends React.Component {

    constructor() {
        super();
        this.state = {
            activePanel: 'general',
            general: ["text", "suggestion", "number", "float", "date", "time", "checkbox", "dropdown"],
            group: ["groupdrop"],
            other: ["image", "barcode", "gprs", "signature"]
        }
    }

    componentDidMount() {
        console.log( typeof window.onclick);
        let _this = this;
        window.onclick = function(e){
            console.log(e.target.id);
            if(e.target.id != 'field-type') {
                _this.props.onClick();
            }
        }
    }

    componentWillUnmount() {
        
       window.onclick = null;
       console.log('component is unmounting');
    }

    changePanel = (data) => {

        console.log(data);
        this.setState({
            activePanel: data
        })
    }

    getclassName = (data) => {

        return (data === this.state.activePanel) ? "tab_nav_item active" : "tab_nav_item";
    }

    selectPanel = (value) => {
        this.props.selectConfigPanel(value);
        this.props.onClick();
    }
    render() {

        var _this = this;
        const fieldItems = this.state[this.state.activePanel].map(function (val, index) {

            return (
                <div className={`field_type ${val}`} key={index} onClick={() => _this.selectPanel(val)}>
                    <span className="field_type_icon"></span>
                    <span className="field_type_text"> {val} </span>
                </div>
            );
        });


        return (

            <div  className="add_field_row">
                <button onClick={this.props.onClick} >Add Field</button>
                <div id="fieldbox" className="add_field_dropdown dropdown_panel" >
                    <ul className="tab_nav compact_nav">
                        <li id="field-type" className={this.getclassName('general')}
                            onClick={() => this.changePanel('general')}>General Fields</li>

                        <li id="field-type" className={this.getclassName('group')}
                            onClick={() => this.changePanel('group')}>Group Fields</li>

                        <li id="field-type" className={this.getclassName('other')}
                            onClick={() => this.changePanel('other')}>Other Fields</li>
                    </ul>
                    <div className="tab_content">
                        <div className="field_type_items">
                            {fieldItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

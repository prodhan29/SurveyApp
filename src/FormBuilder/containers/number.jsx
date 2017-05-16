'user strict'

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as NumberAction from '../actions/number.action';

// Components
import General from '../components/common/field_general.component';
import Validation from '../components/number/validation.component';
import Rules from '../components/common/rules.component';

class Number extends React.Component {

    getPanels=()=>{

        var _this = this;
        const panels = this.props.number.configPanels.map(function(value, index){
            var active = (_this.props.number.activePanel == value) ? "tab_nav_item active"
                                                                : "tab_nav_item ";
            return(
                <li className = {active} key = {index}
                                     name = {value}
                                     onClick = {()=> _this.props.changeConfigPanel(value) }>
                    {value}
                </li>
            );
        });
        return panels;
    }

    getActivePanel=()=> {

        switch(this.props.number.activePanel){

            case 'Rules':
                return <Rules rules = '0 1 2' />;
            case 'Validation':
                return <Validation data = {this.props.number.data}
                                    dataChange = {this.props.dataChange} />;
            default:
                return <General data = {this.props.number.data}
                                dataChange = {this.props.dataChange} />;
        }
    }

    render() {

        return(
            <section className="builder_right field_configuration">
                <ul className="tab_nav compact_nav">
                    { this.getPanels() }
                </ul>
                <div className="tab_content">
                    { this.getActivePanel() }
                </div>
            </section>
        )
    }
}

function mapStateToProps( state ){

    return {
        number: state.Number
    };
}

function mapDispatchToProps( dispatch ) {

    return bindActionCreators( {
        dataChange       : NumberAction.dataChange,
        changeConfigPanel: NumberAction.configPanelChange
    }, dispatch );

}

export default connect(mapStateToProps, mapDispatchToProps)(Number);

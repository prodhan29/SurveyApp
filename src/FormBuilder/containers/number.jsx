
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as NumberAction from '../actions/number.action';
import {questionLiveUpdate} from '../actions/question.action';

// Components
import General from '../components/common/field_general.component';
import Validation from '../components/number/validation.component';
import Rules from '../components/common/rules.component';

class Number extends React.Component {

    getPanels = () => {

        var _this = this;
        const panels = this.props.number.configPanels.map(function (value, index) {
            var active = (_this.props.number.activePanel === value) ? "tab_nav_item active" : "tab_nav_item ";
            return (
                <li className={active} key={index}
                    name={value}
                    onClick={() => _this.props.changeConfigPanel(value)}>
                    {value}
                </li>
            );
        });
        return panels;
    }

    dataChange =(e)=>{
        this.props.dataChange(e);
        this.props.questionLiveUpdate(e);
    }

    getActivePanel = () => {

        switch (this.props.number.activePanel) {

            case 'Rules':
                return (
                    <Rules rules='0 1 2' />
                );

            case 'Validation':
                return (
                    <Validation data={this.props.number.data}
                        dataChange={this.dataChange} />
                );
                
            default:
                return (
                    <General data={this.props.number.data}
                        dataChange={this.dataChange} />
                );
        }
    }

    render() {

        return (
            <section >
                <ul className="tab_nav compact_nav">
                    {this.getPanels()}
                </ul>
                <div className="tab_content">
                    {this.getActivePanel()}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {

    return {
        number: state.Number
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        dataChange: NumberAction.dataChange,
        questionLiveUpdate: questionLiveUpdate,
        changeConfigPanel: NumberAction.configPanelChange
    }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Number);

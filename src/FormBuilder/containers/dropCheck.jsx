
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as DropCheckAction from '../actions/dropCheck.action';
import {questionLiveUpdate} from '../actions/question.action';

// Components
import General from '../components/common/field_general.component';
import Rules from '../components/common/rules.component';
import Values from '../components/dropCheck/values.component';
import Validation from '../components/common/tickValidation.component';

class DropCheck extends React.Component {

    getPanels = () => {

        var _me = this;
        var panelNames = this.props.dropCheck.configPanels[this.props.project.active.panel];
        const panels = panelNames.map(function (value, index) {

            var active = (_me.props.dropCheck.activePanel === value) ? "tab_nav_item active" : "tab_nav_item ";
            return (
                <li className={active}
                    key={index}
                    name={value}
                    onClick={() => _me.props.changeConfigPanel(value)}>
                    {value}
                </li>
            );
        });
        return panels;
    }

    getValidationAns = () => {
        if (!this.props.dropCheck.data.fieldType.treatAsError
            && !this.props.dropCheck.data.fieldType.treatAsWarning) { return 3; }

        else if (this.props.dropCheck.data.fieldType.treatAsError) { return 2; }
        else { return 1; }
    }

    dataChange =(e)=>{
        this.props.dataChange(e);
        this.props.questionLiveUpdate(e);
    }

    getActivePanel = () => {

        switch (this.props.dropCheck.activePanel) {

            case "Validation":
                return (
                    <Validation data='treatValidation'
                        ans={this.getValidationAns()}
                        onchange={this.dataChange} />
                );

            case "Rules":
                return (
                    <Rules rules='1 3' />
                );

            case "Values":
                return (
                    <Values data={this.props.dropCheck.data.optionValues}
                        dataChange={this.dataChange} />
                );
            default:
                return (
                    <General data={this.props.dropCheck.data}
                        dataChange={this.dataChange} />
                );
        }
    }

    render() {

        return (
            <section>
                <ul className="tab_nav compact_nav">
                    {this.getPanels()}
                </ul>
                <div className="tab_content values_content">
                    {this.getActivePanel()}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {

    return {
        dropCheck: state.DropCheck,
        project: state.Project
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        dataChange: DropCheckAction.dataChange,
        questionLiveUpdate: questionLiveUpdate,
        changeConfigPanel: DropCheckAction.configPanelChange
    }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(DropCheck);

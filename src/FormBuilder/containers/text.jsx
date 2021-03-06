
// this container represents 3 types
// 1)text  2)suggestion 3)Barcode

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import General from '../components/common/field_general.component';
import TextValidation from '../components/text/validation.component';
import Values from '../components/text/values.component';

// Actions
import * as TextAction from '../actions/text.action';
import {questionLiveUpdate} from '../actions/question.action';

class Text extends React.Component {

    handleChange = (e) => {
        this.props.changeConfigPanel(e);
    }

    getPanels = () => {

        var _this = this;
        const panels = this.props.txt.configPanels.map(function (value, index) {

            var active = (_this.props.txt.activePanel === value) ? "tab_nav_item active" : "tab_nav_item ";
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

        switch (this.props.txt.activePanel) {

            case "Values":
                return <Values data={this.props.txt.data.allowedValues}
                    dataChange={this.dataChange} />

            case "Validation":
                return <TextValidation project={this.props.project}
                    data={this.props.txt.data}
                    dataChange={this.dataChange} />

            default:
                return <General data={this.props.txt.data}
                    dataChange={this.dataChange}
                    selectedSectionIndex={this.props.project.active.section.index}  />
        }
    }

    render() {

        return (
            <section className="builder_right_inner">
                <ul className="tab_nav compact_nav">
                    {this.getPanels()}
                </ul>
                <div className="tab_content">
                    {this.getActivePanel()}
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {

    return {
        txt: state.Text,
        project: state.Project
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        dataChange: TextAction.dataChange,
        questionLiveUpdate: questionLiveUpdate,
        changeConfigPanel: TextAction.textConfigurePanelChange

    }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Text);

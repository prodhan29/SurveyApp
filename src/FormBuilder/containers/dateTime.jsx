
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as dateTimeAction from '../actions/datetime.action';

// Components
import General from '../components/common/field_general.component';
import Rules from '../components/common/rules.component';
import Validation from '../components/dateTime/validation.component';

class DateTime extends React.Component {

    getPanels = () => {

        var _me = this;
        var panelNames = this.props.datetime.configPanels[this.props.project.active.panel];
        const panels = panelNames.map(function (value, index) {

            var active = (_me.props.datetime.activePanel === value) ? "tab_nav_item active"
                : "tab_nav_item ";
            return (
                <li className={active} key={index}
                    name={value}
                    onClick={() => _me.props.changeConfigPanel(value)}>
                    {value}
                </li>
            );
        });
        return panels;
    }

    getActivePanel = () => {

        switch (this.props.datetime.activePanel) {

            case "Rules":
                return (
                    <Rules rules='2' />
                )

            case "Validation":
                return (
                    <Validation active={this.props.project.active.panel}
                        data={this.props.datetime.data}
                        dataChange={this.props.dataChange} />
                )

            default:
                return (
                    <General data={this.props.datetime.data}
                        dataChange={this.props.dataChange} />
                )
        }
    }

    render() {

        return (
            <section>
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
        datetime: state.DateTime,
        project: state.Project
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        dataChange: dateTimeAction.dataChange,
        changeConfigPanel: dateTimeAction.configPanelChange
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DateTime);

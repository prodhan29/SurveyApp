
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import General from '../components/common/field_general.component';
import Rules from '../components/common/rules.component';
import Validation from '../components/common/tickValidation.component';
import Treeview from '../components/groupDrop/treeview.component';
// Actions
import * as GroupDropAction from '../actions/groupDrop.action';

class GroupDropdown extends React.Component {

    getPanels = () => {

        var _me = this;
        var panelNames = this.props.groupDrop.configPanels;
        const panels = panelNames.map(function (value, index) {

            var active = (_me.props.groupDrop.activePanel === value) ? "tab_nav_item active"
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

    getValidationAns = () => {
        if (!this.props.groupDrop.data.fieldType.treatAsError
            && !this.props.groupDrop.data.fieldType.treatAsWarning) { return 3; }

        else if (this.props.groupDrop.data.fieldType.treatAsError) { return 2; }
        else { return 1; }
    }

    getActivePanel = () => {

        switch (this.props.groupDrop.activePanel) {

            case "Validation":
                return <Validation data='treatValidation'
                    ans={this.getValidationAns()}
                    onchange={this.props.dataChange} />;

            case "Rules":
                return (
                    <Rules rules='1' />
                )

            case "Values":
                return (
                    <Treeview data={this.props.groupDrop.data.nodes}
                        treeChange={this.props.treeViewChange} />
                );

            default:
                return (
                    <General data={this.props.groupDrop.data}
                        dataChange={this.props.dataChange} />
                );
        }
    }

    render() {

        return (
            <section className="builder_right field_configuration">
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
        groupDrop: state.GroupDrop,
        project: state.Project
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        treeViewChange: GroupDropAction.treeViewChange,
        dataChange: GroupDropAction.dataChange,
        changeConfigPanel: GroupDropAction.configPanelChange
    }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDropdown);

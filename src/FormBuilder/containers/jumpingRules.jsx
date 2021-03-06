
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Rules from '../components/rules/jumpRule.component';
import * as RuleAction from '../actions/rules.action';
import { fetchAndCache } from '../actions/project.action';

const NoRules = (props) => (
    <div className="rules_block">
        <div className="segment_title">Jumping Rules<span onClick={props.toggle} className="add">+ Add</span></div>
        <div className="segment_content no_content">No Rules Added yet</div>
    </div>
)

class JumpRule extends React.Component {

    constructor() {
        super();
        this.state = {
            data: {
                question: false,
                section: false,
            }
        }
    }

    dataChange = (e) => {
        console.log(e.target.name + ' ' + e.target.checked);
        this.setState({
            data: {
                [e.target.name]: e.target.checked
            }
        })

    }

    getStyle = (value) => {
        if ((this.props.data.nodes.length > 0 && value === 'remove') ||
            (this.props.data.nodes.length === 0 && value === 'add')) {
            return { display: 'block' };
        }
        else {
            return { display: 'none' };
        }
    }

    getConditions = () => {
        return this.props.data.nodes.map((value, index)=> {

            return (
                <Rules key={index}
                    operator={this.props.data.operator}
                    onOperatorClick={(e)=>this.props.onOperatorClick(index, e)}
                    data={value}
                    project={this.props.project}
                    changeData={(e) => this.props.jumpRuleDataChange(index, e)}
                    addDropdown={() => this.props.addDropdown(index)}
                    toggleQuesBank={(valueIndex) => this.props.toggleQuesBank(index, valueIndex)}
                    changeSection={(data, valueIndex) => this.props.changeSection(index, valueIndex, data)}
                    fetchAndCache={this.props.fetchAndCache}
                    saveQuestion={(valueIndex, info) => this.props.saveQuestion(index, valueIndex, info)}
                    deleteNode={(nodeType, valueIndex) => this.props.deleteNode(index, valueIndex, nodeType)}
                    deleteCondition={() => this.props.deleteCondition(index)} />
            );
        });
    }

    render() {

        return (
            <div>
                <div style={this.getStyle('add')}>
                    <NoRules toggle={()=>this.props.addCondition()} />
                </div>
                <div style={this.getStyle('remove')}>
                    <div className="rules_block">
                        <div className="segment_title">Jumping Rules<span onClick={()=>this.props.deleteAllCondition()} className="remove">Remove</span></div>
                    </div>
                    <div className="segment_content">
                        {this.getConditions()}
                    </div>
                    <div className="each_jumping_condition new_jumping_condition">
                        <a className="add_jumping_condition" onClick={this.props.addCondition}>+Add Condition</a>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        data: state.JumpRule,
        project: state.Project
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({

        fetchAndCache,
        deleteAllCondition: RuleAction.deleteAllCondition,
        deleteCondition: RuleAction.jumpRuleDeleteCondition,
        deleteNode: RuleAction.jumpRuleDeleteNode,
        saveQuestion: RuleAction.jumpRuleSaveQuestion,
        toggleQuesBank: RuleAction.jumpRuleToggleQuesBank,
        jumpRuleDataChange: RuleAction.jumpRuleDataChange,
        addDropdown: RuleAction.addDropdown,
        changeSection: RuleAction.jumpRuleChangeSection,
        addCondition: RuleAction.jumpRuleAddCondition,
        onOperatorClick: RuleAction.jumpRuleOperatorChange,

    }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(JumpRule);

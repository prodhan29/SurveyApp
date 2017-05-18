
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
            show: false,
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

    toggleRuleBox = () => {
        var _this = this;
        this.setState({
            show: !_this.state.show
        })
    }

    getStyle = (value) => {
        if ((this.state.show === true && value === 'remove') || (this.state.show === false && value === 'add')) {
            return { display: 'block' }
        }
        else {
            return { display: 'none' };
        }
    }

    getConditions = () => {

        let _this = this;
        return this.props.data.nodes.map(function (value, index) {

            return (
                <Rules key={index}
                    data={value}
                    project={_this.props.project}
                    changeData={(e) => _this.props.jumpRuleDataChange(index, e)}
                    addDropdown={() => _this.props.addDropdown(index)}
                    toggleQuesBank={(valueIndex) => _this.props.toggleQuesBank(index, valueIndex)}
                    changeSection={(data, valueIndex) => _this.props.changeSection(index, valueIndex, data)}
                    fetchAndCache={_this.props.fetchAndCache}
                    saveQuestion={(valueIndex, info) => _this.props.saveQuestion(index, valueIndex, info)}
                    deleteNode={(nodeType, valueIndex) => _this.props.deleteNode(index, valueIndex, nodeType)}
                    deleteCondition={() => _this.props.deleteCondition(index)} />
            );
        });
    }

    render() {

        return (
            <div>
                <div style={this.getStyle('add')}>
                    <NoRules toggle={this.toggleRuleBox} />
                </div>
                <div style={this.getStyle('remove')}>
                    <div className="rules_block">
                        <div className="segment_title">Jumping Rules<span onClick={this.toggleRuleBox} className="remove">Remove</span></div>
                    </div>

                    {this.getConditions()}

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
        deleteCondition: RuleAction.jumpRuleDeleteCondition,
        deleteNode: RuleAction.jumpRuleDeleteNode,
        saveQuestion: RuleAction.jumpRuleSaveQuestion,
        toggleQuesBank: RuleAction.jumpRuleToggleQuesBank,
        jumpRuleDataChange: RuleAction.jumpRuleDataChange,
        addDropdown: RuleAction.addDropdown,
        changeSection: RuleAction.jumpRuleChangeSection,
        addCondition: RuleAction.jumpRuleAddCondition,

    }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(JumpRule);

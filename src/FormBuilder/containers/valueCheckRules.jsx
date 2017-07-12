
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Component
import Operator from '../components/rules/operator.component';
import Dropdown from '../components/rules/dropdown.component';
// Actions
import { questionExist, getQuestionsBySectionId } from '../actions/common.action';
import { fetchAndCache } from '../actions/project.action';
import { dataChangeInValueCheck, saveValueCheckOp, deleteValueCheckRule } from '../actions/rules.action';

const NoRules = (props) => (
    <div className="rules_block">
        <div className="segment_title">Value Check Rules<span className="add" onClick={props.toggle}>+ Add</span></div>
        <div className="segment_content no_content">No Rules Added yet</div>
    </div>
);

class Rules extends React.Component {

    constructor() {
        super();
        this.state = {
            operators: ['==', '<', '>', '!=']
        }
    }

    getSelectedSection = (section) => {
        return (typeof section.name === 'undefined') ? 'select a sectionn' : section.name;
    }

    getSelectedQuestion = (question) => {
        console.log(question);
        return (typeof question.name === 'undefined') ? 'select a question' : question.caption;
    }

    getSectionId = (section) => {
        return (typeof section.sectionId === 'undefined') ? 0 : section.sectionId;
    }

    getQuestionList = (section) => {
        var ar = getQuestionsBySectionId(this.props.project.cacheData, section.sectionId);
        console.log(ar);
        return (typeof ar === 'undefined') ? ([]) : ar;
    }

    render() {
        return (
            <div className="rules_block">
                <div className="segment_title">Value Check Rules
                    <span className="remove" onClick={this.props.toggle}>Remove</span>
                </div>
                <div className="segment_content">
                    <div className="rules_condition">
                        <div className="rule_cell">
                            <i className="material-icons close_rule">close</i>
                            <Dropdown name='first_section'
                                items={[]}
                                onClick={this.props.getQuestions}
                                selectedData={'this Question'} />
                        </div>

                        <Operator name='operator'
                            items={this.state.operators}
                            saveOperator={this.props.saveOperator}
                            data={this.props.data.operator} />
                        <div className="rule_cell">
                            <i className="material-icons close_rule">close</i>
                            <Dropdown name='second_section'
                                items={this.props.project.cacheData}
                                onClick={this.props.getQuestions}
                                selectedData={this.getSelectedSection(this.props.data.argument.second_section)} />
                        </div>

                        <div className="rule_cell">
                            <i className="material-icons close_rule">close</i>
                            <Dropdown name='second_question'
                                items={this.getQuestionList(this.props.data.argument.second_section)}
                                onClick={this.props.saveQuestion}
                                selectedData={this.getSelectedQuestion(this.props.data.argument.second_question)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class ValueCheckRule extends React.Component {

    constructor() {
        super();
        this.state = {
            showRule: false
        }
    }

    toggleRuleBox = () => {
        var _this = this;
        this.setState({
            showRule: !_this.state.showRule
        })
    }

    getQuestions = (section, index, name) => {
        if (!questionExist(section)) {
            this.props.fetchAndCache(section, index);
        }
        this.props.dataChangeInValueCheck(section, name);
    }

    saveQuestion = (question, index, name) => {
        console.log('savaing questions ' + name)
        this.props.dataChangeInValueCheck(question, name)
    }

    saveOperator = (value) => {
        this.props.saveValueCheckOp(value);
    }

    getView = () => {

        if((typeof this.props.data.argument.second_section.name !== 'undefined') && 
            !this.state.showRule) { 
                return false;
        }
        return !this.state.showRule;
    }

    deleteValueCheckRule = () => {
        this.toggleRuleBox();
        this.props.deleteValueCheckRule();
    }
    render() {
        console.log('loading check');
        return (
            <div>
                {
                    (this.getView()) ?
                        <NoRules toggle={this.toggleRuleBox} /> :
                        <Rules toggle={this.deleteValueCheckRule}
                            data={this.props.data}
                            project={this.props.project}
                            getQuestions={this.getQuestions}
                            saveQuestion={this.saveQuestion}
                            saveOperator={this.saveOperator} />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        data: state.ValueCheck,
        project: state.Project
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        fetchAndCache,
        dataChangeInValueCheck,
        deleteValueCheckRule,
        saveValueCheckOp
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ValueCheckRule);

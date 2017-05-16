
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropdown from '../components/rules/dropdown.component';
// Actions
import { questionExist, getQuestionsBySectionId } from '../actions/common.action';
import { fetchAndCache } from '../actions/project.action';
import { dataChangeInPickRule } from '../actions/rules.action';

class PickRule extends React.Component {

    constructor() {
        super();
        this.state = {
            show: false
        }
    }

    getStyle = (value) => {
        if ((this.state.show === true && value === 'remove' )|| (this.state.show === false && value === 'add')) {
            return { display: 'block' }
        }
        else {
            return { display: 'none' };
        }
    }

    toggle = (value) => {
        let _this = this;
        this.setState({ show: !_this.state.show });
    }

    getSelectedQuestion = (question) => {
        return (typeof question.name === 'undefined') ? 'select a question' : question.name;
    }

    getSelectedSection = (section) => {
        return (typeof section.name === 'undefined') ? 'select a sectionn' : section.name;
    }

    getQuestionList = (section) => {
        var ar = getQuestionsBySectionId(this.props.project.cacheData, section.sectionId);
        return (typeof ar === 'undefined') ? ([]) : ar;
    }

    saveQuestion = (question, index, name) => {
        this.props.dataChangeInPickRule(question, name);
    }

    getQuestions = (section, index, name) => {
        if (!questionExist(section)) {
            this.props.fetchAndCache(section, index);
        }
        this.props.dataChangeInPickRule(section, name);
    }

    render() {

        return (
            <section>
                <div className="rules_block" style={this.getStyle('add')}>
                    <div className="segment_title">Value Check Rules<span className="add" onClick={this.toggle}>+ Add</span></div>
                    <div className="segment_content no_content">No Rules Added yet</div>
                </div>
                <div className="rules_block" style={this.getStyle('remove')}>
                    <div className="segment_title">Value Check Rules
                        <span className="remove" onClick={this.toggle}>Remove</span>
                    </div>
                    <div className="segment_content">
                        <div className="rules_condition">
                            <div className="rule_cell">
                                <i className="material-icons close_rule">close</i>
                                <Dropdown name='section'
                                    items={this.props.project.cacheData}
                                    onClick={this.getQuestions}
                                    selectedData={this.getSelectedSection(this.props.data.section)} />
                            </div>

                            <br />
                            <div className="rule_cell">
                                <i className="material-icons close_rule">close</i>
                                <Dropdown name='question'
                                    items={this.getQuestionList(this.props.data.section)}
                                    onClick={this.saveQuestion}
                                    selectedData={this.getSelectedQuestion(this.props.data.question)} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {

    return {
        data: state.PickRule,
        project: state.Project
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        fetchAndCache,
        dataChangeInPickRule
    }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(PickRule);

import React from 'react';
import QuestionBank from './questionBank.component';
import Operator from './operator.component';

export default class Rules extends React.Component {

    constructor() {
        super();
        this.state = {
            operators: ['==', '<', '>', '!='],
            showQuestionBank: false
        }
    }

    toggleQuesBank = () => {
        this.setState({showQuestionBank: !this.state.showQuestionBank})
    }

    getQuestion = () => {
        let data = {
            section: this.props.data.argument.section,
            question: this.props.data.argument.question,
            showQuestions: this.state.showQuestionBank,
        }
        console.log('loading question box');
        console.log(data);
        return (
            <span className="form_field rule_cell" id="questionBank">
                <i className="material-icons close_rule">close</i>
                <QuestionBank data={data}
                    saveNode={this.props.saveQuestion}
                    project={this.props.project}
                    toggleQuesBank={this.toggleQuesBank}
                    fetchAndCache={this.props.fetchAndCache}
                    />
            </span>
        )
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
                            <span className="form_row"> 
                                <input type="text" placeholder="this question" disabled/> 
                                </span>
                        </div>

                        <Operator name='operator'
                            items={this.state.operators}
                            saveOperator={this.props.saveOperator}
                            data={this.props.data.operator} />

                        {this.getQuestion()}
                        {/*<div className="rule_cell">
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
                        </div>*/}

                    </div>
                </div>
            </div>
        );
    }
}
import React from 'react';
import Operators from './operator.component';
import { getQuestionsBySectionId, questionExist } from '../../actions/common.action';
import  Accordion from './accordion.component';

export default class QuestionBox extends React.Component {

    saveInfo = (question, section) => {
        let _this = this;
        var ob = {
            question,
            section: {
                sectionId: section.sectionId,
                name: section.name,
                description: section.description,
                repetitive: section.repetitive,
            }
        }
        this.props.saveNode(ob);
        this.props.toggleQuesBank();
    }

    setSection = (section) => {

        if (!questionExist(section)) {
            this.props.fetchAndCache(section);
        }
    }

    getSections = () => {
        return (
            <Accordion sections = {this.props.project.cacheData}
                toggleQuesBank={(e)=>this.toggleQuesBank()}
                saveInfo={this.saveInfo} 
            />
        )
    }

    toggleQuesBank = (e) => {
        this.props.toggleQuesBank();
    }

    getNodeRelation = () => {
        return (this.props.data.child.length > 0) ? this.props.data.childRelation : this.props.data.relation;
    }

    render() {
        let question = this.props.data.info.question;
        let section = this.props.data.info.section;
        return (
            <div>
                <Accordion />
                <div className="rule_cell">
                    <i className="material-icons close_rule"
                        onClick={this.props.deleteNode}>close</i>
                    <div id='ques-accordion' className="dropdown" onClick={this.toggleQuesBank}>
                       
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" style={{ position: 'relative' }}>
                            <div className="rule_question">
                                <span className="s_name">{section == null ? 'section' : section.name}</span>
                                <span className="q_name">{question == null ? 'Select a question' : question.caption}</span>
                            </div>
                            <i className="fa fa-chevron-down"></i>
                        </a>
                        <div id="sectionBox" className="ques_select_accordion" onClick={(e)=>e.stopPropagation()}>
                            {this.props.data.showQuestions ? this.getSections() : null}
                        </div>
                    </div>
                </div>
                <Operators items={['+', '-', '/', 'X', '()']}
                    saveOperator={this.props.onOperatorClick}
                    data={this.getNodeRelation()} />
            </div>
        );
    }
}

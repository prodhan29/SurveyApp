// this component is for jumpRules, pickRules, ValueCheckrules

import React from 'react';
import { questionExist } from '../../actions/common.action';
import  Accordion from './accordion.component';

export default class QuestionBank extends React.Component {

    constructor() {
        super();
    }

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

    // detectOutside = (e) => {
    //     if (e.target != null && document.getElementById('questionBank').contains(e.target)) {
            
    //     } else if (e.target.id != 'questionBank') {
    //         // Clicked outside the box
            
    //         this.props.toggleQuesBank();
    //     }
    // }

    // componentDidMount() {
    //     window.addEventListener('click', this.detectOutside);
    // }

    // componentWillUnmount() {
    //     console.log('questionBox component is unmounting')
    //     window.removeEventListener('click', this.detectOutside, false);
    // }

    getSections = () => {
        return (
            <Accordion sections={this.props.project.cacheData}
                toggleQuesBank={(e) => this.toggleQuesBank()}
                saveInfo={this.saveInfo}
            />
        )
    }

    setSection = (section) => {

        if (!questionExist(section)) {
            this.props.fetchAndCache(section);
        }
    }

    toggleQuesBank = (e) => {
        this.props.toggleQuesBank();
    }

    render() {
        let question = this.props.data.question;
        let section = this.props.data.section;
        return (
            <div id="questionBank">
                <div className="rule_cell">
                    <i className="material-icons close_rule" onClick={this.props.deleteNode}>
                        close
                    </i>
                    <div className="dropdown" onClick={this.toggleQuesBank}>
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" style={{ position: 'relative' }}>
                            <div className="rule_question">
                                <span className="s_name">{section == null ? 'section' : section.name}</span>
                                <span className="q_name">{question == null ? 'Select a question' : question.caption}</span>
                            </div>
                            <i className="fa fa-chevron-down"></i>
                        </a>
                        <div className="ques_select_accordion" onClick={(e)=>e.stopPropagation()}>
                            <div id="sectionBox" >
                            {this.props.data.showQuestions ? this.getSections() : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

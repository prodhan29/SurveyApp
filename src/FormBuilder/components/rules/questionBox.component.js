import React from 'react';
import Operators from './operator.component';
import {getQuestionsBySectionId, questionExist} from '../../actions/common.action';
import {fetchAndCache} from '../../actions/project.action';

const sectionBox = {
    position: 'absolute',
    backgroundColor: '#eee',
    width: '100%',
    marginTop: '8%'
}

export default class QuestionBox extends React.Component {

    constructor() {
        super();
        this.state = {
            activeSection: '',
            setionStyle: {
                backgroundColor: '#eee'
            }
        }
    }

    componentDidMount() {
        // document.onclick = function(e){
        //     console.log(e.target.id);
        //     console.log('clicking');
        //     // document.getElementById('sectionBox')
        // }
    }

    saveInfo=(question)=>{
        let _this = this;
        var ob = {
            section: _this.state.activeSection,
            question,
        }
        this.props.saveNode(ob);
        this.props.toggleQuesBank();
    }

    getQuestions=(value)=>{
        let _this = this;
        if(value.sectionId == this.state.activeSection.sectionId){
            var questions = getQuestionsBySectionId(
                                this.props.project.cacheData, value.sectionId
                            )
            if(typeof questions == 'undefined') return null;
            return questions.map(function(value, index) {
                return(
                    <p key = {index} onClick = {()=>_this.saveInfo(value)}>
                        <a href="#">{value.caption}</a>
                    </p>
                );
            });
        }
    }

    setSection=(section)=>{

        if(!questionExist(section)){
            this.props.fetchAndCache(section);
        }

        this.setState({
            activeSection: section
        });
    }

    getSections=()=>{
        let _this = this;
        return this.props.project.cacheData.map(function(value, index) {
            return(
                <section  key = {index} onClick = {function(e){e.stopPropagation(); _this.setSection(value)}}>
                    <p style = {_this.state.sectionStyle}>
                        {index+1}. <a href="#">{value.name}</a>
                    </p>
                    {_this.getQuestions(value)}
                </section>

            );
        })
    }

    toggleQuesBank=(e)=>{
        this.props.toggleQuesBank();
    }

    getNodeRelation=()=>{
        return (this.props.data.child.length > 0) ? this.props.data.childRelation : this.props.data.relation;
    }

    render(){
        let question = this.props.data.info.question;
        return(
            <div>
                <div className="rule_cell">
                    <i className="material-icons close_rule"
                        onClick = {this.props.deleteNode}>close</i>
                    <div className="dropdown" onClick = {this.toggleQuesBank}>
                        <a href="#" className="dropdown-toggle" style = {{position: 'relative'}}>
                            {question == null ? 'Select a question' : question.caption}
                            <i className="fa fa-chevron-down"></i>
                        </a>
                        <div id="sectionBox" style = {sectionBox}>
                            { this.props.data.showQuestions? this.getSections() : null }
                        </div>
                    </div>
                </div>
                <Operators items = {['+', '-', '/', 'X', '()']}
                               saveOperator = {this.props.onOperatorClick}
                               data = {this.getNodeRelation()}/>
            </div>
        );
    }
}

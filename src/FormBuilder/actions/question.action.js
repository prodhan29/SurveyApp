import React from 'react';
import axios from 'axios';
import AppConfig from '../../application.config';
import Store from '../../store';
import {Checkbox } from 'semantic-ui-react'

export function questionLoader() {
    Store.dispatch((() => {
        return {
            type: 'START_LOADING_FOR_QUESTIONS',
        }
    })());
}

export function stopQuestionLoading() {
    Store.dispatch((() => {
        return {
            type: 'STOP_LOADING_FOR_QUESTIONS',
        }
    })());
}

export function fetchQuestions(data) {

    const url = `${AppConfig.domain}/question?sectionId=${data.sectionId}`;
    var questions = axios.get(url, AppConfig.ajaxConfig());
    return {
        type: 'FETCH_QUESTIONS_FROM_SERVER',
        payload: questions
    }
}

export function copyQues(ques) {
    let payload = axios.post(`${AppConfig.domain}/question`, precessQuesForCopy(ques), AppConfig.ajaxConfig());
    return {
        type: 'COPY_QUESTION',
        payload,
    }
}

export function fetchQuesForExport(section, exportSection) {
    const url = `${AppConfig.domain}/question?sectionId=${section.sectionId}`;
    axios.get(url, AppConfig.ajaxConfig()).then((response) => {
        exportSection(section, response.data);
    })
}

export function questionsChange(payload) {
    return {
        type: 'QUESTIONS_CHANGE',
        payload,
    }
}

export function updateQuestion(data, index) {

    axios.patch(`${AppConfig.domain}/question/${data.questionId}`, data, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'UPDATE_QUESTION',
                payload: {
                    data: response.data,
                    index,
                }
            }
        })());
    });
}

// hot reload the question list 
// to show the status of the questions properties
export function questionLiveUpdate(payload) {
    return {
        type: 'FIELD_DATA_LIVE_RELOAD',
        payload
    }
}

// this action flows to all the field reducer
// and get set to the appropriate field type
export function onQuestionClick(payload) {
    return {
        type: 'ON_QUESTION_CLICK',
        payload,
    }
}

// this action is to avoid an unwanted question in questionList 
// at the time of editing an question
export function removeExtraQues(payload, index) {
    return {
        type: 'REMOVE_EXTRA_QUES',
        payload,
        index,
    }
}

export function quesSequenceChange(sectionId, questions, oldIndex, newIndex) {
    let questionIds = getQuestionIds(questions.list, oldIndex, newIndex);
    console.log(questionIds);
    Store.dispatch((() => {
            return {
                type: 'QUES_SEQUENCE_CHANGE',
                payload: { oldIndex, newIndex }
            }
        })());
    axios.post(`${AppConfig.domain}/question/order?sectionId=${sectionId}`, questionIds, AppConfig.ajaxConfig()).then((response) => {
    });
}

export function deleteQues(data, index) {

    axios.delete(`${AppConfig.domain}/question/${data.questionId}`, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'QUESTION_DELETE',
                payload: { data, index }
            }
        })());
    });
}

export function showValidationMsg(payload) {
    return {
        type: 'SHOW_VALIDATION_MESSAGE',
        payload
    }
}

export function resetGotoBottom(){
    return {
        type: 'RESET_GO_TO_BOTTOM',
    }
}

export function goToBottom() {
    return {
        type: 'GO_TO_BOTTOM'
    }
}

// ---------- this actions are not related to server -----------------
// --------------------------------------------------------------------

function getQuestionIds(questions, oldIndex, newIndex) {

    questions = JSON.parse(JSON.stringify(questions));
    let questionIds = [];
    let ques = questions.splice(oldIndex, 1);
    questions.splice(newIndex, 0, ques[0]);

    for (let i = 0; i < questions.length; i++) {
        questionIds.push(questions[i].questionId);
    }
    return questionIds;
}

// in future multiple section can be exported
export function preprocess(data) {
    if (data.fieldType.fieldTypeName === 'GroupDrop') {
        data.groupOptionValues = [data.groupOptionValues];
    }
    return data;
}

// this method is called to copy a question
export function precessQuesForCopy(ques) {
    let newQues = JSON.parse(JSON.stringify(ques));
    newQues.questionId = undefined;
    newQues.name = `${ques.name}_${Date.now()}`;
    newQues.caption = `${ques.caption}_(copy)`;
    newQues.jumpingRuleClient = null;
    newQues.pickAndSuggestRuleClient = null;
    newQues.valueCheckRuleClient = null;
    newQues.calculationRuleClient = null;
    return newQues;
}

// this function returns element based on question types 
export function quesTypeElement(ques) {

    if (ques.fieldType.fieldTypeName.toLowerCase() == 'checkbox') {
        if (ques.optionValues.length === 0) {
            return null;
        }

        return ques.optionValues.map((item, index) => {
            return (
                <Checkbox key={index} label={`${item.name}`} disabled />
            );
        })
    }

    else if (ques.fieldType.fieldTypeName.toLowerCase() == 'dropdown') {
        return (
            <div className="dropdown">
                <a href="#" className="dropdown-toggle" >select a value<i className="fa fa-chevron-down"></i></a>
                <ul className="dropdown-menu">
                    {/*{
                        ques.optionValues.map(function (item, index) {
                            return (
                                <li key={index}>
                                    <a href="#">{item.name}</a>
                                </li>
                            );
                        })
                    }*/}
                </ul>
            </div>
        );
    }

    else if (ques.fieldType.fieldTypeName.toLowerCase() == 'date' || ques.fieldType.fieldTypeName.toLowerCase() == 'time') {
        return (<input type="text" placeholder={(ques.fieldType.fieldTypeName.toLowerCase() == 'date') ? 'mm-dd-yyy' : 'HH:MM'} disabled />);
    }
    return (<input type="text" disabled />);
}

export function hybridQues() {
    let ob = {
        questionId: 0,
        name: '',
        caption: '',
        sectionId: -1,
        allowedValues: [],
        calculationRule: '',
        calculationRuleClient: '',
        jumpingRule: '',
        jumpingRuleClient: null,
        validationRange: '0-0',
        pickAndSuggestRule: '',
        pickAndSuggestRuleClient: null,
        valueCheckRule: '',
        valueCheckRuleClient: null,
        coordinates: '',
        timeRange: '',
        dateRange: '',
        optionValues: [],
        groupOptionValues: [],
        fieldType: {
            fieldTypeName: '',
            exportValue: 1,
            indexField: 2,
            blank: true,
            readOnly: true,
            treatAsError: true,
            treatAsWarning: false
        }
    }
    return ob;
}

export function downloadSample(type){

    let downloadText = '';
    if(type === 'suggestions') {
        downloadText = 'apple\nbanana\nPineapple';
    }
    else {
        downloadText = 'apple,1\nbanana,2\nPineapple,3';
    }
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(downloadText));
    element.setAttribute('download', `${type} sample`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


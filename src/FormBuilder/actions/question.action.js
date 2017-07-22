import React from 'react';
import axios from 'axios';
import AppConfig from '../../application.config';
import Store from '../../store';


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
    newQues.name = `${ques.name}_(copy)`;
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
                <label key={index}>
                    &nbsp;
                    <input type="checkbox" />
                    {item.name} &nbsp;
                </label>
            );
        })
    }

    else if (ques.fieldType.fieldTypeName.toLowerCase() == 'dropdown') {
        return (
            <div className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">select a value<i className="fa fa-chevron-down"></i></a>
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
        return (<input type="date" disabled />);
    }
    return (<input type="text" disabled />);
}

export function hybridQues() {
    let ob = {
        questionId: 0,
        name: '',
        caption: '',
        sectionId: null,
        allowedValues: [],
        calculationRule: null,
        calculationRuleClient: null,
        jumpingRule: null,
        jumpingRuleClient: null,
        validationRange: null,
        pickAndSuggestRule: null,
        pickAndSuggestRuleClient: null,
        valueCheckRule: null,
        valueCheckRuleClient: null,
        coordinates: null,
        timeRange: null,
        dateRange: null,
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


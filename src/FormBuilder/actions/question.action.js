import axios from 'axios';
import AppConfig from '../../application.config';
import Store from '../../store';

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
        type: 'CREATE_QUESTION',
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

export function onQuestionClick(payload) {
    return {
        type: 'ON_QUESTION_CLICK',
        payload,
    }
}

export function quesSequenceChange(sectionId, questions, oldIndex, newIndex) {
    let questionIds = getQuestionIds(questions.list, oldIndex, newIndex);
    console.log(questionIds);

    axios.post(`${AppConfig.domain}/question/order?sectionId=${sectionId}`, questionIds, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'QUES_SEQUENCE_CHANGE',
                payload: { oldIndex, newIndex }
            }
        })());
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

export function preprocess(data) {
    if (data.fieldType.fieldTypeName === 'GroupDrop') {
        data.groupOptionValues = [data.groupOptionValues];
    }
    return data;
}

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


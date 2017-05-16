import axios from 'axios';

export function fetchQuestions(section) {

    const url = 'server/questions_'+section.sectionId+'.json';
    var questions =  axios.get(url);
    return {
        type: 'FETCH_QUESTIONS_FROM_SERVER',
        payload: questions
    }
}

export function questionsChange(payload) {

    return {
        type: 'QUESTIONS_CHANGE',
        payload,
    }
}

export function updateQuestion(data, index) {

    return {
        type: 'UPDATE_QUESTION',
        payload: { data, index }
    }
}

export function onQuestionClick(payload) {

    return {
        type: 'ON_QUESTION_CLICK',
        payload,
    }
}

export function quesSequenceChange(oldIndex, newIndex) {

    return {
        type: 'QUES_SEQUENCE_CHANGE',
        payload : {oldIndex, newIndex}
    }
}

export function deleteQues(data, index) {

    return {
        type: 'QUESTION_DELETE',
        payload: {data, index}
    }
}

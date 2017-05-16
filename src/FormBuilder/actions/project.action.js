import axios from 'axios';

export function selectConfigPanel(payload) {
    return {
        type: 'FIELD_CONFIG_PANEL_SELECT',
        payload
    }
}

export function createQuestion(payload) {
    return {
        type: 'CREATE_QUESTION',
        payload
    }
}

export function setActiveQuestion(question, index) {
    return {
        type: 'SET_ACTIVE_QUESTION',
        payload: {
            question, index
        }
    }
}

// to fetch questions and cache in projcet cacheDate
export function fetchAndCache(section, sectionIndex) {
    const url = '/server/questions_'+section.sectionId+'.json';
    var questions =  axios.get(url);
    return {
        type: 'QUESTION_FETCH_AND_CACHE',
        payload: questions
    }
}

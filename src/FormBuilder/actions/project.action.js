import axios from 'axios';
import AppConfig from '../../application.config';
import Store from '../../store';

export function getProjectById(projectId){
    let payload = axios.get(`${AppConfig.domain}/project/${projectId}`, AppConfig.ajaxConfig());
    return {
        type: 'SET_ACTIVE_PROJECT',
        payload
    }    
}

export function selectConfigPanel(payload) {
    return {
        type: 'FIELD_CONFIG_PANEL_SELECT',
        payload
    }
}

export function saveRule(payload) {
    return {
        type: 'SAVE_RULE',
        payload,
    }
}

export function createQuestion(data) {
    let payload = axios.post(`${AppConfig.domain}/question`, data, AppConfig.ajaxConfig());
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

    const url = `${AppConfig.domain}/question?sectionId=${section.sectionId}`;
    var questions = axios.get(url, AppConfig.ajaxConfig());
    return {
        type: 'QUESTION_FETCH_AND_CACHE',
        payload: questions
    }
}

export function resetToastrMsg() {
    return {
        type: 'RESET_TOASTR_MSG',
    }
}

export function capitalize(string) {

    if(string === 'gprs'){
        return string.toUpperCase();
    }
    else if(string === 'groupdrop'){
        return 'GroupDrop';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function cancelForm(){
    return {
        type: 'CANCEL_FORM'
    }
}

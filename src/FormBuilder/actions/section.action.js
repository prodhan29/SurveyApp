import axios from 'axios'
import AppConfig from '../../application.config';
import Store from '../../store';

export function change(data, index) {
    return {
        type: 'SECTION_CHANGE',
        payload: {
            data,
            index,
        }
    }
}


export function update(data, index) {
    
    axios.patch(`${AppConfig.domain}/section/${data.sectionId}`, data, AppConfig.ajaxConfig()).then((response)=>{
        Store.dispatch((()=>{
            return {
                type: 'UPDATE_SECTION',
                payload: response.data,
                index
            }
        })());
    });
}

export function createSection(data) {
    let payload = axios.post(`${AppConfig.domain}/section`, data, AppConfig.ajaxConfig());
    return {
        type: 'CREATE_SECTION',
        payload,
    }
}

export function deleteSection(sectionId, index) {
    axios.delete(`${AppConfig.domain}/section/${sectionId}`, AppConfig.ajaxConfig()).then((response)=>{
        Store.dispatch((()=>{
            return {
                type: 'DELETE_SECTION',
                index
            }
        })());
    });       
}

// loading initial sctions and questions
export function fetchSections(projectId) {
    let sections = axios.get(`${AppConfig.domain}/section?projectId=${projectId}`, AppConfig.ajaxConfig());
    return {
        type: 'FETCH_SECTIONS_FROM_SERVER',
        payload: sections
    }
}

export function resetToastrMsg( ) {
    return {
        type: 'RESET_SECTION_TOASTR_MSG'
    }
}
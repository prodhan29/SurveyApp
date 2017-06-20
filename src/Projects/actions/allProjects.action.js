import axios from 'axios';
import AppConfig from '../../application.config';


export function createProject(data) {

    let payload = axios.post(`${AppConfig.domain}/project`, data, AppConfig.ajaxConfig());
    return {
        type: 'CREATE_PROJECT',
        payload
    }
}

export function deleteProject(projectId, index) {
    let payload = axios.delete(`${AppConfig.domain}/project/${projectId}`, AppConfig.ajaxConfig());
    return {
        type: 'DELETE_PROJECT',
        payload,
        index
    }
}

export function fetchAllProjects() {
    let payload = axios.get(`${AppConfig.domain}/project`, AppConfig.ajaxConfig());
    return {
        type: 'FETCH_ALL_PROJECTS',
        payload
    }
}
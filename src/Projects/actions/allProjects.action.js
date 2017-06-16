import axios from 'axios';
import AppConfig from '../../application.config';

function ajaxConfig() {
    return {
        headers: {
            'Authorization': `Bearer $(${sessionStorage.getItem("auth_token")})`
        }
    }
}

export function createProject(data) {

    let payload = axios.post(`${AppConfig.domain}/project`, data, ajaxConfig());
    return {
        type: 'CREATE_PROJECT',
        payload
    }
}

export function deleteProject(projectId, index) {
    let payload = axios.delete(`${AppConfig.domain}/project/${projectId}`, ajaxConfig());
    return {
        type: 'DELETE_PROJECT',
        payload,
        index
    }
}

export function fetchAllProjects() {
    let payload = axios.get(`${AppConfig.domain}/project`, ajaxConfig());
    return {
        type: 'FETCH_ALL_PROJECTS',
        payload
    }
}
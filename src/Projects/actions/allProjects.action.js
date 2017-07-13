import axios from 'axios';
import AppConfig from '../../application.config';
import Store from '../../store';
import { push, replace } from 'react-router-redux';

export function createProject(data) {

    let payload = axios.post(`${AppConfig.domain}/project`, data, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'CREATE_PROJECT',
                payload: response
            }
        })());

        let formbuilderLink = `/form-builder/${response.data.projectId}`;
        Store.dispatch(push(formbuilderLink));  
    })
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

export function updateProject(project, index) {
    axios.patch(`${AppConfig.domain}/project/${project.projectId}`, project, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'UPDATE_PROJECT',
                payload: response.data,
                index
            }
        })());
    })
}
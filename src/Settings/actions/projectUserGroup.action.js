import axios from 'axios';
import AppConfig from '../../application.config';
import Store from '../../store';

export function fetchAllProjectUserGroup() {

    let payload = axios.get(`${AppConfig.domain}/project_account`, AppConfig.ajaxConfig());
    return {
        type: 'FETCH_ALL_PROJECT_USER_GROUP',
        payload
    }
}

export function createProjectUserGroup(data) {
    let payload = axios.post(`${AppConfig.domain}/project_account`, data, AppConfig.ajaxConfig());
    return {
        type: 'CREATE_PROJECT_USER_GROUP',
        payload
    }
}

export function readSingleUserGroup(id, setUserGroup) {
    axios.get(`${AppConfig.domain}/account_/${id}`, AppConfig.ajaxConfig()).then((response) => {
        setUserGroup(response.data);
    });
}

export function deleteGroup(project, index) {
    axios.delete(`${AppConfig.domain}/project_account/${project.projectId}`, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'DELETE_PROJECT_USER_GROUP',
                index
            }
        })());
    })
}

export function readUserGroup(id, index, setUserGroup) {
    axios.get(`${AppConfig.domain}/project_account/${id}`, AppConfig.ajaxConfig()).then((response) => {
        setUserGroup(response.data, index);
    })
}

export function updateProjectUserGroup(index, project, projectUserGroup) {
    
    axios.patch(`${AppConfig.domain}/project_account/${project.projectId}`, projectUserGroup, AppConfig.ajaxConfig()).then((response)=>{
        Store.dispatch((() => {
            return {
                type: 'UPDATE_PROJECT_USER_GROUP',
                index,
                payload: response
            }
        })());
    });
}


export function makeSendAble(selectedGroups) {
    let account_ids = [];
    for (let i = 0; i < selectedGroups.length; i++) {
        account_ids.push(selectedGroups[i].accountGroupId);
    }
    return account_ids;
}

export function projectUserMapper(data, projectUsers) {
    let selectedUsers = [];
    for (let i = 0; i < data.accountList.length; i++) {
        for (let j = 0; j < projectUsers.length; j++){
            if (data.accountList[i].accountId == projectUsers[j].accountId) {
                selectedUsers.push(projectUsers[j]);
            }
        }
    }
    return selectedUsers;
}

export function getProjectbyId(projectId, projects) {
    for(let i=0;i<projects.length;i++) {
        if(projectId === projects[i].projectId){
            return projects[i];
        }
    }
    return null;
}
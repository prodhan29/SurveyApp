import axios from 'axios';
import AppConfig from '../../application.config';
import Store from '../../store';

export function fetchAllUserGroup() {

    let payload = axios.get(`${AppConfig.domain}/account_group`, AppConfig.ajaxConfig());
    return {
        type: 'FETCH_ALL_USER_GROUP',
        payload
    }
}

export function createUserGroup(data) {
    let payload = axios.post(`${AppConfig.domain}/account_group`, data, AppConfig.ajaxConfig());
    return {
        type: 'CREATE_USER_GROUP',
        payload
    }
}

export function readSingleUserGroup(id, setUserGroup) {
    axios.get(`${AppConfig.domain}/account_group/${id}`, AppConfig.ajaxConfig()).then((response) => {
        setUserGroup(response.data);
    });
}

export function deleteUserGroup(accountGroup, index) {
    axios.delete(`${AppConfig.domain}/account_group/${accountGroup.accountGroupId}`, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'DELETE_USER_GROUP',
                index
            }
        })());
    })
}

export function readUserGroup(id, index, setUserGroup) {
    axios.get(`${AppConfig.domain}/account_group/${id}`, AppConfig.ajaxConfig()).then((response) => {
        setUserGroup(response.data, index);
    })
}

export function updateUserGroup(index, removeAccountIds, userGroup) {
    userGroup['remove_ids'] = removeAccountIds;
    axios.patch(`${AppConfig.domain}/account_group/${userGroup.userGroupId}`, userGroup, AppConfig.ajaxConfig()).then((response)=>{
        Store.dispatch((() => {
            return {
                type: 'UPDATE_USER_GROUP',
                index,
                payload: response
            }
        })());
    });
}


export function makeSendAble(selectedUsers) {
    let account_ids = [];
    for (let i = 0; i < selectedUsers.length; i++) {
        account_ids.push(selectedUsers[i].accountId);
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

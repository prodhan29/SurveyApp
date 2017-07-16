import axios from 'axios';
import AppConfig from '../../application.config';
import Store from '../../store';

export function fetchAllProjectUser() {

    let payload = axios.get(`${AppConfig.domain}/account/all`, AppConfig.ajaxConfig());
    return {
        type: 'FETCH_ALL_PROJECT_USER',
        payload
    }
}

export function createProjectUser(data) {
    
    let payload = axios.post(`${AppConfig.domain}/account`, data, AppConfig.ajaxConfig());
    return {
        type: 'CREATE_PROJECT_USER',
        payload
    }
}

export function cancelUserModal() {
    return {
        type: 'RESET_USER_MODAL',
    }
}

export function updateProjectUser(account, index) {
    account.age = parseInt(account.age);
    console.log(JSON.stringify(account));
    axios.patch(`${AppConfig.domain}/account/${account.accountId}`, account, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'UPDATE_PROJECT_USER',
                payload: response.data,
                index,
            }
        })());
    });
}

export function deleteProjectUser(account, index) {
    axios.delete(`${AppConfig.domain}/account/${account.accountId}`, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'DELETE_PROJECT_USER',
                index
            }
        })());
    })
}

export function makeEditable(data) {
    let ans = {
        accountId: data.accountId,
        firstName: data.accountInfo.firstName,
        lastName: data.accountInfo.lastName,
        email: '',
        phone: data.accountInfo.phone,
        age: data.accountInfo.age,
        permanentAddress: data.accountInfo.permanentAddress,
        presentAddress: data.accountInfo.presentAddress,
        roleId: 3,
        active: data.active
    }
    return ans;
}
import axios from 'axios';
import AppConfig from '../../application.config';
import Store from '../../store';

export function fetchAllLicense() {

    let payload = axios.get(`${AppConfig.domain}/license`, AppConfig.ajaxConfig());
    return {
        type: 'FETCH_ALL_LICENSE',
        payload
    }
}

export function submit(data) {
    let payload = axios.post(`${AppConfig.domain}/license`, data, AppConfig.ajaxConfig());
    return {
        type: 'CREATE_LICENSE',
        payload
    }
}

export function setToastrMsg(msgType, msg) {
    return {
        type: 'SET_LICENSE_TOASTR_MSG',
        msgType, msg
    }
}

export function resetToastrMsg() {
    return {
        type: 'RESET_LICENSE_TOASTR_MSG',
    }
}

export function deleteLicense(license, index) {
    axios.delete(`${AppConfig.domain}/license/${license.licenseId}`, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'DELETE_LICENSE',
                index
            }
        })());
    })
}

export function updateLicense(license, index) {
    axios.patch(`${AppConfig.domain}/license/${license.licenseId}`, license, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((()=>{
            return {
                type: 'UPDATE_LICENSE',
                payload: response.data,
                index,
            }
        })());
    });
}

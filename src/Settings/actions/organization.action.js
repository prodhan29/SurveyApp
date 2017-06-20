import axios from 'axios';
import AppConfig from '../../application.config';
import Store from '../../store';

export function fetchAllOrganization() {

    let payload = axios.get(`${AppConfig.domain}/organization`, AppConfig.ajaxConfig());
    return {
        type: 'FETCH_ALL_ORGANIZATION',
        payload
    }
}

export function createOrganization(data) {
    let payload = axios.post(`${AppConfig.domain}/organization`, data, AppConfig.ajaxConfig());
    return {
        type: 'CREATE_ORGANIZATION',
        payload
    }
}

export function updateOrganization(organization, index) {
    axios.patch(`${AppConfig.domain}/organization/${organization.orgId}`, organization, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'UPDATE_ORGANIZATION',
                payload: response.data,
                index,
            }
        })());
    });
}

export function deleteOrganization(data, index) {
    axios.delete(`${AppConfig.domain}/organization/${data.organization.organizationId}`, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'DELETE_ORGANIZATION',
                index
            }
        })());
    })
}

export function makeEditable(data) {
    console.log('organization editable ->>>' + JSON.stringify(data));
    let ans = {
        orgId: data.organization.organizationId,
        orgName: data.organization.orgName,
        licenseId: data.organization.license.licenseId,
        firstName: data.accountInfo.firstName,
        lastName: data.accountInfo.lastName,
        email: data.email,
        phone: data.accountInfo.phone,
        permanentAddress: data.accountInfo.permanentAddress,
        presentAddress: data.accountInfo.presentAddress,
        age: data.accountInfo.age,
        active: data.active,
    }
    return ans;
}
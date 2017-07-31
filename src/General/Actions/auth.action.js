import axios from 'axios'
import AppConfig from '../../application.config';

export function signinSuccess(payload) {
    return {
        type: 'SET_AUTH_TOKEN',
        payload
    }
}

export function signin(data, success){
    let payload = axios.post(`${AppConfig.domain}/login_session`,data).then((response)=>{
        success(response.data);
    })
}

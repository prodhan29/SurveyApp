import axios from 'axios'

var domain = "http://54.69.108.14:8090";

export function signinSuccess(payload) {
    return {
        type: 'SET_AUTH_TOKEN',
        payload
    }
}

export function signin(data, success){
    let payload = axios.post(`${domain}/login_session`,data).then((response)=>{
        success(response.data);
    })
}

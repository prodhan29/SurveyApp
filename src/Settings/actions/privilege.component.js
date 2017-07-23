import axios from 'axios';
import AppConfig from '../../application.config';
import Store from '../../store';

export function getUserPrivilege(setUserPrivilege) {
    let payload = axios.get(`${AppConfig.domain}/account/license`, AppConfig.ajaxConfig()).then((response)=>{
        setUserPrivilege(response.data);
    }) ;
}
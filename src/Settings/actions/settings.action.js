import axios from 'axios';
import AppConfig from '../../application.config';
import Store from '../../store';

export function setActiveTab(payload) {
    return {
        type: 'SET_ACTIVE_TAB',
        payload,
    }
}
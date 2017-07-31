
import {deepClone} from '../Actions/action';

var initialState = {
    active: 'Dashboard',
    featureAccess:{
        SuperAdmin: ['dashboard', 'setting'],
        Admin:['dashboard', 'projects', 'result', 'setting'] 
    }   
}

export default function sidebarReducer(state=initialState, action) {

    switch(action.type){

        case 'SET_SELECTED_PAGE':
            state = deepClone(initialState);
            state.active = capitalize(action.payload);
            break;
    }
    return state;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
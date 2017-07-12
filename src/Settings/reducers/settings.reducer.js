import { deepClone } from '../../GeneralActions/action';


var initialState = {
    tab: {
        active: '',
        SuperAdmin: ['License', 'Organization'],
        Admin: ['User', 'User Group','Manage Project Permissions']
    }
}

export default function settings(state = initialState, action) {

    switch (action.type) {
        case 'SET_ACTIVE_TAB':
            state = deepClone(state);
            state.tab.active = action.payload;
            break;

        case 'SET_AUTH_TOKEN':
            state = deepClone(state);
            state.tab.active = (action.payload.roleName === 'Admin') ? 'User' : 'License';
            break;

    }
    return state;
}

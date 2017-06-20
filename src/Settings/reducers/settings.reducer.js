import { deepClone } from '../../GeneralActions/action';

var initialState = {
    tab: {
        active: '',
        SuperAdmin: ['License', 'Organization'],
        Admin: ['User', 'User Group','Project User Group']
    }
}

export default function settings(state = initialState, action) {

    switch (action.type) {
        case 'SET_ACTIVE_TAB':
            state = deepClone(state);
            state.tab.active = action.payload;
            break;
    }
    return state;
}
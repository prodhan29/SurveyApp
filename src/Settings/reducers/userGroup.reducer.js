import { deepClone } from '../../GeneralActions/action';

var initialState = {
    list:[]
}

export default function userGroup(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_ALL_USER_GROUP':
            state = deepClone(state);
            if(typeof action.payload.data !== 'undefined'){
                state.list = action.payload.data;
            }
            break;

        case 'UPDATE_USER_GROUP':
            state = deepClone(state);
            state.list.splice(action.index, 1, action.payload.data);
            break;

        case 'DELETE_USER_GROUP':
            state = deepClone(state);
            state.list.splice(action.index, 1);
            break;

        case 'CREATE_USER_GROUP':
            state = deepClone(state);
            state.list.push(action.payload.data);
            break;    

    }
    return state;
}
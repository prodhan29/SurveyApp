import {deepClone} from '../../GeneralActions/action';

var initialState = {
    list:[],
    active: null,
}

export default function license(state=initialState, action ){

    switch(action.type) {
        case 'FETCH_ALL_LICENSE':
            state = deepClone(state);
            state.list = action.payload.data;
            break;

        case 'CREATE_LICENSE':
            state = deepClone(state);
            state.list.push(action.payload.data);
            break; 

        case 'DELETE_LICENSE':
            state = deepClone(state);
            state.list.splice(action.index, 1);
            break;

        case 'UPDATE_LICENSE':
            state = deepClone(state);
            state.list.splice(action.index, 1, action.payload);
            break;                 
    }
    return state;
}


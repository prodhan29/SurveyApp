import { deepClone } from '../../General/Actions/action';

var initialState = {
    list: [],
    active: null
}

export default function organization(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_ALL_ORGANIZATION':
            state = deepClone(state);
            state.list = action.payload.data;
            break;

        case 'CREATE_ORGANIZATION':
            state = deepClone(state);
            state.list.push(action.payload.data)
            break;

        case 'DELETE_ORGANIZATION':
            state = deepClone(state);
            state.list.splice(action.index, 1);
            break;

        case 'UPDATE_ORGANIZATION':
            state = deepClone(state);
            state.list.splice(action.index, 1, action.payload);
            break;       
    }

    return state;
}
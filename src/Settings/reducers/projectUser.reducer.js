import { deepClone } from '../../GeneralActions/action';

var initialState = {
    list: [],
    userTypes: [
        {
            roleId: 3,
            roleName: "Supervisor",
            active: true
        },
        {
            roleId: 4,
            roleName: "Result Viewer",
            active: true
        },
        {
            roleId: 5,
            roleName: "Form Designer",
            active: true
        },
        {
            roleId: 6,
            roleName: "Enumerator",
            active: true
        }
    ]
}

export default function projectUser(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_ALL_PROJECT_USER':
            state = deepClone(state);
            state.list = action.payload.data;
            break;

        case 'CREATE_PROJECT_USER':
            state = deepClone(state);
            state.list.push(action.payload.data)
            break;

        case 'DELETE_PROJECT_USER':
            state = deepClone(state);
            state.list.splice(action.index, 1);
            break;

        case 'UPDATE_PROJECT_USER':
            state = deepClone(state);
            state.list.splice(action.index, 1, action.payload);
            break;
    }
    return state;
}
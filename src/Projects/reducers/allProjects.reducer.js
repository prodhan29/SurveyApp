import { deepClone } from '../../GeneralActions/action';

var initialState = {
    list: [],
    newProject: {
        name: '',
        published: false,
        sectionAllowed: true,
        version: '1.00'
    },
    loader:{
        loading: false,
        paragraphs: 5,
        loadingText: 'loading projects',
    }
}


export default function allProjects(state = initialState, action) {
    switch (action.type) {
        case 'CREATE_PROJECT':
            state = deepClone(state);
            state.list.push(action.payload.data);
            break;

        case 'UPDATE_PROJECT':
            state = deepClone(state); 
            state.list.splice(action.index, 1, action.payload);
            break;

        case 'DELETE_PROJECT':
            state = deepClone(state);
            state.list.splice(action.index, 1);
            break;

        case 'FETCH_ALL_PROJECTS':
            state = deepClone(state);
            state.list = action.payload.data;
            state.loader.loading = false;            
            break;

        case 'SET_LOADER_FOR_PROJECT':
            state = deepClone(state);
            state.loader.loading = true;
            break;

        case 'COPY_PROJECT':
            state = deepClone(state);
            state.list.push(action.payload.data);
            break;        

        default:
            return state;
    }
    return state;
}
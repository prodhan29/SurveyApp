import { deepClone } from '../actions/common.action';

const sec = {

    list: [],
    toastrMsg: ''
};

export default function sections(state = sec, action) {

    switch (action.type) {

        case "FETCH_SECTIONS_FROM_SERVER":
            state = deepClone(state);
            state.list = (typeof action.payload.data === 'undefined') ? ([]) : action.payload.data;
            break;

        case 'CREATE_SECTION':
            state = deepClone(state);
            state.list.push(action.payload.data);
            state.toastrMsg = "section created successfully"
            break;

        case 'UPDATE_SECTION':
            state = deepClone(state);
            sectionUpdate(state, action.payload, action.index);
            state.toastrMsg = 'section updated successfully'
            break;

        case 'DELETE_SECTION':
            state = deepClone(state)
            state.list.splice(action.index, 1);
            break;

        case 'RESET_SECTION_TOASTR_MSG':
            state.toastrMsg = '';
            break;     
    }
    return state;
}

function sectionUpdate(state, payload, index) {
    let sec = state.list[index];
    sec.name = payload.name;
    sec.description = payload.description;
    sec.repetitive = payload.repetitive;
}

import { deepClone } from '../actions/common.action';

const sec = {

    list: [],
    toastr:{
        msg: '',
        type: '',
    },
    loader:{
        loading: false,
        paragraphs: 2,
        loadingText: 'loading sections',
    }
};

export default function sections(state = sec, action) {

    switch (action.type) {

        case 'LOADER_FOR_SECTION':
            state = deepClone(state);
            state.loader.loading = true;
            break;

        case 'FETCH_SECTIONS_FROM_SERVER':
            state = deepClone(state);
            state.list = (typeof action.payload.data === 'undefined') ? ([]) : action.payload.data;
            state.loader.loading = false;
            break;

        case 'SECTION_ORDER_CHANGE':
            state = deepClone(state);
            let sec = state.list.splice(action.oldIndex, 1);
            state.list.splice(action.newIndex, 0, sec[0]);
            state.toastr.msg = 'section ORDER CHANGED successfulyl';
            state.toastr.type = 'success';
            break;    

        case 'CREATE_SECTION':
            state = deepClone(state);
            state.list.push(action.payload.data);
            state.toastr.msg = 'section created successfully';
            state.toastr.type = 'success';
            break;

        case 'COPY_SECTION':
            state = deepClone(state);
            state.list.push(action.payload.data);
            state.toastr.msg = 'section Copied successfully';
            state.toastr.type = 'success';
            break;

        case 'IMPORT_SECTION':
            state = deepClone(state);
            Array.prototype.push.apply(state.list, action.payload.data);
            state.toastr.msg = 'sections imported successfully';
            state.toastr.type = 'success';
            break;

        case 'UPDATE_SECTION':
            state = deepClone(state);
            sectionUpdate(state, action.payload, action.index);
            state.toastr.msg = 'section UPDATED successfully';
            state.toastr.type = 'success';
            break;

        case 'DELETE_SECTION':
            state = deepClone(state)
            state.list.splice(action.index, 1);
            state.toastr.msg = 'section DELETED successfully';
            state.toastr.type = 'success';
            break;

        case 'RESET_SECTION_TOASTR_MSG':
            state.toastr.msg = '';
            state.toastr.type = '';
            break;    

         case 'SET_TOASTR_MESSAGE':
            state = deepClone(state);
            state.toastr.msg = action.msg;
            state.toastr.type = action.msgType;
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

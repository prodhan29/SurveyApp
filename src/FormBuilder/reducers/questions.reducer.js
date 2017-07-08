import { changeFieldState, deepClone } from '../actions/common.action';
import { hybridQues } from '../actions/question.action';

const question = {
    toastrMsg: '',
    pendingQues: false, // to trace if any question is in the middle of construction
    active: {
        question: {
            data: {},
            index: null
        }
    },
    list: []
};

export default function questions(state = question, action) {


    switch (action.type) {

        case 'FETCH_QUESTIONS_FROM_SERVER':
            state = deepClone(state);
            if (typeof action.payload.data === 'undefined') {
                state.list = [];
            } else {
                state.list = action.payload.data;
            }
            break;

        case 'CREATE_QUESTION':
            state = deepClone(state);
            state.pendingQues = false;
            state.list.pop();
            state.list.push(action.payload.data);
            state.toastrMsg = 'question created successfully';
            break;

        case 'UPDATE_QUESTION':
            state = deepClone(state);
            state.list[action.payload.index] = action.payload.data;
            state.toastrMsg = 'question updated successfully';
            break;

        case 'QUESTIONS_CHANGE':
            state = deepClone(state);
            state.list = action.payload;
            break;

        case 'QUES_SEQUENCE_CHANGE':
            state = deepClone(state);
            let ques = state.list.splice(action.payload.oldIndex, 1);
            state.list.splice(action.payload.newIndex, 0, ques[0]);
            break;

        case 'QUESTION_DELETE':
            state = deepClone(state);
            state.list.splice(action.payload.index, 1);
            state.toastrMsg = 'question delete successfully';
            break;

        case 'RESET_TOASTR_MSG':
            state.toastrMsg = '';
            break;

        case 'FETCH_QUESTIONS_FOR_ALL_SECTIONS_INITIALLY':
            state = setBuilderInitialState(state, action);
            break;

        case 'SET_ACTIVE_QUESTION':
            state = deepClone(state);
            state.active.question.data = action.payload.question;
            state.active.question.index = action.payload.index;
            break;

        case 'FIELD_DATA_LIVE_RELOAD':
            state = deepClone(state);
            updateRealTime(state, action);
            break;

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = deepClone(state);
            setQuesForLiveUpdate(state, action);
            break;

        case 'REMOVE_EXTRA_QUES':
            state = deepClone(state);
            refresh(state);
            break;

        case 'CANCEL_FORM':
            state = deepClone(state);
            refresh(state);
            break;
    }
    return state;
}

function setBuilderInitialState(state, action) {
    state = deepClone(state);
    if (action.index == '0') {
        state.list = action.payload.data
    }
    return state;
}

function refresh(state) {
    if (state.pendingQues) {
        state.list.pop();
        state.pendingQues = false;
    }
    state.active.question = {
        data: {},
        index: null
    }
}

function updateRealTime(state, action) {
    if (state.active.question.index !== null) {
        let fieldState = {};
        fieldState.data = state.active.question.data;
        changeFieldState(fieldState, action.payload);
        state.list[state.active.question.index] = fieldState.data;
    }
}

function setQuesForLiveUpdate(state, action) {
    let pendingQues = hybridQues();
    pendingQues.fieldType.fieldTypeName = action.payload;
    state.pendingQues = true;
    state.active.question = {
        data: pendingQues,
        index: state.list.length
    }
    state.list.push(pendingQues);
}
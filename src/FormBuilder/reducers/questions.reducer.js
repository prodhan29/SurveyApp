import { changeFieldState, deepClone } from '../actions/common.action';
import { hybridQues } from '../actions/question.action';

const question = {
    toastr:{
        msg: '',
        type: 'success',
    },  
    goToBottom: false,
    pendingQues: false, // to trace if any question is in the middle of construction
    edit: {
        isRunning: false,
        quesOldState: null,
    },
    active: {
        question: {
            data: {},
            index: null
        }
    },
    list: [],
    loader:{
        loading: false,
        paragraphs: 1,
        loadingText: 'loading questions',
    }
};

export default function questions(state = question, action) {


    switch (action.type) {

        case 'START_LOADING_FOR_QUESTIONS':
            state = deepClone(state);
            state.loader.loading =true;
            break;

        case 'STOP_LOADING_FOR_QUESTIONS':
            state = deepClone(state);
            state.loader.loading =false;
            break;

        case 'SECTION_CHANGE':
            console.log('-------------cleaned section list');
            state = deepClone(question);

            break;        

        case 'DELETE_SECTION':
            state = deepClone(state);
            state.list = [];
            break;

        case 'FETCH_ALL_PROJECTS':
            state = deepClone(state);
            state.list = [];
            break;    

        case 'FETCH_QUESTIONS_FROM_SERVER':
            state = deepClone(state);
            console.log('fetch questions from server');
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
            state.toastr.msg = 'question CREATED successfully';  
            break;

        case 'COPY_QUESTION':
            state = deepClone(state);
            state.list.push(action.payload.data);
            state.toastr.msg = 'question COPIED successfully';
            break;

        case 'UPDATE_QUESTION':
            state = deepClone(state);
            state.pendingQues = false;
            state.edit.isRunning = false;
            state.list[action.payload.index] = action.payload.data;
            refresh(state);
            state.toastr.msg = 'question UPDATED successfully';
            break;

        case 'QUESTIONS_CHANGE':
            state = deepClone(state);
            state.list = [];
            console.log(' question list changed ');
            console.log(state);
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
            state.toastr.msg = 'question delete successfully';
            break;

        case 'RESET_TOASTR_MSG':
            state = deepClone(state);
            state.toastr.msg ='';
            state.toastr.type = 'success';
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
            state = setQuesForLiveUpdate(state, action);
            break;

        case 'REMOVE_EXTRA_QUES':
            state = deepClone(state);
            removeExtraQues(state, action.payload, action.index);
            break;

        case 'SHOW_VALIDATION_MESSAGE':
            state = deepClone(state);
            state.toastr.msg = action.payload;
            state.toastr.type = 'error';
            break;

        case 'GO_TO_BOTTOM':
            state = deepClone(state);
            state.goToBottom = true;
            break;    

        case 'RESET_GO_TO_BOTTOM':
            state = deepClone(state);
            state.goToBottom = false;
            break;    

        // Reset Actions
        case 'FETCH_SECTIONS_FROM_SERVER':
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
        state.list = action.payload.data;
    }
    state.loader.loading = false;
    return state;
}

function removeExtraQues(state, payload, index) {
    state.list.pop();
    state.edit = {
        isRunning: true,
        quesOldState: payload,
        quesIndex: index,
    };
}

function refresh(state) {
    if (state.edit.isRunning) {
        state.pendingQues = false;
        state.list[state.edit.quesIndex] = state.edit.quesOldState;
        state.edit = {
            isRunning: false,
            quesOldState: null,
            quesIndex: null,
        };
    }
    if (state.pendingQues) {
        state.list.pop(); // if the question is not in edit mode it will delete the ongoing question
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
    return state;
}
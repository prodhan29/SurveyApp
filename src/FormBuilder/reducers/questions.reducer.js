import { deepClone } from '../actions/common.action';

const question = {
    toastrMsg: '',
    active: {},
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
            state.list.push(action.payload);
            state.toastrMsg = 'question created successfully';
            break;

        case 'UPDATE_QUESTION':
            state = deepClone(state);
            state.list[action.payload.index] = action.payload.data;
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
            break;
    }
    return state;
}

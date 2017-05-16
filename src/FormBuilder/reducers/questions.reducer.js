'use strict'

const question = {
    active: {},
    list: []
};

export default function questions(state = question, action) {

    state = deepClone(state);
    switch(action.type){

        case 'FETCH_QUESTIONS_FROM_SERVER':
            if (typeof action.payload.data === 'undefined'){
                state.list = [];
            } else {
                state.list = action.payload.data;
            }
            break;

        case 'CREATE_QUESTION':
            state.list.push(action.payload);
            break;

        case 'UPDATE_QUESTION':
            state.list[action.payload.index] = action.payload.data;
            break;

        case 'QUESTIONS_CHANGE':
            state.list = action.payload;
            break;

        case 'QUES_SEQUENCE_CHANGE':
            let ques = state.list.splice(action.payload.oldIndex, 1);
            state.list.splice(action.payload.newIndex, 0, ques[0]);
            break;

        case 'QUESTION_DELETE':
            state.list.splice(action.payload.index, 1);
            break;

    }
    return state;
}

function deepClone(data){
    return JSON.parse(JSON.stringify(data));
}

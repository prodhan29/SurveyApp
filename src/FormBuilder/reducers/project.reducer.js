'use strict'

import { getSectionById, deepClone, changeFieldState } from '../actions/common.action';

const formBuilder = {
    active: {
        panel: null,
        section: {
            data: {},
            index: null
        },
        question: {
            data: {},
            index: null
        }
    },
    cacheData: []
}

export default function project(state = formBuilder, action) {


    switch (action.type) {

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = deepClone(state);
            state.active.panel = action.payload;
            break;

        // Section Operations    
        case 'FETCH_SECTIONS_FROM_SERVER':
            state = deepClone(state);
            state.cacheData = action.payload.data;
            break;

        case 'CREATE_SECTION':
            state = deepClone(state);
            state.cacheData.push(action.payload.data);
            break;

        case 'COPY_SECTION':
            state = deepClone(state);
            state.cacheData.push(action.payload.data);
            break;

        case 'IMPORT_SECTION':
            state = deepClone(state);
            Array.prototype.push.apply(state.cacheData, action.payload.data)
            break;

        case 'UPDATE_SECTION':
            state = deepClone(state);
            sectionUpdate(state, action.payload, action.index);
            break;

        case 'SECTION_CHANGE':
            state = deepClone(state);
            state.active.section = action.payload;
            break;

        // Question operations
        case 'FETCH_QUESTIONS_FROM_SERVER':
            state = deepClone(state);
            let fetchedQues = (typeof action.payload.data === 'undefined') ? ([]) : action.payload.data;
            state.cacheData[state.active.section.index]['child'] = fetchedQues;
            break;

        case 'FETCH_QUESTIONS_FOR_ALL_SECTIONS_INITIALLY':
            state = setBuilderInitialState(state, action);
            break;

        case 'CREATE_QUESTION':
            state = deepClone(state);
            state.cacheData[state.active.section.index].child.push(action.payload.data);
            break;

        case 'COPY_QUESTION':
            state = deepClone(state);
            state.cacheData[state.active.section.index].child.push(action.payload.data);
            break;     

        case 'UPDATE_QUESTION':
            state = deepClone(state);
            state.cacheData[state.active.section.index].child[action.payload.index] = action.payload.data;
            break;

        case 'QUESTION_FETCH_AND_CACHE':
            state = deepClone(state);
            var section = getSectionById(state.cacheData, action.payload.data[0].sectionId)
            section['child'] = action.payload.data;
            break;

        case 'SET_ACTIVE_QUESTION':
            state = deepClone(state);
            state.active.question.data = action.payload.question;
            state.active.question.index = action.payload.index;
            break;

        case 'QUES_SEQUENCE_CHANGE':
            state = deepClone(state);
            let sections = state.cacheData[state.active.section.index].child;
            let ques = sections.splice(action.payload.oldIndex, 1);
            sections.splice(action.payload.newIndex, 0, ques[0]);
            break;

        case 'QUESTION_DELETE':
            state = deepClone(state);
            state.cacheData[state.active.section.index].child.splice(action.payload.index, 1);
            break;

        case 'CANCEL_FORM':
            state = deepClone(state);
            refresh(state);
            break;

        default:
            state;
    }
    return state;
}

function sectionUpdate(state, payload, index) {
    let sec = state.cacheData[index];
    sec.name = payload.name;
    sec.description = payload.description;
    sec.repetitive = payload.repetitive;
}

function refresh(state) {
    state.active.question = {
        data: {},
        index: null
    }
}

function setBuilderInitialState(state, action) {
    state = deepClone(state);
    let questionList = action.payload.data;
    state.cacheData[action.index]['child'] = questionList;

    // to select the first section At the formbuilder initial load
    if (action.index == '0') {
        state.active.section.data = state.cacheData[action.index];
        state.active.section.index = 0;
    }
    return state;
}
'use strict'

import { getSectionById, deepClone, changeFieldState } from '../actions/common.action';
import { hybridQues } from '../actions/question.action';

const formBuilder = {
    ob: {},
    warningModal: false,
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
    // this key will have three properties 0,1,2
    // 0 = show section_create in the middle
    // 1 = show formbuilder
    // 2 = show null (need to show null coz when it is taking too much time to load sections section_create appears in the middle) 
    showFormbuilder: 2,
    cacheData: [],
    loader: {
        
    }
}

export default function project(state = formBuilder, action) {


    switch (action.type) {

        case 'SET_ACTIVE_PROJECT':
            state = deepClone(state);
            state.ob = action.payload.data;
            if (action.payload.data.totalSection > 0) {
                state.showFormbuilder = 1;
            }
            else {
                state.showFormbuilder = 0;
            }
            break;

        case 'SHOW_WARNING_MODAL':
            state = deepClone(state);
            state.warningModal = !state.warningModal;
            break;

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = deepClone(state);
            state.active.panel = action.payload;
            state.active.question.data.questionId = 0; // 
            break;  

        // Section Operations    
        case 'FETCH_SECTIONS_FROM_SERVER':
            state = deepClone(state);
            state.cacheData = action.payload.data;
            break;

        case 'SECTION_ORDER_CHANGE':
            state = deepClone(state);
            let sec = state.cacheData.splice(action.oldIndex, 1);
            state.cacheData.splice(action.newIndex, 0, sec[0]);
            break;

        case 'CREATE_SECTION':
            state = createSection(state, action);
            break;

        case 'DELETE_SECTION':
            state = deepClone(state)
            state.cacheData.splice(action.index, 1);
            if (state.cacheData.length == 0) {
                state.showFormbuilder = 0;
            }
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
            refresh(state);
            break;

        case 'COPY_QUESTION':
            state = deepClone(state);
            state.cacheData[state.active.section.index].child.push(action.payload.data);
            break;

        case 'UPDATE_QUESTION':
            state = deepClone(state);
            state.cacheData[state.active.section.index].child[action.payload.index] = action.payload.data;
            refresh(state);
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
            state.active.panel = null;
            state.active.question = {
                data: {},
                index: null
            }
            break;

        // reset actions
        case 'CANCEL_FORM':
            state = deepClone(state);
            refresh(state);
            break;

        case 'FETCH_ALL_PROJECTS':
            state = deepClone(formBuilder);
            break;

        default:
            state;
    }
    return state;
}

function createSection(state, action) {
    state = deepClone(state);
    if(typeof action.payload.data != 'undefined'){
        state.cacheData.push(action.payload.data);
        state.cacheData[state.cacheData.length-1].child = [];
    }
    

    // this condition will work only at the beging of section creation from sectionIninitial Div 
    if(state.cacheData.length == 1) {
        state.active.section.data = state.cacheData[0];
        state.active.section.index = 0;
    }
    state.showFormbuilder = 1;
    return state;
}

function sectionUpdate(state, payload, index) {
    let sec = state.cacheData[index];
    sec.name = payload.name;
    sec.description = payload.description;
    sec.repetitive = payload.repetitive;
}

function refresh(state) {
    state.active.panel = null;
    state.warningModal = false;
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
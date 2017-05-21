'use strict'

import { getSectionById, deepClone } from '../actions/common.action';

const formBuilder = {

    initialServerCall: false,
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
            state.initialServerCall = true;
            state.cacheData = action.payload.data;
            break;

        case 'CREATE_SECTION':
            state = deepClone(state);
            let sec = action.payload;
            sec['sectionId'] = new Date();
            state.cacheData.push(sec);
            break;

       case 'SECTION_UPDATE':
            state = deepClone(state);
            sectionUpdate(state, action.payload);
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

        case 'CREATE_QUESTION':
            state = deepClone(state);
            state.cacheData[state.active.section.index].child.push(action.payload);
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
        
        default:
            state;
    }
    return state;
}

function sectionUpdate(state, payload) {
    let sec = state.cacheData[payload.index];
    sec.name = payload.data.name;
    sec.description = payload.data.description;
    sec.repetitive = payload.data.repetitive;
}

'use strict'

import {getSectionById} from '../actions/common.action';

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
    cacheData:[]
}

export default function project(state = formBuilder, action) {

    state = deepClone(state);
    switch(action.type){

        case 'FETCH_SECTIONS_FROM_SERVER':
            state.initialServerCall = true;
            state.cacheData = action.payload.data;
            break;

        case 'FETCH_QUESTIONS_FROM_SERVER':
            let fetchedQues =  (typeof action.payload.data === 'undefined') ? ([]) : action.payload.data;
            state.cacheData[state.active.section.index]['child'] = fetchedQues;
            break;

        case 'FIELD_CONFIG_PANEL_SELECT':
            state.active.panel = action.payload;
            break;

        case 'CREATE_SECTION':
            let sec = action.payload;
            sec['sectionId'] = new Date();
            state.cacheData.push(sec);
            break;

        case 'SECTION_CHANGE':
            state.active.section = action.payload;
            break;

        case 'CREATE_QUESTION':
            state.cacheData[state.active.section.index].child.push(action.payload);
            break;

        case 'UPDATE_QUESTION':
            state.cacheData[state.active.section.index].child[action.payload.index] = action.payload.data;
            break;

        case 'QUESTION_FETCH_AND_CACHE':
            var section = getSectionById(state.cacheData, action.payload.data[0].sectionId)
            section['child'] = action.payload.data;
            break;

        case 'SET_ACTIVE_QUESTION':
            state.active.question.data = action.payload.question;
            state.active.question.index = action.payload.index;
            break;

        case 'QUES_SEQUENCE_CHANGE':
            let sections = state.cacheData[state.active.section.index].child;
            let ques = sections.splice(action.payload.oldIndex, 1);
            sections.splice(action.payload.newIndex, 0, ques[0]);
            break;

        case 'QUESTION_DELETE':
            state.cacheData[state.active.section.index].child.splice(action.payload.index, 1);
            break;

        case 'SECTION_UPDATE':
            sectionUpdate(state, action.payload);
            break;

    }
    return state;
}

function sectionUpdate(state, payload) {
    let sec = state.cacheData[payload.index];
    sec.name = payload.data.name,
    sec.description = payload.data.description;
    sec.repetitive = payload.data.repetitive;
}

var deepClone = function(data){
    return JSON.parse(JSON.stringify(data));
}

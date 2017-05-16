'use strict'

const sec = {

    list: []
};

export default function sections(state = sec, action) {

    state = deepClone(state);
    switch(action.type){

        case "FETCH_SECTIONS_FROM_SERVER":
            state.list = action.payload.data;
            break;

        case 'CREATE_SECTION':
            console.log("create section"+ action.payload);
            const sec = action.payload;
            sec['sectionId'] = new Date();
            state.list.push(sec);
            break;

        case 'SECTION_UPDATE':
            sectionUpdate(state, action.payload);
            break;
    }
    return state;
}

function sectionUpdate(state, payload) {
    let sec = state.list[payload.index];
    sec.name = payload.data.name,
    sec.description = payload.data.description;
    sec.repetitive = payload.data.repetitive;
}

function deepClone(data){
    return JSON.parse(JSON.stringify(data));
}

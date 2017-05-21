import { deepClone } from '../actions/common.action';

const sec = {

    list: []
};

export default function sections(state = sec, action) {

    switch (action.type) {

        case "FETCH_SECTIONS_FROM_SERVER":
            state = deepClone(state);
            state.list = action.payload.data;
            break;

        case 'CREATE_SECTION':
            state = deepClone(state);
            console.log("create section" + action.payload);
            const sec = action.payload;
            sec['sectionId'] = new Date();
            state.list.push(sec);
            break;

        case 'SECTION_UPDATE':
            state = deepClone(state);
            sectionUpdate(state, action.payload);
            break;
    }
    return state;
}

function sectionUpdate(state, payload) {
    let sec = state.list[payload.index];
    sec.name = payload.data.name;
    sec.description = payload.data.description;
    sec.repetitive = payload.data.repetitive;
}

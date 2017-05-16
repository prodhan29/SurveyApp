import axios from 'axios'

export function change(data, index) {

    return {
        type: 'SECTION_CHANGE',
        payload:{
            data,
            index,
        }
    }
}

export function update(data, index) {
    return {
        type: 'SECTION_UPDATE',
        payload: {data, index}
    }
}

export function createSection(payload) {
    return {
        type: 'CREATE_SECTION',
        payload,
    }
}

// loading initial sctions and questions
export function fetchSections() {

    var sections =  axios.get('/server/sections.json');
    return {
        type: 'FETCH_SECTIONS_FROM_SERVER',
        payload: sections
    }
}

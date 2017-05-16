import axios from 'axios'

export function textConfigurePanelChange(payload) {

    return {
        type: 'TEXT_CONFIGURE_PANEL_CHANGE',
        payload,
    }
}

export function dataChange(payload) {

    return{
        type: 'TEXT_CHANGE',
        payload
    }
}

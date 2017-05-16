
export function configPanelChange(payload) {

    return {
        type: 'DROPCHECK_CONFIGURE_PANEL_CHANGE',
        payload,
    }
}

export function dataChange(payload) {

    return {
        type: 'DROPCHECK_DATA_CHANGE',
        payload,
    }
}

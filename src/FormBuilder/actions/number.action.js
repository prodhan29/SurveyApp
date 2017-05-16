
export function configPanelChange(payload) {

    return {
        type: 'NUMBER_CONFIGURE_PANEL_CHANGE',
        payload,
    }
}

export function dataChange(payload) {

    return {
        type: 'NUMBER_DATA_CHANGE',
        payload,
    }
}

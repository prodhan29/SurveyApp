export function configPanelChange(payload) {

    return {
        type: 'DATETIME_CONFIGURE_PANEL_CHANGE',
        payload,
    }
}

export function dataChange(payload) {
    return {
        type: 'DATE_DATA_CHANGE',
        payload,
    }
}

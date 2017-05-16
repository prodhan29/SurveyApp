
export function numberConfigPanelChange(payload) {
    return {
        type: 'OTHER_FIELD_CONFIGURE_PANEL_CHANGE',
        payload,
    }
}

export function dataChange(payload) {
    return {
        type: 'OTHER_FIELD_VALUE_CHANGE',
        payload,
    }
}

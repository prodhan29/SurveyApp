export function configPanelChange( payload ) {
    return {
        type: 'GROUP_DROP_CONFIGURE_PANEL_CHANGE',
        payload,
    }
}

export function dataChange( payload ) {
    return {
        type: 'GROUP_DROP_DATA_CHANGE',
        payload,
    }
}

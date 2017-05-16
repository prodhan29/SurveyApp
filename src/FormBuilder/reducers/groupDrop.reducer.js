import { changeFieldState, deepClone } from '../actions/common.action';

var groupDropState = {};
var initialState = {

    configPanels: ['General', 'Validation', 'Values', 'Rules'],
    activePanel: 'General',
    edit: false,
    data: {
        questionId: 0,
        name: '',
        caption: '',
        sectionId: 0,
        jumpingRule: '',
        optionValues: [],
        fieldType: {
            fieldTypeId: 0,
            fieldId: 0,
            fieldTypeName: '',
            exportValue: 0,
            indexField: false,
            blank: false,
            readOnly: false,
            treatAsError: false,
            treatAsWarning: false
        }
    }
}

export default function groupDropField(state = initialState, action) {

    state = deepClone(state);
    groupDropState = state;

    switch (action.type) {

        case 'GROUP_DROP_CONFIGURE_PANEL_CHANGE':
            state.activePanel = action.payload;
            return state;

        case 'GROUP_DROP_DATA_CHANGE':
            groupDropChange(action.payload);
            break;
    }
    return state;
}

var groupDropChange = function (e) {
    changeFieldState(groupDropState, e);
}

var setEditMode = function (data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'dropdown') {
        groupDropState.data = data;
        groupDropState.edit = true;
    }
}

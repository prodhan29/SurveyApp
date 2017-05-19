
import { changeFieldState, deepClone } from '../actions/common.action';

var dropCheckState = {};
var initialState = {

    configPanels: {
        dropdown: ['General', 'Validation', 'Values', 'Rules'],
        checkbox: ['General', 'Validation', 'Values']
    },
    activePanel: 'General',
    edit: false,
    data: {
        questionId: 0,
        name: '',
        caption: '',
        sectionId: 0,
        jumpingRule: '',
        pickAndSuggestRule: '',
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

export default function dropCheckField(state = initialState, action) {

    state = deepClone(state);
    dropCheckState = state;

    switch (action.type) {

        case 'DROPCHECK_CONFIGURE_PANEL_CHANGE':
            state.activePanel = action.payload;
            return state;

        case 'DROPCHECK_DATA_CHANGE':
            dropCheckChange(action.payload);
            break;

        case 'ON_QUESTION_CLICK':
            setEditMode(action.payload);
            break;

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = initialState;
            break;

        case 'CREATE_QUESTION':
            state = initialState;
            break;  
    }
    return state;
}

var dropCheckChange = function (e) {
    changeFieldState(dropCheckState, e);
}

var setEditMode = function (data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'dropdown' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'checkbox') {
        dropCheckState.data = data;
        dropCheckState.edit = true;
    }
}

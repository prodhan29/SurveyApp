
import { changeFieldState, deepClone } from '../actions/common.action';

var fieldState = {};
var initialState = {

    configPanels: ['General', 'Validation'],
    edit: false,
    data: {
        questionId: 0,
        name: '',
        caption: '',
        sectionId: 1,
        length: 2,
        fieldType: {
            fieldTypeId: 1,
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

export default function textField(state = initialState, action) {

    switch (action.type) {
        case 'OTHER_FIELD_VALUE_CHANGE':
            state = deepClone(state);
            fieldChange(state, action.payload);
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

var fieldChange = function (fieldState, e) {
    changeFieldState(fieldState, e);
}

var setEditMode = function (data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'gprs' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'image' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'signature') {
        fieldState.data = data;
        fieldState.edit = true;
    }
}

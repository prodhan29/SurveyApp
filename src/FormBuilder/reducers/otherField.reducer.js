
import { changeFieldState, deepClone } from '../actions/common.action';

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
            exportValue: true,
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
            state = deepClone(state);
            setEditMode(state, action.payload);
            break;

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = deepClone(initialState);
            break;

        case 'CREATE_QUESTION':
            state = deepClone(initialState);
            break;

        case 'UPDATE_QUESTION':
            state = deepClone(initialState);
            break;    

        case 'CANCEL_FORM':
            state = deepClone(state);
            state = initialState;
            break;         
    }
    return state;
}

var fieldChange = function (state, e) {
    changeFieldState(state, e);
}

var setEditMode = function (state, data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'gprs' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'image' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'signature') {
        state.data = data;
        state.edit = true;
    }
}

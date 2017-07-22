import { changeFieldState, deepClone } from '../actions/common.action';

var initialState = {

    configPanels: ['General', 'Values', 'Validation'],
    activePanel: 'General',
    edit: false,
    data: {
        questionId: 0,
        name: '',
        caption: '',
        sectionId: 0,
        allowedValues: [],
        caseNormalization: 3,
        length: 32,
        oneWord: false,
        removeAccessSpace: false,  // need to add this with api
        fieldType: {
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

        case 'TEXT_CONFIGURE_PANEL_CHANGE':
            state = deepClone(state);
            state.activePanel = action.payload;
            break;

        case 'TEXT_CHANGE':
            state = deepClone(state);
            textChange(state, action.payload);
            break;

        case 'ON_QUESTION_CLICK':
            state = deepClone(state);
            setEditMode(state, action.payload);
            break;

        // reset actions    
        case 'FIELD_CONFIG_PANEL_SELECT':
            state = JSON.parse(JSON.stringify(initialState));
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

var textChange = function (state, e) {
    changeFieldState(state, e);
}

var setEditMode = function (state, data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'text' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'suggestion' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'barcode') {
        state.data = data;
        state.edit = true;
    }
}


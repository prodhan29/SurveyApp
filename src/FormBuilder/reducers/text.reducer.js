import { setValidation, deepClone } from '../actions/common.action';

var textState = {};
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
        caseNormalization: 2,
        length: 32,
        oneWord: false,
        removeSpace: false,  // need to add this with api
        fieldType: {
            fieldId: 0,
            fieldTypeName: '',
            exportValue: false,
            indexField: false,
            blank: false,
            readOnly: false,
            treatAsError: false,
            treatAsWarning: false
        }
    }
}

export default function textField(state = initialState, action) {

    state = deepClone(state);
    textState = state;
    switch (action.type) {

        case 'TEXT_CONFIGURE_PANEL_CHANGE':
            state = deepClone(state);
            state.activePanel = action.payload;
            break;

        case 'TEXT_CHANGE':
            textChange(action.payload);
            break;

        case 'ON_QUESTION_CLICK':
            setEditMode(action.payload);
            break;

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = initialState;
            break;
    }

    return state;
}

var textChange = function (e) {

    var ob = (e.target.attributes.data.nodeValue === 'fieldType') ? textState.data.fieldType : textState.data;
    if (e.target.type === 'checkbox') {
        ob[e.target.name] = !ob[e.target.name];
    }
    else if (e.target.type === 'treatValidation') {
        setValidation(e.target.value, textState.data.fieldType);
    }
    else {
        ob[e.target.name] = e.target.value;
    }
}

var setEditMode = function (data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'text' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'suggestion' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'barcode') {
        textState.data = data;
        textState.edit = true;
    }
}


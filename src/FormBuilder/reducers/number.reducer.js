
import { setValidation, deepClone } from '../actions/common.action';

var numberState = {};
var initialState = {
    configPanels: ['General', 'Validation', 'Rules'],
    activePanel: 'General',
    edit: false,
    data: {
        questionId: 0,
        name: '',
        caption: '',
        sectionId: 1,
        allowedValues: [],
        validationRange: '0-1',
        calculationRule: '',
        jumpingRule: '',
        valueCheckRule: '',
        fieldType: {
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

export default function numberField(state = initialState, action) {

    state = deepClone(state);
    numberState = state;

    switch (action.type) {
        case 'NUMBER_CONFIGURE_PANEL_CHANGE':
            state = deepClone(state);
            state.activePanel = action.payload;
            return state;

        case 'NUMBER_DATA_CHANGE':
            numberDataChange(action.payload);
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

var numberDataChange = function (e) {

    var ob = (e.target.attributes.data.nodeValue === 'fieldType') ? numberState.data.fieldType : numberState.data;

    if (e.target.type === 'checkbox') {
        ob[e.target.name] = !ob[e.target.name];
    }
    else if (e.target.type === 'treatValidation') {
        setValidation(e.target.value, numberState.data.fieldType);
    }
    else {
        ob[e.target.name] = e.target.value;
    }
    console.log(e.target.attributes.data.nodeValue);
    console.log(e.target.value + '-- ' + e.target.name);
    console.log(JSON.stringify(numberState.data));
}

var setEditMode = function (data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'number' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'float') {
        numberState.data = data;
        numberState.edit = true;
    }
}


import { changeFieldState, deepClone } from '../actions/common.action';

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

    switch (action.type) {
        case 'NUMBER_CONFIGURE_PANEL_CHANGE':
            state = deepClone(state);
            state.activePanel = action.payload;
            return state;

        case 'NUMBER_DATA_CHANGE':
            state = deepClone(state);
            numberDataChange(state, action.payload);
            break;

        case 'ON_QUESTION_CLICK':
            state = deepClone(state);
            setEditMode(state, action.payload);
            break;

         case 'SAVE_RULE':
            state = deepClone(state);
            state.data.valueCheckRule = action.payload.valueCheck;
            state.data.jumpingRule = action.payload.jumpRule;
            state.data.calculationRule = action.payload.calcRule;
            break;    

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = JSON.parse(JSON.stringify(initialState));
            break;    

        case 'CREATE_QUESTION':
            state = JSON.parse(JSON.stringify(initialState));
            break;

        default:
            state;         
    }
    return state;
}

var numberDataChange = function (state, e) {
    changeFieldState(state, e);
}

var setEditMode = function (state, data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'number' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'float') {
        state.data = data;
        state.edit = true;
    }
}


import { changeFieldState, deepClone } from '../actions/common.action';

var state = {};
var initialState = {

    configPanels: {
        dropdown: ['General', 'Values', 'Validation', 'Rules'],
        checkbox: ['General', 'Values', 'Validation']
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
            exportValue: true,
            indexField: false,
            blank: false,
            readOnly: false,
            treatAsError: false,
            treatAsWarning: false
        }
    }
}

export default function dropCheckField(state = initialState, action) {

    switch (action.type) {

        case 'DROPCHECK_CONFIGURE_PANEL_CHANGE':
            state = deepClone(state);
            state.activePanel = action.payload;
            return state;

        case 'DROPCHECK_DATA_CHANGE':
            state = deepClone(state);
            dropCheckChange(state, action.payload);
            break;

        case 'ON_QUESTION_CLICK':
            state = deepClone(state);
            setEditMode(state, action.payload);
            break;

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = deepClone(state);
            state = initialState;
            break;

        case 'SAVE_RULE':
            state = deepClone(state);
            state.data.valueCheckRule = action.payload.valueCheck;
            state.data.jumpingRule = action.payload.jumpRule;
            break;

        // Reset Actions   
        case 'CREATE_QUESTION':
            state = deepClone(state);
            state = initialState;
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

var dropCheckChange = function (state, e) {
    changeFieldState(state, e);
}

var setEditMode = function (state, data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'dropdown' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'checkbox') {
        state.data = data;
        state.edit = true;
    }
}

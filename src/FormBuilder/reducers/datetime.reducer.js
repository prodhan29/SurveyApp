
import { changeFieldState, deepClone } from '../actions/common.action';
import moment from 'moment';

var parseDate = function (d) {
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
}

var datetimeState = {}
var initialState = {

    configPanels: {
        date: ['General', 'Validation'],
        time: ['General', 'Validation', 'Rules']
    },
    activePanel: 'General',
    edit: false,
    data: {
        questionId: 0,
        name: '',
        caption: '',
        sectionId: 1,
        valueCheckRule: '',
        timeRange: moment().fromNow() + '-' + moment().fromNow(),
        dateRange: parseDate(new Date()) + '-' + parseDate(new Date()),
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

        case 'DATETIME_CONFIGURE_PANEL_CHANGE':
            state = deepClone(state);
            state = deepClone(state);
            state.activePanel = action.payload;
            return state;

        case 'DATE_DATA_CHANGE':
            state = deepClone(state);
            datetimeChange(state, action.payload);
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

var datetimeChange = function (state, e) {
    changeFieldState(state, e);
}

var setEditMode = function (state, data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'time' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'date') {
        state.data = data;
        state.edit = true;
    }
}
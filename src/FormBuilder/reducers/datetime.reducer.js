
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
            exportValue: 0,
            indexField: 1,
            blank: true,
            readOnly: true,
            treatAsError: true,
            treatAsWarning: false
        }
    }
}

export default function textField(state = initialState, action) {

    state = deepClone(state);
    datetimeState = state;

    switch (action.type) {

        case 'DATETIME_CONFIGURE_PANEL_CHANGE':
            state = deepClone(state);
            state.activePanel = action.payload;
            return state;

        case 'DATE_DATA_CHANGE':
            datetimeChange(action.payload);
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

var datetimeChange = function (e) {
    changeFieldState(datetimeState, e);
}

var setEditMode = function (data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'time' ||
        data.fieldType.fieldTypeName.toLowerCase() === 'date') {
        datetimeState.data = data;
        datetimeState.edit = true;
    }
}
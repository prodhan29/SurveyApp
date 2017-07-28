import { changeFieldState, deepClone } from '../actions/common.action';

var initialState = {

    configPanels: ['General', 'Values', 'Validation', 'Rules'],
    activePanel: 'General',
    edit: false,
    data: {
        questionId: 0,
        name: '',
        caption: '',
        sectionId: 0,
        jumpingRule: '',
        optionValues: [],
        groupOptionValues: {},
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

export default function groupDropField(state = initialState, action) {

    switch (action.type) {

        case 'GROUP_DROP_CONFIGURE_PANEL_CHANGE':
            state = deepClone(state);
            state.activePanel = action.payload;
            return state;

        case 'ON_QUESTION_CLICK':
            state = deepClone(state);
            setEditMode(state, action.payload);
            break;

        case 'GROUP_DROP_DATA_CHANGE':
            state = deepClone(state);
            groupDropChange(state, action.payload);
            break;

        case 'TREE_VIEW_CHANGE':
            state = deepClone(state);
            state.data.groupOptionValues = action.payload;
            break;

        case 'SAVE_RULE':
            state = deepClone(state);
            state.data.jumpingRule = action.payload.jumpRule;
            break;

        // Reset Actions
        case 'CREATE_QUESTION':
            state = deepClone(initialState);
            break;

        case 'UPDATE_QUESTION':
            state = deepClone(initialState);
            break;

        case 'CANCEL_FORM':
            state = deepClone(initialState);
            break;

    }
    return state;
}

var groupDropChange = function (state, e) {
    changeFieldState(state, e);
}

var setEditMode = function (state, data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'groupdrop') {
        console.log('set edit mode');
        console.log(data);
        state.data = data;
        state.data.groupOptionValues = data.groupOptionValues[0]
        state.edit = true;
    }
}

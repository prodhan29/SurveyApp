import { changeFieldState, deepClone } from '../actions/common.action';

var initialState = {

    configPanels: ['General', 'Validation', 'Values', 'Rules'],
    activePanel: 'General',
    edit: false,
    data: {
        questionId: 0,
        name: '',
        caption: '',
        sectionId: 0,
        jumpingRule: '',
        optionValues: [],
        nodes: {},
        fieldType: {
            fieldTypeId: 0,
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

export default function groupDropField(state = initialState, action) {

    switch (action.type) {

        case 'GROUP_DROP_CONFIGURE_PANEL_CHANGE':
            state = deepClone(state);
            state.activePanel = action.payload;
            return state;

        case 'GROUP_DROP_DATA_CHANGE':
            state = deepClone(state);
            groupDropChange(state, action.payload);
            break;
                
        case 'TREE_VIEW_CHANGE':
            state = deepClone(state);
            console.log('grp dropdown -->'+ JSON.stringify(action.payload));
            state.data.nodes = action.payload;  
            break;

        case 'SAVE_RULE':
            state = deepClone(state);
            state.data.jumpingRule = action.payload.jumpRule;
            break;       

        case 'CREATE_QUESTION':
            state = deepClone(state);
            state = initialState;
            break;

    }
    return state;
}

var groupDropChange = function (state, e) {
    changeFieldState(state, e);
}

var setEditMode = function (state, data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'dropdown') {
        state.data = data;
        state.edit = true;
    }
}

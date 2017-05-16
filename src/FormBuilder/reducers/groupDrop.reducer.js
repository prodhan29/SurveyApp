'use strict'

import { setValidation } from '../actions/common.action';

var groupDropState = {};
var initialState = {

    configPanels:['General', 'Validation', 'Values', 'Rules'],
    activePanel: 'General',
    edit: false,
    data: {
      questionId: 0,
      name: '',
      caption: '',
      sectionId: 0,
      jumpingRule: '',
      optionValues: [],
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

    state = deepClone(state);
    groupDropState = state;

    switch(action.type){

        case 'GROUP_DROP_CONFIGURE_PANEL_CHANGE':
            state.activePanel = action.payload;
            return state;

        case 'GROUP_DROP_DATA_CHANGE':
            groupDropChange(action.payload);
            break;
    }
    return state;
}

var groupDropChange = function(e){

    var ob = (e.target.attributes.data.nodeValue == 'fieldType')?groupDropState.data.fieldType : groupDropState.data;
    if(e.target.type == 'checkbox'){
        ob[e.target.name] = !ob[e.target.name];
    }
    else if(e.target.type == 'treatValidation'){
        setValidation(e.target.value, groupDropState.data.fieldType);
    }
    else {
        ob[e.target.name] = e.target.value;
    }
}

var setEditMode = function( data ) {
    if( data.fieldType.fieldTypeName.toLowerCase() == 'dropdown') {
        groupDropState.data = data;
        groupDropState.edit = true;
    }
}

var deepClone = function(data){
    return JSON.parse(JSON.stringify(data));
}

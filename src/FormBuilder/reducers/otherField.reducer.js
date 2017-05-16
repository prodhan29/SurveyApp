'use strict'

import { setValidation } from '../actions/common.action';

var fieldState = {};
var initialState = {

    configPanels: ['General', 'Validation'],
    edit: false,
    data:{
      questionId: 0,
      name: '',
      caption: '',
      sectionId: 1,
      length: 2,
      fieldType: {
        fieldTypeId: 1,
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

export default function textField(state = initialState, action) {

    switch(action.type){
        case 'OTHER_FIELD_VALUE_CHANGE':
            fieldState = deepClone(state);
            state = fieldState;
            fieldChange(action.payload);
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

var fieldChange = function(e){
    var ob = (e.target.attributes.data.nodeValue == 'fieldType')?fieldState.data.fieldType : fieldState.data;
    if(e.target.type == 'checkbox'){
        ob[e.target.name] = !ob[e.target.name];
    }
    else if(e.target.type == 'treatValidation'){
        setValidation(e.target.value, fieldState.data.fieldType);
    }
    else {
        ob[e.target.name] = e.target.value;
    }
    console.log(e.target.attributes.data.nodeValue);
    console.log(e.target.value + '-- '+e.target.name);
    console.log(JSON.stringify(fieldState.data));
}

var setEditMode = function( data ) {
    if( data.fieldType.fieldTypeName.toLowerCase() == 'gprs' ||
        data.fieldType.fieldTypeName.toLowerCase() == 'image' ||
        data.fieldType.fieldTypeName.toLowerCase() == 'signature') {
            fieldState.data = data;
            fieldState.edit = true;
    }

}

var deepClone = function(data){
    return JSON.parse(JSON.stringify(data));
}

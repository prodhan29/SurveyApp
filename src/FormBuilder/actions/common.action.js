// checking if questions for a section exist in Cache. if not then questions will be
// fetched from server
export function questionExist(section) {
    var keys = Object.keys(section);
    if (keys.indexOf('child') === -1) return false;
    else return true;
}

export function getQuestionsBySectionId(sections, sectionId) {

    for (var i = 0; i < sections.length; i++) {
        if (sectionId === sections[i].sectionId) {
            return sections[i].child;
        }
    }
    return [];
}

export function getSectionById(sections, sectionId) {
    for (var i = 0; i < sections.length; i++) {
        if (sectionId === sections[i].sectionId) {
            return sections[i];
        }
    }
    return null;
}

//---------------- Action for Field Types ------------------------//
//----------------------------------------------------------------//

// here fieldsState represents all the fieldTypes, and e is the event.
// this method is invoked to change the data for all types. 

export function changeFieldState(fieldState, e) {
    
    var ob = (e.target.attributes.data.nodeValue === 'fieldType') ? fieldState.data.fieldType : fieldState.data;
    if (e.target.type === 'checkbox') {
        ob[e.target.name] = !ob[e.target.name]
    }
    else if (e.target.type === 'treatValidation') {
        setValidation(e.target.value, fieldState.data.fieldType);
    }
    else {
        ob[e.target.name] = e.target.value;
    }
}

export function saveRule(project, fieldData) {

    fieldData['calculationRule'] = JSON.stringify(project.calcRule);
    fieldData['jumpingRule'] = JSON.stringify(project.jumpRule);
    fieldData['valueCheckRule'] = JSON.stringify(project.valueCheck);
    fieldData['pickAndSuggestRule'] = JSON.stringify(project.pickRule);
    
}

// this method is invoked in all the reducers to deeply clone the object
export function deepClone(data) {
    return JSON.parse(JSON.stringify(data));
}

export function setValidation(value, ob) {
    if (value === '1') {
        ob.treatAsWarning = true;
        ob.treatAsError = false;
    }
    else if (value === '2') {
        ob.treatAsWarning = false;
        ob.treatAsError = true;
    }
    else {
        ob.treatAsWarning = false;
        ob.treatAsError = false;
    }
}
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

export function deepClone(data) {
    return JSON.parse(JSON.stringify(data));
}

// checking if questions for a section exist in Cache. if not then questions will be
// fetched from server
export function questionExist(section) {

    console.log('section --> ' + JSON.stringify(section));
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
var builder = {
    sections: [],
    questions: [],
}

export function questionValidation(type, ques, projectData) {

    builder.sections = projectData.cacheData;
    builder.questions = projectData.cacheData[projectData.active.section.index].child;

    console.log(builder.sections);
    console.log(builder.questions);
    let general = generalValidation(ques);
    return general;

    // else if (type === 'text' || type === 'suggestion' || type === 'barcode') {
    //         return verifyTextQues(ques);
    // }

    // else if (type === 'image' || type === 'signature' || type === 'gprs') {
    //     return verifyOtherType(ques);
    // }

    // else if (type === 'number' || type === 'float') {
    //     return verifyNumberType(ques);
    // }

    // else if (type === 'dropdown' || type === 'checkbox') {
    //     return verifyDropCheck(ques);
    // }

    // else if (type === 'time' || type === 'date') {
    //     return verifyDateTime(ques);
    // }
    // else if (type === 'groupdrop') {
    //     return verifyGroupDrop(ques);
    // }
}

function generalValidation(ques) {

    if (ques.name === "" || ques.caption === "") {
        return {
            status: false,
            msg: ' Question name or caption can not be empty'
        }
    }
    else {
        for (let i = 0; i < builder.questions.length; i++) {
            if ((builder.questions[i].questionId !== ques.questionId) && builder.questions[i].name === ques.name) {
                return {
                    status: false,
                    msg: 'Question name is not unique in this Section'
                }
            }
        }
        return {
            status: true,
        }
    }
}

function verifyTextQues(ques) {

}

function verifyOtherType(ques) {

}

function verifyNumberType(ques) {

}

function verifyDropCheck(ques) {

}

function verifyDateTime(ques) {

}

function verifyGroupDrop(ques) {

}
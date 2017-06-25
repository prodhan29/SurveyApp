export function dataChangeInValueCheck(data, name) {
    return {
        type: 'DATA_CHANGE_IN_VALUE_CHECK',
        payload: {
            data,
            name
        }
    }
}

export function saveValueCheckOp(payload) {
    return {
        type: 'SAVE_VALUE_CHECK_OPERATOR',
        payload
    }
}

export function deleteValueCheckRule() {
    return {
        type: 'DELETE_VALUE_CHECK_RULE'
    }
}

export function dataChangeInPickRule(value, name) {
    return {
        type: 'DATA_CHANGE_IN_PICK_RULE',
        payload: {
            value, name
        }
    }
}

export function dataChangeInCalcRule(payload) {
    return {
        type: 'CALC_RULE_NODE_CHANGE',
        payload
    }
}

export function jumpRuleDataChange(nodeIndex, data) {
    return {
        type: 'JUMP_RULE_DATA_CHANGE',
        payload: { nodeIndex, data }
    }
}

export function jumpRuleChangeSection(nodeIndex, valueIndex, data) {
    return {
        type: 'JUMP_RULE_CHANGE_SECTION',
        payload: { nodeIndex, valueIndex, data }
    }
}

export function addDropdown(nodeIndex) {
    return {
        type: 'JUMP_RULE_ADD_DROPDOWN',
        nodeIndex
    }
}

export function jumpRuleToggleQuesBank(nodeIndex, valueIndex) {
    return {
        type: 'JUMP_RULE_TOGGLE_QUES_BANK',
        payload: { nodeIndex, valueIndex }
    }
}

export function jumpRuleSaveQuestion(nodeIndex, valueIndex, data) {
    return {
        type: 'JUMP_RULE_SAVE_QUES',
        payload: { nodeIndex, valueIndex, data }
    }
}

export function jumpRuleDeleteNode(nodeIndex, valueIndex, nodeType) {
    return {
        type: 'JUMP_RULE_DELETE_NODE',
        payload: { nodeIndex, valueIndex, nodeType }
    }
}

export function jumpRuleAddCondition() {
    return {
        type: 'JUMP_RULE_ADD_CONDITION',
    }
}

export function jumpRuleDeleteCondition(nodeIndex) {
    return {
        type: 'JUMP_RULE_DELETE_CONDITION',
        nodeIndex
    }
}

export function deleteAllCondition() {
    return {
        type: 'JUMP_RULE_DELETE_ALL_CONDITION',
    }
}

export function deletePickRule() {
    return {
        type: 'DELETE_PICK_RULE',
    }
}

/////////// Rules Restructured for MOBILE /////////////////
//-------------------------------------------------------//

export function getQuestionIndexByID(questionId, questionList) {
    for (let i = 0; i < questionList.length; i++) {
        if (questionList[i].questionId == questionId)
            return i;
    }
    return -1;
}

export function getSectionIndexByID(sectionId, sectionList) {
    for (let i = 0; i < sectionList.length; i++) {
        if (sectionList[i].sectionId == sectionId)
            return i;
    }
    return -1;
}

export function createValueChecklRule(project) {
    let checkRule = project.valueCheck.argument;
    let ques = checkRule.second_question;
    let sec = checkRule.second_section;

    let secIndex = (typeof sec.sectionId === 'undefined') ? null : getSectionIndexByID(sec.sectionId, project.project.cacheData);
    let quesIndex = (typeof ques.questionId === 'undefined') ? null : getQuestionIndexByID(ques.questionId, project.project.cacheData[secIndex].child);
    
    return `this question ${project.valueCheck.operator} ${secIndex}_${quesIndex}`;
}

export function createPickAndSuggestRule(project) {
    let ques = project.pickRule.question;
    let sec = project.pickRule.section;
    let secIndex = (typeof sec.sectionId === 'undefined') ? null : getSectionIndexByID(sec.sectionId, project.project.cacheData);
    let quesIndex = (typeof ques.questionId === 'undefined') ? null : getQuestionIndexByID(ques.questionId, project.project.cacheData[secIndex].child);
    return `${secIndex}_${quesIndex}`; 
}

export function createCalculationRule() {

}

export function createJumpRule(project) {

    console.log(project);
    let jumpRule = project.jumpRule;
    let ans = [];
    for (let i = 0; i < jumpRule.nodes.length; i++) {
        let ob = {
            value: jumpRule.nodes[i].value,
            type: jumpRule.nodes[i].skip,
            condition: jumpRule.nodes[i].condition,
            skip: {
                sec: [],
                ques: [],
            }
        }
        // storing sections 
        for (let j = 0; j < jumpRule.nodes[i].sectionList.length; j++) {
            if (jumpRule.nodes[i].sectionList[j].sectionId !== 'undefined') {
                ob.skip.sec.push(getSectionIndexByID(jumpRule.nodes[i].sectionList[j].sectionId, project.project.cacheData));
            }
        }

        // storing questions
        for (let j = 0; j < jumpRule.nodes[i].questionList.length; j++) {
            if (jumpRule.nodes[i].questionList[j].question !== null) {
                let secIndex = getSectionIndexByID( jumpRule.nodes[i].questionList[j].section.sectionId, project.project.cacheData);
                let quesIndex = getQuestionIndexByID(jumpRule.nodes[i].questionList[j].question.questionId, project.project.cacheData[secIndex].child);
                ob.skip.ques.push({
                    ques:  quesIndex,
                    sec: secIndex, 
                });
            }
        }
        ans.push(ob);
    }
    return JSON.stringify(ans);
}
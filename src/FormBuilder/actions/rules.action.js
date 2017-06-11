export function dataChangeInValueCheck(data, name) {
    return {
        type: 'DATA_CHANGE_IN_VALUE_CHECK',
        payload:{
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
        payload : {
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
        payload: {nodeIndex, data}
    }
}

export function jumpRuleChangeSection(nodeIndex, valueIndex, data) {
    return {
        type: 'JUMP_RULE_CHANGE_SECTION',
        payload: {nodeIndex, valueIndex, data}
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
        payload:{ nodeIndex, valueIndex}
    }
}

export function jumpRuleSaveQuestion(nodeIndex, valueIndex, data) {
    return {
        type: 'JUMP_RULE_SAVE_QUES',
        payload:{ nodeIndex, valueIndex, data}
    }
}

export function jumpRuleDeleteNode(nodeIndex, valueIndex, nodeType) {
    return {
        type: 'JUMP_RULE_DELETE_NODE',
        payload: { nodeIndex, valueIndex, nodeType}
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
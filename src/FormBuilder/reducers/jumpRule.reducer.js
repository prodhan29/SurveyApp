import { deepClone } from '../actions/common.action';

let ruleState = {};
let initialState = {
    nodes: [
        {
            condition: '',
            skip: 'Section',
            value: '',
            sectionList: [{}],
            questionList: [{
                section: null,
                question: null,
                showQuestions: false
            }]
        }
    ]
}
export default function jumpRule(state = initialState, action) {

    state = deepClone(state);
    ruleState = state;
    switch (action.type) {

        case 'JUMP_RULE_DATA_CHANGE':
            console.log('nodeIndex --> ' + action.payload.nodeIndex);
            if (action.payload.data.target.type === 'radio') {
                state.nodes[action.payload.nodeIndex].skip = action.payload.data.target.name;
            }
            else {
                state.nodes[action.payload.nodeIndex][action.payload.data.target.name] = action.payload.data.target.value;
            }
            break;

        case 'JUMP_RULE_CHANGE_SECTION':
            nodeSectionChange(state, action.payload);
            break;

        case 'JUMP_RULE_ADD_DROPDOWN':
            addDropdown(state, action.nodeIndex);
            break;

        case 'JUMP_RULE_TOGGLE_QUES_BANK':
            toggleQuesBank(state, action.payload);
            break;

        case 'JUMP_RULE_ADD_CONDITION':
            addCondition(state);
            break;

        case 'JUMP_RULE_SAVE_QUES':
            saveQuestion(state, action.payload);
            break;

        case 'JUMP_RULE_DELETE_NODE':
            deleteNode(state, action.payload);
            break;

        case 'JUMP_RULE_DELETE_CONDITION':
            deleteCondition(state, action.nodeIndex);
            break;
    }
    return state;
}

function nodeSectionChange(state, payload) {

    console.log('jump rules' + JSON.stringify(payload));
    let node = state.nodes[payload.nodeIndex];
    if (node.skip === 'Section') {
        node.sectionList[payload.valueIndex] = payload.data;
    }
}

function addDropdown(state, nodeIndex) {

    if (state.nodes[nodeIndex].skip === 'Section') {
        state.nodes[nodeIndex].sectionList.push({});
    }
    else {
        state.nodes[nodeIndex].questionList.push({
            section: null,
            question: null,
            showQuestions: false
        });
    }
}

function addCondition(state) {
    state.nodes.push({
        condition: '',
        skip: 'Section',
        value: '',
        sectionList: [{}],
        questionList: [{
            section: null,
            question: null,
            showQuestions: false
        }]
    });
}

function saveQuestion(state, payload) {
    let quesNode = state.nodes[payload.nodeIndex].questionList[payload.valueIndex];
    quesNode.section = payload.data.section;
    quesNode.question = payload.data.question;
}

function deleteNode(state, payload) {
    state.nodes[payload.nodeIndex][payload.nodeType].splice(payload.valueIndex, 1);
}

function toggleQuesBank(state, payload) {
    let dropdown = state.nodes[payload.nodeIndex].questionList[payload.valueIndex];
    dropdown.showQuestions = !dropdown.showQuestions;
}

function deleteCondition(state, nodeIndex) {
    state.nodes.splice(nodeIndex, 1);
}

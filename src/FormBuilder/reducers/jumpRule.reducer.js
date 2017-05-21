import { deepClone } from '../actions/common.action';

let initialState = {
    nodes: []
}
export default function jumpRule(state = initialState, action) {

    
    switch (action.type) {

        case 'JUMP_RULE_DATA_CHANGE':
            state = deepClone(state);
            let node = state.nodes[action.payload.nodeIndex]
            if (action.payload.data.target.type === 'radio') {
                node.skip = (node.skip === 'Section') ? 'Question' : 'Section';
            }
            else {
                node[action.payload.data.target.name] = action.payload.data.target.value;
            }
            break;

        case 'JUMP_RULE_CHANGE_SECTION':
            state = deepClone(state);
            nodeSectionChange(state, action.payload);
            break;

        case 'JUMP_RULE_ADD_DROPDOWN':
            state = deepClone(state);
            addDropdown(state, action.nodeIndex);
            break;

        case 'JUMP_RULE_TOGGLE_QUES_BANK':
            state = deepClone(state);
            toggleQuesBank(state, action.payload);
            break;

        case 'JUMP_RULE_ADD_CONDITION':
            state = deepClone(state);
            addCondition(state);
            break;

        case 'JUMP_RULE_SAVE_QUES':
            state = deepClone(state);
            saveQuestion(state, action.payload);
            break;

        case 'JUMP_RULE_DELETE_NODE':
            state = deepClone(state);
            deleteNode(state, action.payload);
            break;

        case 'JUMP_RULE_DELETE_CONDITION':
            state = deepClone(state);
            deleteCondition(state, action.nodeIndex);
            break;

        // reset actions    
        case 'JUMP_RULE_DELETE_ALL_CONDITION':
            state = deepClone(state);
            state.nodes = [];
            break;

        case 'CREATE_QUESTION':
            state = deepClone(state);
            state = initialState;
            break;

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = deepClone(state);
            state = initialState;
            break;            
    }
    return state;
}

function nodeSectionChange(state, payload) {

    let node = state.nodes[payload.nodeIndex];
    if (node.skip === 'Section') {
        payload.data.child = [];
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

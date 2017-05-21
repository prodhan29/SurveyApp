import { deepClone } from '../actions/common.action';

let initialState = {
    result: '',
    nodes: [
        {
            info: {
                section: null,
                question: null
            },
            relation: '...',
            childRelation: '...',
            child: [],
            showQuestions: false
        }
    ]
}
export default function calcRule(state = initialState, action) {

    
    switch (action.type) {

        case 'CALC_RULE_NODE_CHANGE':
            state = deepClone(state);
            state.nodes = action.payload;
            state.result = makeExpression(state.nodes);
            break;

        case 'CREATE_QUESTION':
            state = deepClone(state);
            state = initialState;
            break;

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = deepClone(state);
            state = initialState;
            break;        

        default:
            break;
    }
    return state;
}

var makeExpression = function (nodes) {
    var ans = '';
    for (var i = 0; i < nodes.length; i++) {
        var str = '';
        var child = '';
        if (nodes[i].info.section === null || nodes[i].info.question === null) return ans;

        var sec = nodes[i].info.section.name;
        var ques = nodes[i].info.question.caption;
        var rel = (nodes[i].relation === '...') ? '' : nodes[i].relation;
        rel = (nodes[i].child.length > 0) ? '' : rel;
        str = sec + '_' + ques + ' ' + rel + ' ';

        if (nodes[i].child.length > 0) {
            var nextNodeRel = (nodes[i].relation === '...') ? '' : nodes[i].relation;
            child = nodes[i].childRelation + ' (' + makeExpression(nodes[i].child) + ') ' + nextNodeRel;
        }
        str += child;
        ans += str
    }
    return ans;
}

'use strict'

let ruleState = {};
let initialState = {
    result: '',
    nodes:[
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

    state = deepClone(state);
    ruleState = state;
    switch(action.type){

        case 'CALC_RULE_NODE_CHANGE':
            console.log('calc reducer -->'+ JSON.stringify(state.nodes));
            state.nodes = action.payload;
            state.result = makeExpression(state.nodes);
            break;
    }
    return state;
}


var makeExpression = function(nodes) {

    var ans = '';
    for( var i = 0; i < nodes.length; i++) {
        var str = '';
        var child = '';
        console.log('reducer -->'+JSON.stringify(nodes[i]));
        if(nodes[i].info.section == null || nodes[i].info.question == null) return ans;

        var sec = nodes[i].info.section.name;
        var ques = nodes[i].info.question.caption;
        var rel = (nodes[i].relation == '...')? '' : nodes[i].relation;
        rel = (nodes[i].child.length > 0) ? '' : rel;
        str = sec + '_' + ques + ' ' + rel + ' ';

        if(nodes[i].child.length > 0){
            var nextNodeRel = (nodes[i].relation == '...')? '' : nodes[i].relation;
            child = nodes[i].childRelation + ' (' + makeExpression(nodes[i].child) + ') '+ nextNodeRel;
        }
        str += child;
        ans+= str
    }
    return ans;
}

var deepClone = function(data){
    return JSON.parse(JSON.stringify(data));
}

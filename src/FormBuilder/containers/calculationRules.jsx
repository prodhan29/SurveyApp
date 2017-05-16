'user strict'

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import StartPanel from '../components/rules/startpanel.component';
import CalcRule from '../components/rules/calcRule.component';
// Actions
import {fetchAndCache} from '../actions/project.action';
import {dataChangeInCalcRule} from '../actions/rules.action';

var initialNode = {
    info: {
        section: null,
        question: null
    },
    relation: '...',
    childRelation: '...',
    child: [],
    showQuestions: false
}

class CalculationRule extends React.Component {

    constructor(props) {
        super(props);
        console.log('updated calcrule...'+JSON.stringify(this.props.data));
        let _this = this;
        this.state = {
            addRule: false,
            nodes: _this.props.data.nodes
        }
    }

    parse=(ob)=> {
        return JSON.parse(JSON.stringify(ob));
    }

    onOperatorClick=(op, parent, node)=> {
        let _this = this;

        if(op != '()') {
            node.relation = op;
            parent.push(this.parse(initialNode));
            this.setState({ nodes: _this.state.nodes });
        }
        else {
            node['child'] = [];
            node.childRelation = node.relation;
            node.relation = '...';
            node['child'].push(_this.parse(initialNode));
            this.setState({node});
        }
        this.props.dataChangeInCalcRule(this.state.nodes);
    }

    deleteNode=(parent, index)=> {
        console.log('deleting node '+ index);
        parent.splice(index, 1);
        this.setState({parent});
        this.props.dataChangeInCalcRule(this.state.nodes);
    }

    toggleRule=()=>{
        var _this = this;
        this.setState({addRule: _this.state.addRule ? false : true});
    }
    // showing section accordion for each dropdown
    toggleQuesBank=(parent, node)=>{
        node.showQuestions = !node.showQuestions;
        this.setState({node});
    }
    // info contains the selected section and question information
    saveNode=(info, node)=>{
        node.info = info;
        this.setState({node});
        this.props.dataChangeInCalcRule(this.state.nodes);
    }

    getCalcRule=()=>{
        if(!this.state.addRule){
            return(
                <StartPanel operators = {['+', '-', '/', 'X', '()']}
                            toggleRule = {this.toggleRule}/>
            );
        }
        else {
            return(
                <CalcRule data = {this.state.nodes}
                          toggleRule = {this.toggleRule}
                          onOperatorClick = {this.onOperatorClick}
                          deleteNode = {this.deleteNode}
                          project = {this.props.project}
                          fetchAndCache = {this.props.fetchAndCache}
                          toggleQuesBank = {this.toggleQuesBank}
                          saveNode = {this.saveNode}
                          result = {this.props.data.result} />
            );
        }
    }

    render() {
        return(
            <div>
                {this.getCalcRule()}
            </div>
        )
    }
}

function mapStateToProps( state ){

    return {
        data: state.CalcRule,
        project: state.Project
    };
}

function mapDispatchToProps( dispatch ) {

    return bindActionCreators( {
        fetchAndCache,
        dataChangeInCalcRule
    }, dispatch );

}

export default connect(mapStateToProps, mapDispatchToProps)(CalculationRule);

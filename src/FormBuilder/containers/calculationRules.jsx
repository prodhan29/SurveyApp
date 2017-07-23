
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import StartPanel from '../components/rules/startpanel.component';
import CalcRule from '../components/rules/calcRule.component';
// Actions
import { fetchAndCache } from '../actions/project.action';
import { dataChangeInCalcRule } from '../actions/rules.action';

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
        console.log('updated calcrule...' + JSON.stringify(this.props.data));
        let _this = this;
        this.state = {
            addRule: false,
            nodes: _this.props.data.nodes
        }
    }

    parse = (ob) => {
        return JSON.parse(JSON.stringify(ob));
    }

    dataPresent = () =>{
        return !(this.props.data.nodes[0].info.question === null);
    }

    onOperatorClick = (op, parent, node) => {
        let _this = this;

        if (op != '()') {
            node.relation = op;
            parent.push(this.parse(initialNode));
            this.setState({ nodes: _this.state.nodes });
        }
        else {
            node['child'] = [];
            node.childRelation = (node.relation === '...') ? '+' : node.relation; // if the user click directly on the '()' button;
            node.relation = '...';
            node['child'].push(_this.parse(initialNode));
            this.setState({ node });
        }
        this.props.dataChangeInCalcRule(this.state.nodes);
    }

    deleteNode = (parent, index) => {
        // if user delete the last node calculation rules get crashed
        if(this.state.nodes.length > 1) {
            parent.splice(index, 1);
            this.setState({ parent });
            this.props.dataChangeInCalcRule(this.state.nodes);
        }
        else {
            this.toggleRule('remove');
        }
    }

    toggleRule = (action) => {
        var _this = this;
        if(action === 'remove'){
            this.state.nodes = [];
            this.state.nodes.push(_this.parse(initialNode));
            this.props.dataChangeInCalcRule(this.state.nodes);
        }
        this.setState({ 
            addRule: !_this.state.addRule 
        });
    }

    // showing section accordion for each dropdown
    toggleQuesBank = (parent, node) => {
        node.showQuestions = !node.showQuestions;
        this.setState({ node });
    }

    // info contains the selected section and question information
    saveNode = (info, node) => {
        node.info = info;
        this.setState({ node });
        this.props.dataChangeInCalcRule(this.state.nodes);
    }

    getCalcRule = () => {
        if (!this.state.addRule && !this.dataPresent()) {
            return (
                <div className="rules_block pick_rule" >
                    <div className="segment_title">Pick and suggest Rule<span className="add" onClick={this.toggleRule}>+ Add</span></div>
                    <div className="segment_content no_content">No Rules Added yet</div>
                </div>
            );
        }
        else {
            return (
                <CalcRule data={this.state.nodes}
                    toggleRule={this.toggleRule}
                    onOperatorClick={this.onOperatorClick}
                    deleteNode={this.deleteNode}
                    project={this.props.project}
                    fetchAndCache={this.props.fetchAndCache}
                    toggleQuesBank={this.toggleQuesBank}
                    saveNode={this.saveNode}
                    result={this.props.data.result} />
            );
        }
    }

    render() {
        return (
            <div>
                {this.getCalcRule()}
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        data: state.CalcRule,
        project: state.Project
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        fetchAndCache,
        dataChangeInCalcRule
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CalculationRule);

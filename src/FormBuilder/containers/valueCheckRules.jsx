
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Component
import Operator from '../components/rules/operator.component';
import Rules from '../components/rules/valueCheck.component';
// Actions
import { questionExist, getQuestionsBySectionId } from '../actions/common.action';
import { fetchAndCache } from '../actions/project.action';
import { dataChangeInValueCheck, saveValueCheckOp, deleteValueCheckRule } from '../actions/rules.action';

const NoRules = (props) => (
    <div className="rules_block">
        <div className="segment_title">Value Check Rules<span className="add" onClick={props.toggle}>+ Add</span></div>
        <div className="segment_content no_content">No Rules Added yet</div>
    </div>
);

class ValueCheckRule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showRule: (this.props.data.argument.section == null)
        }
    }

    toggleRuleBox = () => {
        var _this = this;
        this.setState({
            showRule: !_this.state.showRule
        })
    }

    saveQuestion = (info) => {
        console.log('saving questions for value check =' );
        console.log(info);
        this.props.dataChangeInValueCheck(info)
    }

    saveOperator = (value) => {
        this.props.saveValueCheckOp(value);
    }


    deleteValueCheckRule = () => {
        this.toggleRuleBox();
        this.props.deleteValueCheckRule();
    }
    render() {
        return (
            <div>
                {
                    (this.state.showRule) ?
                        <NoRules toggle={this.toggleRuleBox} /> :
                        <Rules toggle={this.deleteValueCheckRule}
                            data={this.props.data}
                            project={this.props.project}
                            saveQuestion={this.saveQuestion}
                            saveOperator={this.saveOperator} />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        data: state.ValueCheck,
        project: state.Project
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        fetchAndCache,
        dataChangeInValueCheck,
        deleteValueCheckRule,
        saveValueCheckOp
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ValueCheckRule);

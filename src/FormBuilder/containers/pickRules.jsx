
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QuestionBank from '../components/rules/questionBank.component';

// Actions
import { questionExist, getQuestionsBySectionId } from '../actions/common.action';
import { fetchAndCache } from '../actions/project.action';
import { dataChangeInPickRule, deletePickRule } from '../actions/rules.action';

class PickRule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: !(this.props.data.section == null),
            showQuestionBank: false,
        }
    }

    getStyle = (value) => {
        if ((this.state.show === true && value === 'remove' )|| (this.state.show === false && value === 'add')) {
            return { display: 'block' }
        }
        else {
            return { display: 'none' };
        }
    }

    toggle = (value) => {
        let _this = this;
        this.setState({ show: !_this.state.show });
    }

    saveQuestion = (info) => {
        this.props.dataChangeInPickRule(info);
    }

    deleteRule = () => {
        this.toggle();
        this.props.deletePickRule();
    }

    toggleQuesBank = () =>{
        this.setState({showQuestionBank: !this.state.showQuestionBank});
    }

    getQuestion = () => {
        let data = {
            section: this.props.data.section,
            question: this.props.data.question,
            showQuestions: this.state.showQuestionBank,
        }
        console.log('loading question box');
        console.log(data);
        return (
            <span className="form_field rule_cell" id="questionBank">
                <i className="material-icons close_rule">close</i>
                <QuestionBank data={data}
                    saveNode={this.saveQuestion}
                    project={this.props.project}
                    toggleQuesBank={this.toggleQuesBank}
                    fetchAndCache={this.props.fetchAndCache}
                    />
            </span>
        )
    }

    render() {

        return (
            <section>
                <div className="rules_block pick_rule" style={this.getStyle('add')}>
                    <div className="segment_title">Pick and suggest Rule<span className="add" onClick={this.toggle}>+ Add</span></div>
                    <div className="segment_content no_content">No Rules Added yet</div>
                </div>
                <div className="rules_block" style={this.getStyle('remove')}>
                    <div className="segment_title">Pick and suggest Rule
                        <span className="remove" onClick={this.deleteRule}>Remove</span>
                    </div>
                    <div className="segment_content">
                        <div className="rules_condition">
                            {this.getQuestion()}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {

    return {
        data: state.PickRule,
        project: state.Project
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        fetchAndCache,
        dataChangeInPickRule,
        deletePickRule
    }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(PickRule);

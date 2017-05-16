import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SortableQuestions from '../components/questions/sortableQuestions.component';
// Actions
import {
    onQuestionClick,
    quesSequenceChange,
    deleteQues
} from '../actions/question.action';

import {selectConfigPanel, setActiveQuestion} from '../actions/project.action';

class Questions extends React.Component {

    onQuestionClick=(data, index)=> {

        this.props.selectConfigPanel(data.fieldType.fieldTypeName.toLowerCase());
        this.props.onQuestionClick(data);
        this.props.setActiveQuestion(data, index);
    }

    render() {
        return(
            <SortableQuestions question = {this.props.question}
                               onClick = {this.onQuestionClick}
                               project = {this.props.project}
                               sequenceChange = {this.props.quesSequenceChange}
                               deleteQues = {this.props.deleteQues}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        project: state.Project,
        question: state.Question
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        onQuestionClick,
        selectConfigPanel,
        setActiveQuestion,
        quesSequenceChange,
        deleteQues
    }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(Questions);

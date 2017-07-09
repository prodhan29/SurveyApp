import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SortableQuestions from '../components/questions/sortableQuestions.component';
import { toastr } from 'react-redux-toastr';
// Actions
import {
    onQuestionClick,
    quesSequenceChange,
    deleteQues,
    copyQues,
    removeExtraQues
} from '../actions/question.action';

import { selectConfigPanel, setActiveQuestion, resetToastrMsg } from '../actions/project.action';

class Questions extends React.Component {

    onQuestionClick = (data, index) => {
        if(!this.props.question.pendingQues) {
            this.props.selectConfigPanel(data.fieldType.fieldTypeName.toLowerCase());
            this.props.setActiveQuestion(data, index);
            this.props.onQuestionClick(data);
            this.props.removeExtraQues(data, index);
        } else {
            alert('save or cancel the existing question');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let _this = this;
        if(this.props.question.toastrMsg!= ''){
            toastr.success('boo',this.props.question.toastrMsg,{
                onHideComplete: _this.props.resetToastrMsg
            });
        }
    }

    render() {
        return (
            <SortableQuestions question={this.props.question}
                onClick={this.onQuestionClick}
                project={this.props.project}
                sequenceChange={(oldIndex, newIndex)=>quesSequenceChange(this.props.project.active.section.data.sectionId, this.props.question, oldIndex, newIndex)}
                deleteQues={deleteQues}
                copyQues={this.props.copyQues} />
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
        resetToastrMsg,
        copyQues,
        removeExtraQues,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

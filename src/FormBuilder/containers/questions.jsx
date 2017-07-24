import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import SortableQuestions from '../components/questions/sortableQuestions.component';
import { toastr } from 'react-redux-toastr';
import AddFieldPanel from '../components/common/add_field.component';

// Actions
import {getSelectedFieldReducer } from '../actions/common.action';
import {
    onQuestionClick,
    quesSequenceChange,
    deleteQues,
    copyQues,
    removeExtraQues,
    resetGotoBottom,
} from '../actions/question.action';

import { selectConfigPanel, setActiveQuestion, resetToastrMsg, showWarningModal } from '../actions/project.action';

class Questions extends React.Component {

    onQuestionClick = (data, index) => {
        if(data.questionId == this.props.question.active.question.data.questionId){
            return;
        }

        if (!this.props.question.pendingQues || (this.props.question.edit.isRunning &&
            (JSON.stringify(this.props.question.edit.quesOldState) === JSON.stringify(getSelectedFieldReducer(this.props).data)))) {
            this.props.selectConfigPanel(data.fieldType.fieldTypeName.toLowerCase());
            this.props.setActiveQuestion(data, index);
            this.props.onQuestionClick(data);
            this.props.removeExtraQues(data, index);
        } else {
            this.props.showWarningModal();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let _this = this;
        if (this.props.question.toastr.msg != '') {
            toastr[this.props.question.toastr.type]( this.props.question.toastr.msg, '', {
                onHideComplete: _this.props.resetToastrMsg
            });
        }
    }

    render() {
        return (
            <div>
                {/*<div style={this.props.question.list.length === 0 ? { display: 'block' } : { display: 'none' }}>
                    <AddFieldPanel onClick={()=>{}}
                        selectConfigPanel={this.props.selectConfigPanel}
                    />
                </div>*/}
                <div >
                    <SortableQuestions question={this.props.question}
                        onClick={this.onQuestionClick}
                        project={this.props.project}
                        sequenceChange={(oldIndex, newIndex) => quesSequenceChange(this.props.project.active.section.data.sectionId, this.props.question, oldIndex, newIndex)}
                        deleteQues={deleteQues}
                        copyQues={this.props.copyQues}
                        showWarningModal={this.props.showWarningModal}
                        loader={this.props.question.loader}
                        goToBottom={this.props.question.goToBottom}
                        resetGotoBottom={this.props.resetGotoBottom}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        project: state.Project,
        question: state.Question,
        text: state.Text,
        number: state.Number,
        dateTime: state.DateTime,
        dropCheck: state.DropCheck,
        otherField: state.OtherField,
        groupDrop: state.GroupDrop,
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
        showWarningModal,
        resetGotoBottom
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

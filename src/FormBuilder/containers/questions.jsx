import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import SortableQuestions from '../components/questions/sortableQuestions.component';
import { toastr } from 'react-redux-toastr';
import AddFieldPanel from '../components/common/add_field.component';

// Actions
import { showWarningModal } from '../actions/project.action';
import {
    onQuestionClick,
    quesSequenceChange,
    deleteQues,
    copyQues,
    removeExtraQues
} from '../actions/question.action';

import { selectConfigPanel, setActiveQuestion, resetToastrMsg } from '../actions/project.action';

class Questions extends React.Component {

    fieldConfigPanel = () => {
        var panel = this.props.project.active.panel;

        if (panel === 'text' || panel === 'suggestion' || panel === 'barcode') {
            return this.props.text;
        }

        else if (panel === 'image' || panel === 'signature' || panel === 'gprs') {
            return this.props.otherField;
        }

        else if (panel === 'number' || panel === 'float') {
            return this.props.number;
        }

        else if (panel === 'dropdown' || panel === 'checkbox') {
            return this.props.dropCheck;
        }

        else if (panel === 'time' || panel === 'date') {
            return this.props.dateTime;
        }
        else if (panel === 'groupdrop') {
            return this.props.groupDrop;
        }
        return null;
    }

    onQuestionClick = (data, index) => {
        if (!this.props.question.pendingQues || (this.props.question.edit.isRunning &&
            (JSON.stringify(this.props.question.edit.quesOldState) === JSON.stringify(this.fieldConfigPanel().data)))) {
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
        if (this.props.question.toastrMsg != '') {
            toastr.success('boo', this.props.question.toastrMsg, {
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
                        msg={this.props.question.toastrMsg}
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
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

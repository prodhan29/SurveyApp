import React from 'react';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import { quesTypeElement } from '../../actions/question.action';
import Loader from '../../../General/Component/loader.container';



const DragHandle = SortableHandle(() => <span> <i className="fa fa-arrows" aria-hidden="true"></i></span>);

const SortableItem = SortableElement((props) =>
    <div className={`${props.clsName} question-row`}
        onClick={(e) => { props.onClick(props.value) }}>
        <div className={`field_type text ${props.value.fieldType.fieldTypeName.toLowerCase()}`}>
            <span className="field_type_icon"></span>
        </div>
        <div className="form_row_actions">
            <DragHandle />
            <span className="fa fa-files-o" onClick={(e) => { e.stopPropagation(); props.copyQues(props.value) }}></span>
            <span className="fa fa-trash" onClick={(e) => { e.stopPropagation(); props.deleteQues(props.value) }}></span>
        </div>
        <span className="form_label">
             
            {`${props.indexNumber + 1}) ${props.value.caption}`}
            <span className="ques-name" style={{color:'#90A4AE'}}> <i> ({props.value.name})</i></span>

            </span>
        <span className="form_field">
            {quesTypeElement(props.value)}
        </span>
    </div>
);


const SortableList = SortableContainer((props) => {
    return (
        <div id="questions" className="builder_form_wrapper question-container">
            {props.items.map((value, index) => (
                <SortableItem key={`item-${index}`}
                    indexNumber={index}
                    index={index}
                    value={value}
                    onClick={(data) => props.onClick(data, index)}
                    clsName={(value.questionId === props.active) ? "form_row active" : "form_row"}
                    deleteQues={(data) => props.deleteQues(data, index)}
                    copyQues={(data) => props.copyQues(data, index)}
                />
            ))}
        </div>
    );
});

export default class SortableQuestions extends React.Component {

    onSortEnd = ({ oldIndex, newIndex }) => {
        if (!this.props.question.pendingQues) {
            this.props.sequenceChange(oldIndex, newIndex);
        }
        else {
            this.props.showWarningModal();
        }
    };

    handleChange = (question, index) => {
        this.props.onClick(question, index);
    }

    componentDidUpdate(prevProps, prevState) {
        // drag the question list to the bottom to see newly created question;

;        if (this.props.goToBottom) { 
            let elem = document.getElementById('questions');
            elem.scrollTop = elem.scrollHeight;
            this.props.resetGotoBottom();
        }
    }

    render() {
        return (
            <section >
                <Loader loader={this.props.loader} />
                <SortableList items={this.props.question.list}
                    onClick={this.handleChange}
                    onSortEnd={this.onSortEnd}
                    useDragHandle={true}
                    active={this.props.project.active.question.data.questionId}
                    deleteQues={this.props.deleteQues}
                    copyQues={this.props.copyQues}
                />
            </section>
        );
    }
}

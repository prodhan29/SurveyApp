import React from 'react';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

var getActiveclassName = function (id, activeId) {

    return (id === activeId) ? "form_row active" : "form_row";
}

const DragHandle = SortableHandle(() => <span><bold>::::::</bold></span>);

const SortableItem = SortableElement((props) =>

    <div className={props.clsName}
        onClick={() => props.onClick(props.value)}
        style={{
            position: 'relative',
            width: '100%',
            display: 'block',
            padding: 20,
            backgroundColor: '#FFF',
            boxSizing: 'border-box',
            WebkitUserSelect: 'none',
            height: 110
        }}>

        <div className="form_row_actions">
            <DragHandle />
            <span className="fa fa-files-o"></span>
            <span className="fa fa-trash" onClick={() => props.deleteQues(props.value)}></span>
        </div>
        <span className="form_label">{props.value.caption}</span>
        <span className="form_field">
            <input type="text" />
        </span>
    </div>
);


const SortableList = SortableContainer((props) => {
    return (
        <div className="builder_form_wrapper" id = 'questions' style={{
            width: '80%',
            height: '80vh',
            maxWidth: '500px',
            margin: '0 auto',
            overflow: 'auto',
            backgroundColor: '#f3f3f3',
            border: '1px solid #EFEFEF',
            borderRadius: 3
        }}>
            {props.items.map((value, index) => (
                <SortableItem key={`item-${index}`}
                    index={index}
                    value={value}
                    onClick={(data) => props.onClick(data, index)}
                    clsName={getActiveclassName(value.questionId, props.active)}
                    deleteQues={(data) => props.deleteQues(data, index)} />
            ))}
        </div>
    );
});

export default class SortableQuestions extends React.Component {

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.props.sequenceChange(oldIndex, newIndex);
    };

    handleChange = (question, index) => {
        console.log(index + ' clicked on question ' + JSON.stringify(question));
        this.props.onClick(question, index);
    }

    componentDidUpdate() {
        let elem = document.getElementById('questions');
        console.log(document.getElementById('questions').scrollHeight);
        elem.scrollTop = elem.scrollHeight
    }

    render() {

        console.log('active question index -- > ' + this.props.project.active.question.index);
        return (
            <SortableList items={this.props.question.list}
                onClick={this.handleChange}
                onSortEnd={this.onSortEnd}
                useDragHandle={true}
                active={this.props.project.active.question.data.questionId}
                deleteQues={this.props.deleteQues} />
        );
    }
}

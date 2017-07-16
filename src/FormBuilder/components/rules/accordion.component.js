import _ from 'lodash';
import React from 'react';
import { Accordion } from 'semantic-ui-react';
import { getQuestionsBySectionId, questionExist } from '../../actions/common.action';

// const panels = _.times(3, () => ({))

export default class AccordionStyled extends React.Component {

    getQuestions = (value) => {
        let _this = this;
        console.log()
        var questions = getQuestionsBySectionId(
            this.props.sections, value.sectionId
        )
        if (typeof questions === 'undefined') return null;
        return questions.map(function (ques, index) {
            return (
                <p id="ques-accordion" key={index} onClick={() => _this.props.saveInfo(ques, value)}>
                    <a href="#">{ques.caption}</a>
                </p>
            );
        });
    }

    getPanels = () => {
        console.log(this.props);
        let _this = this;
        return this.props.sections.map((item, index) => {
            return ({
                title: item.name,
                content: _this.getQuestions(item),
            });
        })
    }

    render() {
        if (typeof this.props.sections == 'undefined') {
            return null;
        }

        return (
            <Accordion panels={this.getPanels()} styled />
        )
    }
}


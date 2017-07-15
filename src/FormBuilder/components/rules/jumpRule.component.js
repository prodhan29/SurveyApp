import React from 'react';
import Dropdown from './dropdown.component';
import QuestionBank from './questionBank.component';
import Operators from './operator.component';

export default class JumpRule extends React.Component {

    getButtonName = () => {
        return this.props.data.skip;
    }

    getChecked = (value) => {

        return (value === this.props.data.skip.split(' ')[0]);
    }

    getSections = () => {
        let _this = this;
        return this.props.data.sectionList.map((value, index) => {
            return (
                <span className="form_field rule_cell" key={index}>
                    <i className="material-icons close_rule"
                        onClick={() => _this.props.deleteNode('sectionList', index)}>close</i>

                    <Dropdown items={_this.props.project.cacheData}
                        name='section'
                        onClick={(data) => _this.props.changeSection(data, index)}
                        selectedData={typeof value.name === 'undefined' ? 'select a section' : value.name} />
                </span>
            )
        });
    }

    getQuestions = () => {
        let _this = this;
        return this.props.data.questionList.map(function (value, index) {
            return (
                <span className="form_field rule_cell" key={index}>
                    <i className="material-icons close_rule">close</i>
                    <QuestionBank data={value}
                        saveNode={(info) => _this.props.saveQuestion(index, info)}
                        project={_this.props.project}
                        deleteNode={() => _this.props.deleteNode('questionList', index)}
                        toggleQuesBank={(e) => _this.props.toggleQuesBank(index)}
                        fetchAndCache={_this.props.fetchAndCache} />
                </span>
            )
        });
    }

    getSectionsOrQues = () => {
        return (this.props.data.skip === 'Question') ? this.getQuestions() : this.getSections();
    }

    render() {
        return (
            <div className="each_jumping_condition">
                <div className="form_row">
                    <i className="material-icons pull-right"
                        onClick={this.props.deleteCondition}>close</i>

                    <span className="form_label"><span className="condition_flag">IF</span> value </span>
                    <span className="form_field form_field_with_info">
                        <span className="info_tag"> 
                            <Operators items={['+', '-', '/', 'X', '()']}
                saveOperator={this.props.onOperatorClick}
                data={'='} />
                        </span>
                        <input className="info_field"
                            type="text"
                            name="value"
                            value={this.props.data.value}
                            onChange={this.props.changeData} />
                    </span>
                </div>
                <div className="form_row">
                    <span className="form_label">
                        <span className="condition_flag skip">Skip</span>
                        <span className="">
                            <label>
                                <input type="radio"
                                    checked={this.getChecked('Question')}
                                    onChange={this.props.changeData} /> &nbsp; Question &nbsp;
                            </label>
                        </span>
                        <span className="">
                            <label>
                                <input type="radio"
                                    checked={this.getChecked('Section')}
                                    onChange={this.props.changeData} />&nbsp; Section
                            </label>
                        </span>
                    </span>

                    {this.getSectionsOrQues()}
                    <a className="add_jumping_option" onClick={this.props.addDropdown}>+Add {this.getButtonName()}</a>
                </div>
            </div>
        );
    }
}

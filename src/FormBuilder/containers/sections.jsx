import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SectionEditView from '../components/section/sectionEdit.component';
// Actions
import * as SectionAction from '../actions/section.action';
import { fetchQuestions, questionsChange } from '../actions/question.action';
import { questionExist, getQuestionsBySectionId } from '../actions/common.action';

class Sections extends React.Component {

    constructor() {
        super();
        this.state = {
            editSection: {}
        }
    }

    // checking if the section has questions in cacheData if not then fetch from server`
    fetchQuestions = (section, index) => {

        // prevent section change when child event is clicked on;
        if (section.sectionId === this.state.editSection.sectionId) return;

        this.props.sectionChange(section, index);
        var cachedSection = this.props.project.cacheData[index];
        if (!questionExist(cachedSection)) {
            this.props.fetchQuestions(section);
        }
        else {
            var questions = getQuestionsBySectionId(this.props.project.cacheData, section.sectionId);
            this.props.questionsChange(questions);
        }
    }

    editSection = (section) => {
        this.setState({ editSection: section });
    }

    getclassName = (secId1, secId2) => {
        let clsNameprimary = (secId1 === secId2) ? 'section_nav_item active' : 'section_nav_item';
        if (this.state.editSection === null) return clsNameprimary;
        else {
            return (secId2 === this.state.editSection.sectionId) ? "section_nav_item edit_section_nav" : clsNameprimary;
        }
    }

    getEditView = (data, index) => {
        return (
            <SectionEditView data={data}
                cancelEdit={() => this.state.editSection = {}}
                updateData={(data) => this.props.sectionUpdate(data, index)} />
        );
    }

    render() {
        var _this = this;
        const sectionList = this.props.section.list.map(function (val, index) {

            var clsName = _this.getclassName(_this.props.project.active.section.data.sectionId, val.sectionId);

            return (
                <li className={clsName} key={index}
                    onClick={() => _this.fetchQuestions(val, index)}>
                    <span> {val.name}</span>
                    <i className="fa fa-repeat"></i>
                    {clsName === "section_nav_item edit_section_nav" ? _this.getEditView(val, index) : null}
                    <span className="dropdown pull-right" >
                        <i className="fa fa-ellipsis-v " style={{ fontSize: '15px' }} data-toggle="dropdown" onClick={(e) => e.stopPropagation()}></i>

                        <div className="dropdown_panel action_dropdown dropdown-menu">
                            <ul>
                                <li onClick={function (e) { e.stopPropagation(); _this.editSection(val) }}>Edit</li>
                                <li>Delete</li>
                                <li>Export</li>
                            </ul>
                        </div>
                    </span>
                </li>
            );
        });

        return (
            <section className="builder_left">
                <h3>Sections</h3>
                <ul className="section_nav">
                    {sectionList}
                </ul>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        section: state.Section,
        project: state.Project
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({

        fetchQuestions,
        questionsChange,
        sectionUpdate: SectionAction.update,
        sectionChange: SectionAction.change,

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sections);

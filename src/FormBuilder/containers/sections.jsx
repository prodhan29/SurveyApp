import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Component
import SectionEditView from '../components/section/sectionEdit.component';
import { toastr } from 'react-redux-toastr';
import Loader from '../../GeneralComponent/loader.container';
// Actions
import { showWarningModal } from '../actions/project.action';
import * as SectionAction from '../actions/section.action';
import { fetchQuestions, questionsChange, fetchQuesForExport } from '../actions/question.action';
import { questionExist, getQuestionsBySectionId, getSelectedFieldReducer } from '../actions/common.action';

class Sections extends React.Component {

    constructor() {
        super();
        this.state = {
            editSection: {},
            editForCopy: false,
        }
    }
    componentDidUpdate() {
        let _this = this;
        if (this.props.section.toastr.msg != '') {
            toastr[this.props.section.toastr.type](this.props.section.toastr.msg,'', {
                onHideComplete: _this.props.resetToastrMsg
            });
        }
    }

    // checking if the section has questions in cacheData if not then fetch from server`
    fetchQuestions = (section, index) => {

        // if any question is in edit mode and modified or question is in creation process app will avoid other operations. 
        if (!this.props.question.pendingQues || (this.props.question.edit.isRunning &&
            (JSON.stringify(this.props.question.edit.quesOldState) === JSON.stringify(getSelectedFieldReducer(this.props).data)))) {

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
        else {
            this.props.showWarningModal();
        }
    }

    editSection = (section) => {
        this.setState({ editSection: section });
    }

    copySection = (section) => {
        this.setState({
            editSection: section,
            editForCopy: true
        })
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
                cancelEdit={() => this.setState({ editSection: {}, editForCopy: false })}
                updateData={(data) => SectionAction.update(data, index)}
                copyData={(data) => SectionAction.copySection(data)}
                editForCopy={this.state.editForCopy} />
        );
    }

    exportSection = (e, section) => {
        e.stopPropagation();
        fetchQuesForExport(section, SectionAction.exportSection);
    }
    sectionSequenceChange = (index, upDown) => {
        if(parseInt(index + upDown) < 0) {
            this.props.setToastrMsg('warning', 'not valid move');
            return;
        }

        this.props.sectionSequenceChange(this.props.project.ob.projectId, this.props.section.list, index, (index + upDown))
    }

    render() {
        var _this = this;
        const sectionList = this.props.section.list.map(function (val, index) {

            var clsName = _this.getclassName(_this.props.project.active.section.data.sectionId, val.sectionId);

            return (
                <li className={clsName} key={index}
                    onClick={() => _this.fetchQuestions(val, index)}>
                    <span> {val.name}</span>
                    {val.repetitive ? <i className="fa fa-repeat"></i> : null}
                    {clsName === "section_nav_item edit_section_nav" ? _this.getEditView(val, index) : null}
                    <span className="dropdown pull-right" >
                        <i className="fa fa-ellipsis-v " style={{ fontSize: '15px' }} data-toggle="dropdown" onClick={(e) => e.stopPropagation()}></i>

                        <div className="dropdown_panel action_dropdown dropdown-menu">
                            <ul>
                                <li onClick={(e) => { e.stopPropagation(); _this.editSection(val) }}>Edit</li>
                                <li onClick={(e) => { e.stopPropagation(); _this.copySection(val) }}>Copy</li>
                                <li onClick={(e) => { e.stopPropagation(); SectionAction.deleteSection(val.sectionId, index) }}>Delete</li>
                                <li onClick={(e) => { e.stopPropagation(); _this.exportSection(e, val) }} >Export</li>
                                <li onClick={(e)=>{e.stopPropagation(); _this.sectionSequenceChange(index, -1)}}> Move Up </li>
                                <li onClick={(e)=>{e.stopPropagation(); _this.sectionSequenceChange(index, 1)}}> Move Down </li>
                            </ul>
                        </div>
                    </span>
                </li>
            );
        });
        console.log(this.props.section.loader);
        return (
            <section className="builder_left">
                <h3>Sections</h3>
                <ul className="section_nav">
                    <Loader loader={this.props.section.loader}/>
                    {this.props.section.loader.loading}
                    <section style={this.props.section.loader.loading ? {display: 'none'} : {display: 'block'}}>
                        {sectionList}
                    </section>
                </ul>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        section: state.Section,
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

        fetchQuestions,
        questionsChange,
        resetToastrMsg: SectionAction.resetToastrMsg,
        sectionChange: SectionAction.change,
        sectionSequenceChange: SectionAction.sectionSequenceChange,
        showWarningModal,
        setToastrMsg : SectionAction.setToastrMsg,

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sections);

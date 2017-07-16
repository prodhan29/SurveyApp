import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { fetchSections } from '../actions/section.action';
import { createSection, importSection } from '../actions/section.action';
import * as ProjectAction from '../actions/project.action';
import { updateQuestion, preprocess } from '../actions/question.action';
import { saveRule } from '../actions/common.action';
// Containers
import Sections from './sections';
import Questions from './questions';
import Text from './text';
import DateTime from './dateTime';
import Number from './number';
import DropCheck from './dropCheck';
import OtherField from './otherField';
import GroupDrop from './groupDropdown';
// components
import AddFieldPanel from '../components/common/add_field.component';
import Sidebar from '../../GeneralComponent/sidebar.component';
import Header from '../../GeneralComponent/header.component';
import SectionAdd from '../components/section/sectionAdd.component';
import SectionImport from '../components/section/sectionImport.component';
import SectionInitial from '../components/section/sectionInitial.component';
import { toastr } from 'react-redux-toastr';
import ModalBasic from '../components/common/warningModal.component';

const AddFieldRow = (props) => (
    <div className="add_field_row">
        <button id="field-type" onClick={props.onClick} >Add Field</button>
    </div>
);

const SectionAddButton = (props) => (
    <div id="add_2nd_button" className="action_item" onClick={props.toggle}>
        Add Section
    </div>
)

const SectionImportButton = (props) => (
    <div id="import_2nd_button" className="action_item" onClick={props.toggle}>
        Import Section
    </div>
)

class FormBuilderApp extends React.Component {

    constructor() {
        super();
        this.state = {
            showWarningModal: false,
            showAddFieldPanel: false,
            showAddSection: false,
            showImportSection: false,
        }
    }

    componentDidMount() {
        console.log(" url params -- > " + JSON.stringify(this.props.projectId));
        this.props.getProjectById(this.props.projectId);
        fetchSections(this.props.projectId);
        window.onerror = function (msg) {
            toastr.error('Error: ' + msg);
        };
    }

    quesSavingAction = () => {
        return (this.props.project.active.panel === null) ? { display: 'none' } : { display: 'block' };
    }

    isFormbuilderVisible = (state) => {
        if (this.props.project.showFormbuilder === 1 && state === 'builder') {
            return { display: 'block' }
        }
        else if (this.props.project.showFormbuilder === 0 && state === 'sectionInitial') {
            return { display: 'block' }
        }
        else {
            return { display: 'none' }
        }
    }

    toggleAddFieldButton = (event) => {
        let _this = this;
        this.setState({
            showAddFieldPanel: !_this.state.showAddFieldPanel
        });
    }

    toggleSectionAdd = (event) => {
        let _this = this;
        this.setState({
            showAddSection: !_this.state.showAddSection
        })
    }

    toggleSectionImport = (event) => {
        let _this = this;
        this.setState({
            showImportSection: !_this.state.showImportSection
        })
    }

    sectionSubmit = (data) => {
        data.projectId = this.props.projectId;
        this.props.createSection(data);
        this.toggleSectionAdd();
    }

    firstSectionSubmit = (data) => {
        data.projectId = this.props.projectId;
        this.props.createSection(data);
    }

    getSectionAddElement = (event) => {
        return (
            this.state.showAddSection ?
                <SectionAdd close={this.toggleSectionAdd}
                    submit={this.sectionSubmit} />
                : <SectionAddButton toggle={this.toggleSectionAdd} />
        )
    }

    getSectionImportElement = (event) => {
        return (
            this.state.showImportSection ?
                <SectionImport close={this.toggleSectionImport}
                    submit={(e) => { importSection(e, this.props.projectId) }} />
                : <SectionImportButton toggle={this.toggleSectionImport} />
        )
    }

    selectConfigPanel = (e) => {
        if (!this.props.question.pendingQues || (this.props.question.edit.isRunning &&
            (JSON.stringify(this.props.question.edit.quesOldState) === JSON.stringify(this.fieldConfigPanel().data)))) {

            this.props.cancelForm();
            this.props.selectConfigPanel(e);
        }
        else {
            this.props.showWarningModal();
        }
    }

    getAddFieldElement = () => {
        return this.state.showAddFieldPanel ? <AddFieldPanel onClick={this.toggleAddFieldButton}
            selectConfigPanel={this.selectConfigPanel} />
            : <AddFieldRow onClick={this.toggleAddFieldButton} />;
    }

    fieldConfigPanel = (ans) => {
        var panel = this.props.project.active.panel;
        if (panel === 'text' || panel === 'suggestion' || panel === 'barcode') {
            return (ans === 'element') ? <Text /> : this.props.text;
        }

        else if (panel === 'image' || panel === 'signature' || panel === 'gprs') {
            return (ans === 'element') ? <OtherField /> : this.props.otherField;
        }

        else if (panel === 'number' || panel === 'float') {
            return (ans === 'element') ? <Number /> : this.props.number;
        }

        else if (panel === 'dropdown' || panel === 'checkbox') {
            return (ans === 'element') ? <DropCheck /> : this.props.dropCheck;
        }

        else if (panel === 'time' || panel === 'date') {
            return (ans === 'element') ? <DateTime /> : this.props.dateTime;
        }
        else if (panel === 'groupdrop') {
            return (ans === 'element') ? <GroupDrop /> : this.props.groupDrop;
        }
        return null;
    }

    saveQuestion = () => {
        // if no Field type is active no need to save the question
        if (this.props.project.active.panel !== '') {

            let field = this.fieldConfigPanel('object');

            field.data.sectionId = this.props.project.active.section.data.sectionId;
            field.data.fieldType.fieldTypeName = ProjectAction.capitalize(this.props.project.active.panel);
            saveRule(this.props, preprocess(field.data));

            if (field.edit) {
                updateQuestion(field.data, this.props.project.active.question.index);
            }
            else {
                console.log(JSON.stringify(field.data));
                this.props.createQuestion(field.data);
            }
        }
    }

    render() {

        return (
            <div className="main_container">
                <ModalBasic
                    modalOpen={this.props.project.warningModal}
                    cancel={(e) => { this.setState({ showWarningModal: false }); this.props.cancelForm() }}
                    save={this.saveQuestion}
                />
                <Header name={this.props.project.ob.name}
                />
                <section className="content_body" >

                    <Sidebar />
                    <SectionInitial display={this.isFormbuilderVisible('sectionInitial')}
                        submit={this.firstSectionSubmit}
                    />
                    <section className="content_panel builder_panel" style={this.isFormbuilderVisible('builder')}>
                        <section className="builder_content_wrapper">
                            <Sections />
                            <section className="builder_middle">
                                <div className="builder_form_title"><h3>Fields</h3></div>
                                <Questions />
                            </section>
                            <section className="builder_right">
                                {this.fieldConfigPanel('element')}
                            </section>

                        </section>
                        <section className="builder_content_action_bar">
                            <div className="b_c_action_left section_action">
                                <div id="sectionAdd">
                                    {this.getSectionAddElement()}
                                </div>
                                <div id="sectionImport">
                                    {this.getSectionImportElement()}
                                </div>

                            </div>
                            <div className="b_c_action_right grand_action">
                                {this.getAddFieldElement()}
                                <div className="ques_saving_action" style={this.quesSavingAction()}>
                                    <button className="button cancel_btn" onClick={this.props.cancelForm}>Cancel</button>
                                    <button className="button black_btn" onClick={this.saveQuestion}>Save Question</button>
                                </div>
                            </div>

                        </section>
                    </section>
                </section>


            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        parent: ownProps,
        sidebar: state.Sidebar,
        project: state.Project,
        question: state.Question,
        text: state.Text,
        number: state.Number,
        dateTime: state.DateTime,
        dropCheck: state.DropCheck,
        otherField: state.OtherField,
        groupDrop: state.GroupDrop,
        valueCheck: state.ValueCheck,
        pickRule: state.PickRule,
        calcRule: state.CalcRule,
        jumpRule: state.JumpRule,
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        getProjectById: ProjectAction.getProjectById,
        fetchSections,
        createSection,
        cancelForm: ProjectAction.cancelForm,
        saveRule: ProjectAction.saveRule,
        createQuestion: ProjectAction.createQuestion,
        selectConfigPanel: ProjectAction.selectConfigPanel,
        showWarningModal: ProjectAction.showWarningModal,

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilderApp);

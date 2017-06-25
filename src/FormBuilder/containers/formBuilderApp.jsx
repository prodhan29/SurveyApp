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
import SectionAdd from '../components/section/sectionAdd.component';
import { toastr } from 'react-redux-toastr';

const AddFieldRow = (props) => (
    <div className="add_field_row">
        <button onClick={props.onClick} >Add Field</button>
    </div>
);

const SectionAddButton = (props) => (
    <div className="action_item" onClick={props.toggle}>
        Add Section
    </div>
)

class FormBuilderApp extends React.Component {

    constructor() {
        super();
        this.state = {
            showAddFieldPanel: false,
            showAddSection: false
        }

    }

    componentDidMount() {
        console.log(" url params -- > " + JSON.stringify(this.props.projectId));
        fetchSections(this.props.projectId);
        window.onerror = function (msg) {
            toastr.error('Error: ' + msg);
        };
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

    sectionSubmit = (data) => {
        data.projectId = this.props.projectId;
        this.props.createSection(data);
        this.toggleSectionAdd();
    }

    getSectionAddElement = (event) => {
        return (
            this.state.showAddSection ?
                <SectionAdd close={this.toggleSectionAdd}
                    submit={this.sectionSubmit} />
                : <SectionAddButton toggle={this.toggleSectionAdd} />
        )
    }

    getAddFieldElement = () => {
        return this.state.showAddFieldPanel ? <AddFieldPanel onClick={this.toggleAddFieldButton}
            selectConfigPanel={this.props.selectConfigPanel} />
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
                <section className="header">
                    <div className="logo"><img src="assets/img/logo.png" /></div>
                    <div className="header_main">
                        <h2 className="header_title">Proin Gravida Nibh Vel</h2>
                        <div className="user"><img src="assets/img/user.png" /></div>
                    </div>
                </section>
                <section className="content_body">

                    <Sidebar />
                    <section className="content_panel builder_panel">
                        <section className="builder_content_wrapper">
                            <Sections />
                            <section className="builder_middle">
                                <div className="builder_form_title"><h3>Fields</h3></div>
                                <Questions />
                                {this.getAddFieldElement()}
                            </section>
                            {this.fieldConfigPanel('element')}
                        </section>
                        <section className="builder_content_action_bar">
                            <div className="b_c_action_left section_action">
                                {this.getSectionAddElement()}
                                <div className="action_item">
                                    <lable htmlFor="#import-section">Import Section</lable>
                                    {/*<input id="import-section" type="file" onChange={importSection} />*/}
                                </div>
                            </div>
                            <div className="b_c_action_right grand_action">
                                <button className="button cancel_btn" onClick={this.props.cancelForm}>Cancel</button>
                                <button className="button black_btn" onClick={this.saveQuestion}>Save Form</button>

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
        project: state.Project,
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

        fetchSections,
        createSection,
        cancelForm: ProjectAction.cancelForm,
        saveRule: ProjectAction.saveRule,
        createQuestion: ProjectAction.createQuestion,
        selectConfigPanel: ProjectAction.selectConfigPanel

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilderApp);

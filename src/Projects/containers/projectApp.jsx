import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from '../../styles/img/logo.png';
//components
import Sidebar from '../../GeneralComponent/sidebar.component';
import ProjectCreateModal from '../components/projectCreateModal';
import ConfirmationModal from '../components/confirmationModal';
//actions
import * as ProjectAction from '../actions/allProjects.action';

class Projects extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateModal: false,
            project: null,
            index: -1
        }
    }

    componentDidMount() {
        this.props.fetchAllProjects();
    }

    toggleModal = () => {
        let _this = this;
        this.setState({
            showCreateModal: !_this.state.showCreateModal
        })
    }

    setProject = (project, index) => {
        this.setState({ project, index });
    }

    publish =(project, index)=>{
        project.published = !project.published;
        ProjectAction.updateProject(project, index);
    }

    showAllProjects = () => {
        return this.props.projects.list.map((project, index) => {
            let formbuilderLink = `/form-builder/${project.projectId}`;
            return (
                <tr key={index}>
                    <td className="selection"><span className="ui_checkbox unchecked"></span></td>
                    <td className="text_left"> <a href={formbuilderLink}> {project.name}</a> </td>
                    <td className="text_center"> {project.version} </td>
                    <td className="text_center" onClick={()=>this.publish(project, index)}> {project.published ? <span className="label label-success"> Published</span> : <span className="label label-default">in progress</span>} </td>
                    <td className="text_center"> {project.sectionAllowed ? <span className="label label-info"> Allowed </span> : <span className="label label-danger">Not allowed</span>}</td>
                    <td className="text_center"> {project.lastModifiedDate}</td>
                    <td className="text_center">
                        <button className="button manage_user" onClick={() => this.setProject(project, index)} data-toggle="modal" data-target="#myModal" >Delete</button> &nbsp;
                        <button className="button manage_user"> Edit</button>
                    </td>

                </tr>
            )
        })
    }

    render() {

        console.log('length ==' + this.props.projects.list.length);
        return (
            <div className="main_container">

                <section className="header">
                    <div className="logo"><img src={logo} /></div>
                    <div className="header_main">
                        <h2 className="header_title">Proin Gravida Nibh Vel</h2>
                        <div className="user"><img src="styles/img/user.png" /></div>
                    </div>
                </section>
                <section className="content_body">

                    <Sidebar />
                    <section className="content_panel settings_content">
                        <div className="data_container">
                            <div className="list_view_control_bar">
                                <span className="icon_item search_panel">
                                    <input className="search_bar" type="text" placeholder="Search Here" name="search" /></span><br></br><br></br>
                                <button className="button manage_user" onClick={this.toggleModal}> create Project</button>
                            </div>

                            <div className="settings_list">
                                <table className="bordered_table">
                                    <thead>
                                        <tr>
                                            <th className="selection"><span className="ui_checkbox checked"></span></th>
                                            <th className="text_left">Name</th>
                                            <th className="text_center">Version</th>
                                            <th className="text_center">published</th>
                                            <th className="text_center">section Allowed</th>
                                            <th className="text_center">last modified</th>
                                            <th className="action"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showAllProjects()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                </section>
                {
                    !this.state.showCreateModal ? null : <ProjectCreateModal toggleModal={this.toggleModal}
                        createProject={this.props.createProject} />
                }
                <ConfirmationModal project={this.state.project}
                    deleteProject={() => this.props.deleteProject(this.state.project.projectId, this.state.index)}
                />

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        projects: state.AllProject,
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        createProject : ProjectAction.createProject,
        deleteProject : ProjectAction.deleteProject,
        fetchAllProjects : ProjectAction.fetchAllProjects
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

//onClick={() => this.props.deleteProject(project.projectId, index)}
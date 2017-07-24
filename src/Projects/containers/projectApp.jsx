import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push, replace } from 'react-router-redux';
import Store from '../../store';
// icons
import projectIcon from '../../styles/img/excel.png';
import logo from '../../styles/img/logo.png';
import userImg from '../../styles/img/user.png';
import shortParagraph from '../../styles/img/short-paragraph.png'
//components
import Sidebar from '../../GeneralComponent/sidebar.component';
import Header from '../../GeneralComponent/header.component';
import ProjectCreateModal from '../components/projectCreateModal';
import ConfirmationModal from '../components/confirmationModal';
import Loader from '../../GeneralComponent/loader.container';
//actions
import * as ProjectAction from '../actions/allProjects.action';


class Projects extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            showCreateModal: false,
            project: null,
            index: -1
        }
    }

    componentDidMount() {
        ProjectAction.loaderForProject();
        ProjectAction.fetchAllProjects();
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

    copyProject =(project)=> {
        project = JSON.parse(JSON.stringify(project));
        project.name = `${project.name}_${Date.now()}`;
        this.props.copyProject(project);
    }

    publish = (project, index) => {
        project.published = !project.published;
        ProjectAction.updateProject(project, index);
    }

    redirectToProject = (project) => {
        let link = `/form-builder/${project.projectId}`;
        Store.dispatch(replace(link));

    }

    filterProject = () => {
        let filtered = [];
        for (let i = 0; i < this.props.projects.list.length; i++) {
            if (this.props.projects.list[i].name.toLowerCase().indexOf(this.state.searchText) > -1) {
                filtered.push(this.props.projects.list[i]);
            }
        }
        return filtered;
    }

    showAllProjects = () => {
        return this.filterProject().map((project, index) => {
            return (

                <tr key={index}>
                    <td>
                        <span className="project_avater"><img src={projectIcon} /><span className="pr_name">{project.name.substring(0, 2).toUpperCase()}</span></span>
                        <div className="content_group project_info">
                            <h4 onClick={() => this.redirectToProject(project)}><a href=""> {project.name}</a> </h4>
                            <p className="info_p">{`${project.totalSection} Sections, Version: ${project.version}`}</p>
                        </div>
                    </td>
                    <td>
                        <span className="user_avater"><img src={userImg} /> </span>
                        <div className="content_group">
                            <p>{project.createdBy}</p>
                            <p className="info_p">{project.lastModifiedDate}</p>
                        </div>
                    </td>
                    <td> {project.published ? <span className="label label-success" onClick={() => this.publish(project, index)}> Published</span> : <span className="tag in_progress" onClick={() => this.publish(project, index)}>in progress</span>} </td>
                    <td className="action_col">
                        <span className="dropdown">
                            <i className="fa fa-ellipsis-v " data-toggle="dropdown" aria-expanded="true"></i>
                            <div className="dropdown_panel action_dropdown dropdown-menu">
                                <ul>
                                    <li>Edit</li>
                                    <li onClick={()=> this.copyProject(project)}>Copy</li>
                                    <li onClick={() => this.setProject(project, index)} data-toggle="modal" data-target="#myModal"  >Delete</li>
                                </ul>
                            </div>
                        </span>
                    </td>
                </tr>
            )
        })
    }

    render() {

        return (
            <div className="main_container">
                

                <Header name={this.props.sidebar.active} />
                <section className="content_body">

                    <Sidebar />
                    <section className="content_panel list_view_panel project_list">
                        
                        <div className="data_container">
                            <div className="list_view_control_bar">
                                <span className="icon_item search_panel">
                                    <input type="text"
                                        className="search_bar"
                                        placeholder="Search Here"
                                        name="search"
                                        onChange={(e) => this.setState({ searchText: e.target.value })}
                                    />
                                </span>
                                <span className="button_area">
                                    <button className="button create_btn" onClick={this.toggleModal}>Create project</button>
                                </span>
                            </div>
                            
                            <div className="list_view_table_content">
                                <table className="list_view_table">
                                    <thead>
                                        <tr>
                                            <th>Project Information</th>
                                            <th>Last Modified</th>
                                            <th>Published</th>
                                            <th className="action"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showAllProjects()}
                                    </tbody>
                                </table>
                            </div>
                            <Loader loader={this.props.projects.loader}/>
                        </div>
                    </section>

                </section>
                {
                    !this.state.showCreateModal ? null : <ProjectCreateModal toggleModal={this.toggleModal}
                        createProject={ProjectAction.createProject} />
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
        sidebar: state.Sidebar,
        projects: state.AllProject,
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        createProject: ProjectAction.createProject,
        deleteProject: ProjectAction.deleteProject,
        fetchAllProjects: ProjectAction.fetchAllProjects,
        copyProject: ProjectAction.copyProject
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

//onClick={() => this.props.deleteProject(project.projectId, index)}

/*<tr key={index}>
                    <td className="selection"><span className="ui_checkbox unchecked"></span></td>
                    <td className="text_left"> <a href={formbuilderLink}> {project.name}</a> </td>
                    <td className="text_center"> {project.version} </td>
                    <td className="text_center" onClick={() => this.publish(project, index)}> {project.published ? <span className="label label-success"> Published</span> : <span className="label label-default">in progress</span>} </td>
                    <td className="text_center"> {project.sectionAllowed ? <span className="label label-info"> Allowed </span> : <span className="label label-danger">Not allowed</span>}</td>
                    <td className="text_center"> {project.lastModifiedDate}</td>
                    <td className="text_center">
                        <button className="button manage_user" onClick={() => this.setProject(project, index)} data-toggle="modal" data-target="#myModal" >Delete</button> &nbsp;
                        <button className="button manage_user"> Edit</button>
                    </td>

                </tr>*/
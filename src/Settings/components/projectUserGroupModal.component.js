import React from 'react';

export default class UserGroupModal extends React.Component {

    constructor(props) {
        super(props);

        console.log(JSON.stringify(this.props.edit));
        let _this = this;
        this.state = {
            project: this.props.edit.enable ? this.props.edit.project : null,
        }
    }

    setProject=(project)=>{
        this.setState({project});
    }

    showProjects = () => {
        return this.props.allProjects.map((item, index) => {
            return (
                <li key={index} onClick = {()=>this.setProject(item)}>
                    <a href="#">{item.name}</a>
                </li>
            )
        });
    }

    showUserGroups=()=>{
        return this.props.userGroup.list.map((item, index) => {
            return (
                <li key={index} onClick={()=> this.props.addTotselectedGroups(item)}>
                    <a href="#">{item.name}</a>
                </li>
            )
        })
    }

    showSelectedGroups=()=>{
        return this.props.selectedGroups.map((item, index) => {
            return (
                <div className="user_data_list" key={index}>
                    <div> {item.name}</div>
                    <div className="close_action" onClick={() => this.props.removeFromSelectedGroups(index)}><a href="#"><img src="assets/img/close.png" /></a></div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="popup-mask">
                <div className="popup open">
                    <div className="popup-header">
                        <span className="title">Create User Group</span>
                        <span className="popup-close"><button className="button close_btn" onClick={this.props.toggleModal}>Close</button></span>
                    </div>
                    <div className="popup_content">
                        <div className="popup-body scrollable">
                        
                            <div className="user_data_container">
                                <div className="data_container_top">
                                    <span className="title">User Groups</span>
                                </div>
                                <div className="form_row">

                                    <div className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                            {this.state.project === null ? 'Select project' : this.state.project.name}
                                            <i className="fa fa-chevron-down"></i>
                                        </a>
                                        <ul className="dropdown-menu">
                                            {this.showProjects()}
                                        </ul>
                                    </div>

                                    <div className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                             Select Groups   
                                            <i className="fa fa-chevron-down"></i>
                                        </a>
                                        <ul className="dropdown-menu">
                                            {this.showUserGroups()}
                                        </ul>
                                    </div>
                                </div>
                                {this.showSelectedGroups()}
                            </div>
                        </div>
                        <div className="popup-footer">
                            <div className="button-line">
                                <button className="button cancel_btn" onClick={this.props.toggleModal}><span className="icon_cross"><i className="fa fa-times" aria-hidden="true"></i></span>Cancel</button>
                                {
                                    this.props.edit.enable ? <button className="button create_btn" onClick={() => this.props.updateProjectUserGroup(this.state.project)} >Update</button> :
                                        <button className="button create_btn" onClick={() => this.props.createProjectUserGroup(this.state.project)} >Create</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
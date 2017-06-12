import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//components
import Sidebar from '../../GeneralComponent/sidebar.component';
import ProjectCreateModal from '../components/projectCreateModal';

class Projects extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateModal: false
        }
    }

    toggleModal = () => {
        let _this = this;
        this.setState({
            showCreateModal: !_this.state.showCreateModal
        })
    }
    render() {
        console.log(this.state.showCreateModal)
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
                                            <th className="text_center">last modified</th>
                                            <th className="action"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="selection"><span className="ui_checkbox unchecked"></span></td>
                                            <td className="text_left"></td>
                                            <td className="text_center">05</td>
                                            <td className="text_center">0</td>
                                            <td className="text_center">05</td>
                                            <td className="text_center">
                                                <button className="button manage_user">Delete</button> &nbsp;
                                                <button className="button manage_user"> Edit</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </section>
                {this.state.showCreateModal ? <ProjectCreateModal toggleModal = {this.toggleModal}/> : null}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        project: state.Project,
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

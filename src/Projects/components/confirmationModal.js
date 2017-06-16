import React from 'react';

export default class ConfirmationModal extends React.Component {
    render() {
        return (
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title" id="myModalLabel">Delete Project</h4>
                        </div>
                        <div className="modal-body">
                            Are you sure you want delete Project <h3> {this.props.project === null ? '' : this.props.project.name} </h3>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-simple" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-info btn-simple" data-dismiss="modal" onClick={this.props.deleteProject}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
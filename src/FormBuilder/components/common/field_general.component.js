'use strict'
import React from 'react';

export default class General extends React.Component {

    render() {

        return (
            <div>
                <div className="form_row">
                    <span className="form_label">Question Name</span>
                    <span className="form_field">
                        <input type="text"
                            value={this.props.data.name}
                            name="name"
                            data=''
                            onChange={this.props.dataChange} />
                    </span>
                </div>
                <div className="form_row">
                    <span className="form_label">Caption</span>
                    <span className="form_field">
                        <input type="text"
                            value={this.props.data.caption}
                            name="caption"
                            data=''
                            onChange={this.props.dataChange} />
                    </span>
                </div>
                <div className="separator"></div>
                <div className="form_row checkbox_row">
                    <div className="">
                        <label>
                            <input type="checkbox"
                                checked={this.props.data.fieldType.blank}
                                name='blank'
                                data='fieldType'
                                onChange={this.props.dataChange} />
                            &nbsp; Mandatory
                        </label>
                    </div>
                    <div className="">
                        <label>
                            <input type="checkbox"
                                checked={this.props.data.fieldType.readOnly}
                                name='readOnly'
                                data='fieldType'
                                onChange={this.props.dataChange} />
                            &nbsp; Read Only
                        </label>
                    </div>
                    <div className="">
                        <label>
                            <input type="checkbox"
                                checked={this.props.data.fieldType.exportValue}
                                name='exportValue'
                                data='fieldType'
                                onChange={this.props.dataChange} />
                            &nbsp; Allow field to export value
                        </label>
                    </div>
                </div>
                {
                    (this.props.selectedSectionIndex !== 0) ? null: (
                        <div>
                            <div className="separator"></div>
                            <div className="form_row checkbox_row">
                                <div className="">
                                    <label>
                                        <input type="checkbox"
                                            checked={this.props.data.fieldType.indexField}
                                            name="indexField"
                                            data="fieldType"
                                            onChange={this.props.dataChange} />
                                        &nbsp; Index Field
                                    </label>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

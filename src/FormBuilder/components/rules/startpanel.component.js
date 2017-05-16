import React from 'react';

export default class StartPanel extends React.Component {

    render() {
        return (
            <div className="rules_block">
                <div className="segment_title">Calculation Rules
                    <span className="add" onClick={this.props.toggleRule} >+ Add</span></div>
                <div className="segment_content no_content">
                    <div className="rules_condition_operations">
                        {this.props.operators.map(function (op, index) {
                            return (
                                <div className="rules_condition_operation_type" key={index}>
                                    {<div className="rules_condition_operation_type">{op}</div>}
                                </div>
                            );
                        })}
                        <div className="rules_condition_operation_type start_btn">Start</div>
                    </div>
                </div>
            </div>
        );
    }
}

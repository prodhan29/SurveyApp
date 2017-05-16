import React from 'react';

export default class Operator extends React.Component {

    render() {

        let _this = this;
        return (
            <div className="rule_relation_type">
                <div className="type_sign">{this.props.data}</div>
                <div className="dropdown">
                    <i className="material-icons dropdown-toggle" data-toggle="dropdown">more_horiz</i>
                    <div className="dropdown-menu">
                        <div className="rules_condition_operations">
                            {this.props.items.map(function (op, index) {
                                return (<div key={index}
                                    onClick={() => _this.props.saveOperator(op)}
                                    className="rules_condition_operation_type">{op}</div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

import React from 'react';
import QuestionBox from '../../components/rules/questionBox.component';
import Operators from './operator.component';

export default class CalcRule extends React.Component {

    makeNodes = (questions) => {
        if (questions.length === 0) return null;

        let _this = this;
        let ob1_ref = questions;
        return questions.map(function (value, index) {

            if (value.child.length === 0) {
                return (
                    <QuestionBox key={index}
                        data={value}
                        saveNode={(info) => _this.props.saveNode(info, value)}
                        project={_this.props.project}
                        deleteNode={() => _this.props.deleteNode(ob1_ref, index)}
                        toggleQuesBank={(e) => _this.props.toggleQuesBank(ob1_ref, value)}
                        onOperatorClick={(op) => _this.props.onOperatorClick(op, ob1_ref, value)}
                        fetchAndCache={_this.props.fetchAndCache} />
                );
            }
            else {

                let childNodes = _this.makeNodes(value.child);
                return (
                    <div key={index}>
                        <QuestionBox project={_this.props.project}
                            data={value}
                            saveNode={(info) => _this.props.saveNode(info, value)}
                            deleteNode={() => _this.props.deleteNode(ob1_ref, index)}
                            toggleQuesBank={() => _this.props.toggleQuesBank(ob1_ref, value)}
                            onOperatorClick={(op) => _this.props.onOperatorClick(op, ob1_ref, value)}
                            fetchAndCache={_this.props.fetchAndCache} />

                        <div className="rule_cell group_rules"  >
                            <div className="group_rules_wrapper">
                                {childNodes}
                            </div>
                        </div>
                        <Operators items={['+', '-', '/', 'X', '()']}
                            saveOperator={(op) => _this.props.onOperatorClick(op, ob1_ref, value)}
                            data={value.relation} />
                    </div>
                )
            }
        });
    }

    getNodes = () => {
        console.log(JSON.stringify(this.props.data));
        let nodes = this.makeNodes(this.props.data);
        return nodes;
    }

    render() {

        console.log(this.props.data.length);
        return (
            <div className="rules_block calc_rule">
                <div className="segment_title">Calculation Rules
                    <span className="remove" onClick={()=>this.props.toggleRule('remove')}>+ Remove</span></div>
                <div className="segment_content no_content">
                    <div className="segment_content">
                        <div className="rules_condition">

                            {this.getNodes()}
                        </div>
                        <div className="condition_summary">
                            <div className="form_row">
                                <span className="form_label">Expression</span>
                                <span className="form_field condition_summary_field">
                                    {this.props.result}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

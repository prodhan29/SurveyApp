import React from 'react';
import QuestionBox from '../../components/rules/questionBox.component';
import Operators from './operator.component';

export default class CalcRule extends React.Component {

    /*getNodes=()=>{

        var ob1_ref = this.props.data;
        let _this = this;

        if(ob1_ref.length === 0)return null;
        var items = ob1_ref.map(function(value1, index1){

            if(value1.child.length === 0) {
                return (
                    <QuestionBox key ={index1}
                                 data = {value1}
                                 saveNode = {(info)=>_this.props.saveNode(info ,value1)}
                                 project = {_this.props.project}
                                 deleteNode = {()=>_this.props.deleteNode(ob1_ref, index1)}
                                 toggleQuesBank = {(e)=> _this.props.toggleQuesBank(ob1_ref, value1)}
                                 onOperatorClick = {(op)=>_this.props.onOperatorClick(op, ob1_ref, value1)}
                                 fetchAndCache = {_this.props.fetchAndCache}/>
                );
            }
            else {

                var ob2_items = value1.child.map(function(value2, index2){
                    return (
                        <QuestionBox project = {_this.props.project}
                                     data = {value2}
                                     saveNode = {(info)=>_this.props.saveNode(info ,value2)}
                                     deleteNode = {()=>_this.props.deleteNode(value1.child, index2)}
                                     toggleQuesBank = {(e)=> _this.props.toggleQuesBank(value1.child, value2)}
                                     onOperatorClick = {(op)=>_this.props.onOperatorClick(op, value1.child, value2)}
                                     fetchAndCache = {_this.props.fetchAndCache}
                                     key ={index2} />
                    );
                });

                return (
                    <div  key = {index1}>
                        <QuestionBox project = {_this.props.project}
                                     data = {value1}
                                     saveNode = {(info)=>_this.props.saveNode(info ,value1)}
                                     deleteNode = {()=>_this.props.deleteNode(ob1_ref, index1)}
                                     toggleQuesBank = {()=> _this.props.toggleQuesBank(ob1_ref, value1)}
                                     onOperatorClick = {(op)=>_this.props.onOperatorClick(op, ob1_ref, value1)}
                                     fetchAndCache = {_this.props.fetchAndCache} />

                        <div className="rule_cell group_rules"  >
                            <div className="group_rules_wrapper">
                                {ob2_items}
                            </div>
                        </div>
                        <Operators items = {['+', '-', '/', 'X', '()']}
                                   saveOperator = {(op)=>_this.props.onOperatorClick(op, ob1_ref, value1)}
                                   data = {value1.relation}/>
                    </div>
                );
            }
        });
        return items;
    }*/

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
            <div className="rules_block">
                <div className="segment_title">Calculation Rules
                    <span className="remove" onClick={this.props.toggleRule}>+ Remove</span></div>
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

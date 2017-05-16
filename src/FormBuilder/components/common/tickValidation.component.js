'use strict'

import React from 'react';


export default class TickValidation extends React.Component {

    constructor(){
        super();
        this.state = {
            caseNormalization: ['Upper Case', 'Lower Case', 'Sentence Case'],
            treatValidation: ['Warning', 'Error', 'None']
        }
    }

    submitData=(e)=>{
        var ob = {
            target: {
                type: e.target.name,
                name: e.target.name,
                value: e.target.attributes.data.nodeValue,
                attributes:{
                    data:''
                }
            }
        }
        this.props.onchange(ob);
    }

    render(){

        var _this = this;
        var items = this.state[this.props.data].map(function(value, index){
            return(
                <div className="" key= {index}>
                    <label>
                        <input type = "radio"
                                checked = {_this.props.ans == (index+1)}
                                data = {index+1}
                                name = {_this.props.data}
                                onChange = {_this.submitData}/>
                            &nbsp; {value}
                    </label>
                </div>
            );
        });
        return(
            <div>
                <div className="segment_title">Treat Validation as</div>
                <div className="form_row radio_row"> {items}</div>
            </div>
        );
    }
}

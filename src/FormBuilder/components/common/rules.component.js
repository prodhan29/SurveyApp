'use strict'

import React from 'react';
import CalculationRule from '../../containers/calculationRules';
import PickRule from '../../containers/pickRules';
import JumpRule from '../../containers/jumpingRules';
import ValueCheck from '../../containers/valueCheckRules';

export default class Rules extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rules: [<CalculationRule />, <JumpRule />, <ValueCheck />, <PickRule />,]
        }
    }
    render() {

        var ruleIndex = this.props.rules.split(' ');
        var _this = this;
        const fieldRules = ruleIndex.map(function (value, index) {
            return (
                <div key={index}>
                    {_this.state.rules[value]}
                </div>
            );
        });
        return (
            <div> {fieldRules} </div>
        );
    }
}

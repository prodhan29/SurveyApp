import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import General from '../components/common/field_general.component';

// Actions
import * as OtherFieldAction from '../actions/otherField.action';
import {questionLiveUpdate} from '../actions/question.action';

class OtherField extends React.Component {

    dataChange =(e)=>{
        this.props.dataChange(e);
        this.props.questionLiveUpdate(e);
    }

    render() {
        return (
            <section>
                <ul className="tab_nav compact_nav">
                    <li className="tab_nav_item active" >
                        General
                    </li>
                </ul>
                <div className="tab_content">
                    <General data={this.props.otherField.data}
                        dataChange={this.dataChange} />
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        otherField: state.OtherField
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        dataChange: OtherFieldAction.dataChange,
        questionLiveUpdate: questionLiveUpdate,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherField);

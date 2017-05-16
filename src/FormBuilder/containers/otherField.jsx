import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import General from '../components/common/field_general.component';
import * as OtherFieldAction from '../actions/otherField.action';

class OtherField extends React.Component {

    render() {
        return (
            <section className="builder_right field_configuration">
                <ul className="tab_nav compact_nav">
                    <li className="tab_nav_item active" >
                        General
                    </li>
                </ul>
                <div className="tab_content">
                    <General data={this.props.otherField.data}
                        dataChange={this.props.dataChange} />
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
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherField);

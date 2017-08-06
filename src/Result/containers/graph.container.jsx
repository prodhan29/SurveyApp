import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deepClone } from '../../General/Actions/action';

class Graph extends React.Component {

    constructor(props) {
        super(props);
   
    }
    render() {

        return ;
    }
}


function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);

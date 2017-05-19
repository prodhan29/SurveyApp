import React from 'react';
import ReactDom from 'react-dom';
import FormBuilderApp from './FormBuilder/containers/formBuilderApp';
import AppReducer from './appReducer.js'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr'
import ReduxPromise from 'redux-promise';

const storeWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class Apps extends React.Component {

    render() {

        return (
            <div>
                <FormBuilderApp />
                <ReduxToastr preventDuplicates />
            </div>
        );
    }
}

class Root extends React.Component {

    render() {

        return (
            <Provider store={storeWithMiddleware(AppReducer)} >
                <Apps />
            </Provider>
        );
    }
}


ReactDom.render(<Root />, document.getElementById("root"));

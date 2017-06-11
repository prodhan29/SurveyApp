import React from 'react';
import ReactDom from 'react-dom';
import FormBuilderApp from './FormBuilder/containers/formBuilderApp';
import AppReducer from './appReducer.js'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr'
import ReduxPromise from 'redux-promise';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const storeWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const history = syncHistoryWithStore(browserHistory, storeWithMiddleware(AppReducer));

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
                { /* Tell the Router to use our enhanced history */ }
                <Router history={history}>
                     <Route path="/form-builder" component={Apps}>
                     </Route>
                 </Router>   
            </Provider>
        );
    }
}


ReactDom.render(<Root />, document.getElementById("root"));

import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import ReduxToastr from 'react-redux-toastr';
//Apps
import FormBuilderApp from './FormBuilder/containers/formBuilderApp';
import ProjectsApp from './Projects/containers/projectApp';
import Login from './GeneralComponent/Login.container';
//Store
import Store from './store';

const history = syncHistoryWithStore(browserHistory, Store);

class Apps extends React.Component {
    render() {
        return (
            <div>
                <FormBuilderApp projectId = {this.props.params.projectId}/>
                <ReduxToastr preventDuplicates />
            </div>
        );
    }
}

class Root extends React.Component {
    render() {
        return (
            <Provider store={Store} >
                { /* Tell the Router to use our enhanced history */ }
                <Router history={history}>
                     <Route path="/projects" component={ProjectsApp}></Route>
                     <Route path="/login" component={Login}></Route>
                     <Route path="/form-builder/:projectId" component={Apps}></Route>
                 </Router>   
            </Provider>
        );
    }
}


ReactDom.render(<Root />, document.getElementById("root"));

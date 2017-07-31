import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import ReduxToastr from 'react-redux-toastr';

// Apps
import FormBuilderApp from './FormBuilder/containers/formBuilderApp';
import ProjectsApp from './Projects/containers/projectApp';
import Login from './General/Component/Login.container';
import Setting from './Settings/containers/settings';

// Store
import Store from './store';

// styles
import 'semantic-ui-css/semantic.min.css';
import './styles/css/bootstrap.min.css';
import './styles/css/material-kit.css';
import './styles/css/style.css';
import './styles/css/react-datetime.css';
import './styles/css/react-redux-toastr.min.css';

const history = syncHistoryWithStore(browserHistory, Store);

class Apps extends React.Component {
    render() {
        return (
            <div>
                <FormBuilderApp projectId={this.props.params.projectId} />
                <ReduxToastr preventDuplicates />
            </div>
        );
    }
}

class Root extends React.Component {
    render() {
        return (
            <Provider store={Store} >
                { /* Tell the Router to use our enhanced history */}
                <Router history={history}>
                    <Route path="/projects" component={ProjectsApp}></Route>
                    <Route path="/" component={Login}></Route>
                    <Route path="/form-builder/:projectId" component={Apps}></Route>
                    <Route path="/setting" component={Setting}></Route>
                </Router>
            </Provider>
        );
    }
}


ReactDom.render(<Root />, document.getElementById("root"));


import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

// Formbuilder reducers
import Question from './FormBuilder/reducers/questions.reducer';
import Section from './FormBuilder/reducers/sections.reducer';
import Project from './FormBuilder/reducers/project.reducer';
import Text from './FormBuilder/reducers/text.reducer';
import Number from './FormBuilder/reducers/number.reducer';
import DateTime from './FormBuilder/reducers/datetime.reducer';
import DropCheck from './FormBuilder/reducers/dropcheck.reducer';
import OtherField from './FormBuilder/reducers/otherField.reducer';
import ValueCheck from './FormBuilder/reducers/valueCheck.reducer';
import PickRule from './FormBuilder/reducers/pickRule.reducer';
import CalcRule from './FormBuilder/reducers/calcRule.reducer';
import JumpRule from './FormBuilder/reducers/jumpRule.reducer';
import GroupDrop from './FormBuilder/reducers/groupDrop.reducer';

// Settings
import Settings from './Settings/reducers/settings.reducer';
import License from './Settings/reducers/license.reducer';
import Organization from './Settings/reducers/organization.reducer';
import ProjectUser from './Settings/reducers/projectUser.reducer';
import UserGroup from './Settings/reducers/userGroup.reducer';
import ProjectUserGroup from './Settings/reducers/projectUserGroup.reducer';

// Toastr
import { reducer as toastrReducer } from 'react-redux-toastr';

// General
import User from './General/GeneralReducers/user.reducer';

// All Projects
import AllProject from './Projects/reducers/allProjects.reducer';
import Sidebar from './General/GeneralReducers/sidebar.reducer';

const rootReducer = combineReducers({

    routing: routerReducer,

    //Formbuilder reducers
    Project,
    Section,
    Question,
    Text,
    Number,
    DateTime,
    DropCheck,
    OtherField,
    GroupDrop,
    ValueCheck,
    PickRule,
    CalcRule,
    JumpRule,
    toastr: toastrReducer,

    //General Reducer
    User,
    Sidebar,

    //All projects reducer
    AllProject,

    //Settings
    Settings,
    License,
    Organization,
    ProjectUser,
    UserGroup,
    ProjectUserGroup,

});

export default rootReducer;

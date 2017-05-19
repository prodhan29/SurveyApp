'user strict'

import { combineReducers } from 'redux';

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
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({

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
    toastr: toastrReducer 
});

export default rootReducer;

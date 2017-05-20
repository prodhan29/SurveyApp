import { changeFieldState, deepClone } from '../actions/common.action';

var groupDropState = {};
var initialState = {

    configPanels: ['General', 'Validation', 'Values', 'Rules'],
    activePanel: 'General',
    edit: false,
    data: {
        questionId: 0,
        name: '',
        caption: '',
        sectionId: 0,
        jumpingRule: '',
        optionValues: [],
        nodes: {
            name: 'Bangladesh',
            exportValue: 'BD',
            showChildren: true,
            editMode: false,
            children:[
                {
                    name: 'dhaka',
                    exportValue: 'dhk',
                    showChildren: true,
                    editMode: false,
                    children:[
                        {
                            name: 'narayangonj',
                            exportValue: 'NAR',
                            showChildren: true,
                            editMode: false,
                            children:[
                                {
                                    name: 'gopalgonj',
                                    exportValue: 'GOP',
                                    showChildren: true,
                                    editMode: false,
                                    children:[
                                        {
                                            name: 'satgram',
                                            exportValue: 'SAT',
                                            showChildren: false,
                                            editMode: false,
                                            children:[],
                                        }
                                    ],
                                },
                                {
                                    name: 'arihazar',
                                    exportValue: 'arz',
                                    showChildren: false,
                                    editMode: false,
                                    children:[],
                                },
                            ]
                        },
                        {
                            name: 'Gazipur',
                            exportValue: 'GAZ',
                            showChildren: false,
                            editMode: false,
                            children:[],
                        },
                        {
                            name: 'Kishorgonj',
                            exportValue: 'KSH',
                            showChildren: false,
                            editMode: false,
                            children:[],
                        }
                    ]
                },
                {
                    name: 'Barishal',
                    exportValue: 'BASL',
                    showChildren: false,
                    editMode: false,
                    children: [
                        {
                            name: 'Jhalokathi',
                            exportValue: 'JHI',
                            showChildren: false,
                            editMode: false,
                            children: []
                        }
                    ]
                },
                {
                    name: 'Chittagong',
                    exportValue: 'CTG',
                    showChildren: true ,
                    editMode: false,
                    children:[
                        {
                            name: 'potenga',
                            exportValue: 'PTG',
                            showChildren: false,
                            editMode: false,
                            children:[],
                        },
                        {
                            name: 'Coxs bazar',
                            exportValue: 'KSH',
                            showChildren: true,
                            editMode: false,
                            children:[
                                {
                                    name: 'pani',
                                    exportValue: 'PNI',
                                    showChildren: false,
                                    editMode: false,
                                    children:[],
                                }
                            ],
                        }
                    ]
                },
                
            ]
        },
        fieldType: {
            fieldTypeId: 0,
            fieldId: 0,
            fieldTypeName: '',
            exportValue: 0,
            indexField: false,
            blank: false,
            readOnly: false,
            treatAsError: false,
            treatAsWarning: false
        }
    }
}

export default function groupDropField(state = initialState, action) {

    state = deepClone(state);
    groupDropState = state;

    switch (action.type) {

        case 'GROUP_DROP_CONFIGURE_PANEL_CHANGE':
            state.activePanel = action.payload;
            return state;

        case 'GROUP_DROP_DATA_CHANGE':
            groupDropChange(action.payload);
            break;

        case 'CREATE_QUESTION':
            state = initialState;
            break;     
    }
    return state;
}

var groupDropChange = function (e) {
    changeFieldState(groupDropState, e);
}

var setEditMode = function (data) {
    if (data.fieldType.fieldTypeName.toLowerCase() === 'dropdown') {
        groupDropState.data = data;
        groupDropState.edit = true;
    }
}

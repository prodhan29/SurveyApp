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
            children:[
                {
                    name: 'dhaka',
                    exportValue: 'dhk',
                    showChildren: true,
                    children:[
                        {
                            name: 'narayangonj',
                            exportValue: 'NAR',
                            showChildren: true,
                            children:[
                                {
                                    name: 'gopalgonj',
                                    exportValue: 'GOP',
                                    showChildren: true,
                                    children:[
                                        {
                                            name: 'satgram',
                                            exportValue: 'SAT',
                                            showChildren: false,
                                            children:[],
                                        }
                                    ],
                                },
                                {
                                    name: 'arihazar',
                                    exportValue: 'arz',
                                    showChildren: false,
                                    children:[],
                                },
                            ]
                        },
                        {
                            name: 'Gazipur',
                            exportValue: 'GAZ',
                            showChildren: false,
                            children:[],
                        },
                        {
                            name: 'Kishorgonj',
                            exportValue: 'KSH',
                            showChildren: false,
                            children:[],
                        }
                    ]
                },
                {
                    name: 'Barishal',
                    exportValue: 'BASL',
                    showChildren: false,
                    children: [
                        {
                            name: 'Jhalokathi',
                            exportValue: 'JHI',
                            showChildren: false,
                            children: []
                        }
                    ]
                },
                {
                    name: 'Chittagong',
                    exportValue: 'CTG',
                    showChildren: true ,
                    children:[
                        {
                            name: 'potenga',
                            exportValue: 'PTG',
                            showChildren: false,
                            children:[],
                        },
                        {
                            name: 'Coxs bazar',
                            exportValue: 'KSH',
                            showChildren: true,
                            children:[
                                {
                                    name: 'pani',
                                    exportValue: 'PNI',
                                    showChildren: false,
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

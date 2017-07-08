import axios from 'axios'
import AppConfig from '../../application.config';
import Store from '../../store';

export function change(data, index) {
    return {
        type: 'SECTION_CHANGE',
        payload: {
            data,
            index,
        }
    }
}

export function update(data, index) {

    axios.patch(`${AppConfig.domain}/section/${data.sectionId}`, data, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'UPDATE_SECTION',
                payload: response.data,
                index
            }
        })());
    });
}

export function createSection(data) {
    let payload = axios.post(`${AppConfig.domain}/section`, data, AppConfig.ajaxConfig());
    return {
        type: 'CREATE_SECTION',
        payload,
    }
}

export function copySection(data) {
    processSectionForCopy(data);
    axios.post(`${AppConfig.domain}/section/${data.sectionId}/copy`, data, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'COPY_SECTION',
                payload: response
            }
        })());
    });
}

export function importSectionToServer(projectId, file) {

    var info = new FormData();
    info.append('file', file);

    axios.post(`${AppConfig.domain}/section/import?projectId=${projectId}`, info, AppConfig.maltipartConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'IMPORT_SECTION',
                payload: response
            }
        })());
    })
}

export function deleteSection(sectionId, index) {
    axios.delete(`${AppConfig.domain}/section/${sectionId}`, AppConfig.ajaxConfig()).then((response) => {
        Store.dispatch((() => {
            return {
                type: 'DELETE_SECTION',
                index
            }
        })());
    });
}

// loading sctions for the server to show initial state
export function fetchSections(projectId) {
    axios.get(`${AppConfig.domain}/section?projectId=${projectId}`, AppConfig.ajaxConfig()).then((response) => {
        fetchQuesForAllSection(response.data);
        Store.dispatch((() => {
            return {
                type: 'FETCH_SECTIONS_FROM_SERVER',
                payload: response
            }
        })())
    })
}

function fetchQuesForAllSection(sections) {
    console.log(sections);
    for (let i = 0; i < sections.length; i++) {
        var sec = sections[i];
        (function (sec, index) {
            const url = `${AppConfig.domain}/question?sectionId=${sec.sectionId}`;
            axios.get(url, AppConfig.ajaxConfig()).then((response) => {

                Store.dispatch((() => {
                    return {
                        type: 'FETCH_QUESTIONS_FOR_ALL_SECTIONS_INITIALLY',
                        payload: response,
                        index,
                    }
                })());
            })
        })(sec, i);
    }
}

export function resetToastrMsg() {
    return {
        type: 'RESET_SECTION_TOASTR_MSG'
    }
}
//------------------------------------------ Services ------------------------------------//
//---------------------------------------------------------------------------------------//
export function exportSection(section, questions) {
    let filename = `section_${section.sectionId}_${section.name}.json`;
    console.log("baal")
    section.questionList = removeQuestionRules(questions);
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify([section])));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export function importSection(e, projectId) {
    var file = e.target.files[0];
    let reader = new FileReader();
    let _this = this;

    // this function is called when text is fully loaded
    reader.onload = function (e) {
        importSectionToServer(projectId, file);
    }
    reader.readAsText(file);
}

// method is called when exporting and copy section
export function removeQuestionRules(questionList) {
    console.log('before exporting');
    console.log(questionList);
    for (let i = 0; i < questionList.length; i++) {

        questionList[i].jumpingRuleClient = null;
        questionList[i].pickAndSuggestRuleClient = null;
        questionList[i].valueCheckRuleClient = null;
        questionList[i].calculationRuleClient = null;
        questionList[i].jumpingRule = null;
        questionList[i].pickAndSuggestRule = null;
        questionList[i].valueCheckRule = null;
        questionList[i].calculationRule = null;
    }
    console.log('after exporting');
    console.log(questionList);
    return questionList;
}

function processSectionForCopy(data) {
    data.projectId = data.project.projectId;
    delete data.project;
}
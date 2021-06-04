import axios from "axios";

const state = {
    questionList: {
        title: "",
        about: "",
        list: []
    },
    answersList: [],
    questiosFromDB:[],
    isLogged:false,
    newItemAdded:false,
    pagin:1,
    nrOfPAgins:null,
    showSpinner:false,
    disableBack: false,
    disableNext: false,
    logRegSpinner:false,
    showPreview:false,
    afterLoginNotification:false,
    afterLogOutNotification:false,
    serverRequeestError:false,
    logORRegError:false,
};

const getters = {
    getLogORRegError : state => state.logORRegError,
    getServerRequeestError: state => state.serverRequeestError,
    getAfterLogOutNotification: state => state.afterLogOutNotification,
    getAfterLoginNotification: state => state.afterLoginNotification,
    getShowPreview: state =>state.showPreview,
    getAnswerList: state => state.answersList,
    getQuestionList: state => state.questionList,
    getIsLogged: state => state.isLogged,
    getQuestionsFromDB : state => state.questiosFromDB,
    getNewItemAdded: state => state.newItemAdded,
    getShowSpinner: state => state.showSpinner,
    getDisabledNextButton: state => state.disableNext,
    getDisabledBackButton: state => state.disableBack,
    getLogRgSpinner: state => state.logRegSpinner,
};

const actions = {
    saveSurveyToDatabase({ state, dispatch}) {
        state.logRegSpinner = true;

        return new Promise( (resolve, reject) => {
            axios
                .post("/api/post/survey", state.questionList, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }).then(res => {
                    dispatch('attempt');
                    resolve(true);
                    state.logRegSpinner = false;
                }).catch(er => {
                    state.logRegSpinner = false;
                    console.log(er);
                    if(er.response.status === 500){
                        state.serverRequeestError = true;
                        setTimeout(() => {
                            state.serverRequeestError = false;
                        }, 5000);
                    }
                });
        })
    },
    attempt({state}){
        state.isLogged === true  ? '' : state.isLogged = false;
        console.log('am intrat in attempt');
        return new Promise((resolve, reject) => {
            axios.get('/api/informations/me?page=1',
            {
                headers:{
                    Authorization:"Bearer " + localStorage.getItem('token')
                }
            }).then( res => {
                state.questiosFromDB = [];
                state.isLogged = true;
                state.nrOfPAgins = res.data.count;
                res.data.posts.data.map( el => state.questiosFromDB.push({el:el, copied:false}));
                Math.ceil(res.data.count / 6) <= state.pagin ? state.disableNext = true : state.disableNext = false;
                Math.ceil(res.data.count / 6) >= state.pagin ? state.disableBack = true : state.disableBack = false;
                resolve(true);
            }).catch( () => {
                state.isLogged = false;
                resolve(false);
            });
        })
    },
    backPagination({state}, payload){
        if (state.pagin > 1){
            state.pagin--;
            state.showSpinner = true;
            axios.get('/api/informations/me?page=' + state.pagin ,
            {
                headers:{
                    Authorization:"Bearer " + localStorage.getItem('token')
                }
            }).then( res => {
                state.showSpinner = false;
                state.questiosFromDB = [];
                res.data.posts.data.map( el => state.questiosFromDB.push({el:el, copied:false}));
                if(state.pagin <=1){
                    state.disableBack = true;
                    state.disableNext = false;
                }
            }).catch(er => {
                state.showSpinner = false;
                if(er.response.status === 500){
                    state.serverRequeestError = true;
                    setTimeout(() => {
                        state.serverRequeestError = false;
                    }, 5000);
                }
            }); 
        }
    },
    nextPagination({state}){
        if(state.pagin < Math.ceil(state.nrOfPAgins / 6)){
            state.pagin++;
            state.showSpinner = true;
            axios.get('/api/informations/me?page=' + state.pagin ,
                {
                    headers:{
                        Authorization:"Bearer " + localStorage.getItem('token')
                    }
                }).then( res => {
                    state.showSpinner = false;
                    state.questiosFromDB = [];
                    res.data.posts.data.map( el => state.questiosFromDB.push({el:el, copied:false}));
                    if(state.pagin >= Math.ceil(state.nrOfPAgins / 6)){
                        state.disableBack = false;
                        state.disableNext = true;
                    }
                }).catch(er => {
                    state.showSpinner = false;
                    if(er.response.status === 500){
                        state.serverRequeestError = true;
                        setTimeout(() => {
                            state.serverRequeestError = false;
                        }, 5000);
                    }
                }); 
        }
    },
    userLogin({ state }, payload) {
        state.logRegSpinner = true;
        return new Promise ((resolve, reject) => {
            axios
            .post("/api/user/login", payload.user)
            .then(res =>{
                
                    state.afterLoginNotification = true;
                    res.data.surveys.map( el => state.questiosFromDB.push({el:el, copied:false}));
                    setTimeout(() => {
                        state.afterLoginNotification = false;
                    }, 3000);
                    localStorage.setItem("token", res.data.token)
                    state.logRegSpinner = false;
                    state.isLogged = true;
                    console.log(res.status);
                    resolve(true);
                }).catch( er => {
                    console.log(er);
                        state.logRegSpinner = false;
                        if(er.response.status === 500){
                            state.serverRequeestError = true;
                            setTimeout(() => {
                                state.serverRequeestError = false;
                            }, 5000);
                        }
                        if(er.response.status === 401){
                            state.logORRegError = true;
                            setTimeout(() => {
                                state.logORRegError = false;
                            }, 5000);
                        }
                });
        })
    },
    userRegister({ state }, payload) {
        state.logRegSpinner = true;
        return new Promise((resolve, reject) => {
            axios
                .post("/api/user/register", payload.user).then( () =>{ 
                    state.logRegSpinner = false;
                    resolve('/');
                }).catch( er => {
                    console.log(er);
                        state.logRegSpinner = false;
                        if(er.response.status === 500){
                            state.serverRequeestError = true;
                            setTimeout(() => {
                                state.serverRequeestError = false;
                            }, 5000);
                        }

                        if(er.response.status === 409){
                            state.logORRegError = true;
                            setTimeout(() => {
                                state.logORRegError = false;
                            }, 5000);
                        }
                });
        })
    },
    userLogout({state}){
        state.logRegSpinner = true;
        return new Promise( (resolve, reject) => {
            axios.delete('/api/user/logout', {
                headers:{
                    Authorization:"Bearer " + localStorage.getItem('token')
                }
            }).then(() =>{ 
                state.logRegSpinner = false
                localStorage.removeItem('token');
                state.isLogged = false;
                state.afterLogOutNotification = true;
                state.afterLoginNotification = 11;
                setTimeout(() => {
                    state.afterLogOutNotification = false;
                    state.afterLoginNotification = false;
                }, 3000);
                resolve('/');
            }).catch( () => state.logRegSpinner = false);
        })
    }
};

const mutations = {
    resetList(state){
        state.questionList = {
            title: "",
            about: "",
            list: []
        }
    },
    showPreview(state){
        state.showPreview = !state.showPreview;
    },
    changeCopiedLink(state, payload){
        state.questiosFromDB.map( el => el.copied = false);
        state.questiosFromDB[payload.index].copied = true;
    },
    deleteSurvey(state, payload){
        state.questiosFromDB.splice(payload.index, 1);
    },
    updateAnswers(state, payload) {
        state.questionList.list[payload.index].answersList[
            payload.answerIndex
        ] = payload.editedObject;
    },
    updateQuestion(state, payload) {
        state.questionList.list[payload.index].question = payload.editedObject;
    },
    updateTitle(state, payload) {
        state.questionList.title = payload.title;
    },
    updateAbout(state, payload) {
        state.questionList.about = payload.about;
    },
    clearValuesOnChange(state) {
        state.answersList = [];
    },
    addQuestionToList(state, payload) {
        state.questionList.title = payload.title;
        state.questionList.about = payload.about;
        state.questionList.list.push({
            question: payload.question,
            pickedAnswerType: payload.pickedAnswerType,
            answersList: state.answersList
        });
        state.answersList = [];
    },
    deleteAnswer(state, payload) {
        state.questionList.list[payload.index].answersList.splice(
            payload.answersIndex,
            1
        );
        if (state.questionList.list[payload.index].answersList.length <= 1) {
            state.questionList.list.splice(payload.index, 1);
        }
    },
    deleteQuestion(state, payload) {
        state.questionList.list.splice(payload.index, 1);
    },
    addAnswers(state, payload) {
        state.answersList.push(payload.answer);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};

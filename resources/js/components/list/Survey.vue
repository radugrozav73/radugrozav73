<template>
    <div class="pageWrapper">
    <div class="bdy">
        <Spinner v-if="!loaded" />
        <div class="bdyOfQuestion" v-if="alreadyDoneError">
                <h1>Thank you for completeing this survey</h1>
                <button @click="goHome()" class="goHomeButton">Go back home</button>
        </div>
        <div class="bdyOfQuestion" v-if="somethingWentWrongError">
            <div class="centerError">
                <svg xmlns="http://www.w3.org/2000/svg" width="200px" viewBox="0 0 24 24"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg>
                Something went wrong, please try again later.
            </div>
        </div>
        <div class="contentWrapper" v-if="loaded && !alreadyDoneError && !somethingWentWrongError">
            <div class="titleAndAbout">
                <h1>{{survey.title}}</h1>
                <p>{{survey.about}}</p>
            </div>
            <div class="bdyOfQuestion">
                <div class="cardWrapper" v-for="(item, index) in survey.list_of_questions" :key="index">
                    <div v-if="currentIndex === index" >
                        <p class="positioningQuestion">Question {{index+1}} out of {{survey.list_of_questions.length}}</p>
                        <p class="positioningQuestion">{{item.question}}</p>
                        <div class="yesOrNoPositioning" v-if="item.pickedAnswerType === 'yesOrNo'">
                            <div>
                                <input name="yesOrNo" v-model="selectedYesOrNoAnswer" value="yes" type="radio">
                                <label for="yesOrNo">Yes</label>
                            </div>
                            <div>
                                <input name="yesOrNo" v-model="selectedYesOrNoAnswer" value="no" type="radio">
                                <label for="yesOrNo">No</label>
                            </div>
                        </div>
                        <div class="mineOnePositioning" v-else-if="item.pickedAnswerType === 'mineOne'">
                            <div class="listOfAnswers" v-for="(answer, index1) in item.answersList" :key="index1">
                                <input name="mineOne" v-model="mineOneAnswer" :value="answer" type="radio">
                                <label for="mineOne">{{answer}}</label>
                            </div>
                        </div>
                        <div class="mineOnePositioning" v-else-if="item.pickedAnswerType === 'mineMultiple'">
                            <div class="listOfAnswers" v-for="(answer, index1) in item.answersList" :key="index1">
                                <input :id="index" v-model="checkedAnswers" :value="answer" type="checkbox">
                                <label for="mineOne">{{answer}}</label>
                            </div>
                        </div>
                        <div class="textAreaPositioning" v-else-if="item.pickedAnswerType === 'freeToWrite'">
                            <textarea v-model="writtenAnswer" name="" id="" cols="30" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="actionButtons"  v-if="currentIndex === index">
                        <button @click="saveGoNext(index, item.pickedAnswerType, 'back')" v-show="index > 0">Previous question</button>
                        <button v-show="index < survey.list_of_questions.length-1" @click="saveGoNext(index, item.pickedAnswerType, 'forth')">Next Question</button>
                        <button v-show="index === survey.list_of_questions.length-1" @click="saveAnswer(index, item.pickedAnswerType, 'forth')">Finish</button>
                    </div>
                    <p v-if="error && currentIndex === index">Please select an answer!</p>
                </div>
            </div>
        </div>
    </div>
    </div>
    
</template>

<script>
import axios from 'axios';
import Navbar from "../smallcomponents/navbar/Navbar";
import Spinner from "../spinner/Spinner";

export default {
    data(){
        return {
            currentIndex:0,
            survey:{},
            completedSurvey:null,
            selectedYesOrNoAnswer:'',
            mineOneAnswer:'',
            writtenAnswer:'',
            checkedAnswers:[],
            error:false,
            showFinish:false,
            globalError:false,
            indexWithError:null,
            alreadyDoneError: false,
            loaded:false,
            somethingWentWrongError:false
        }
    },
    components:{
        Spinner,
    },
    methods:{
        saveAnswer(index, answerType, direction){
            this.saveGoNext(index, answerType, direction);
            
            if(!this.error){
                for(let i = 0; i < this.survey.list_of_questions.length; i++){
                    this.completedSurvey[i] === undefined ? (this.globalError = true, this.indexWithError = i): '' 
                }
            }
            this.loaded = false;
            axios.post('/api/post/completed_surveys', {key:this.$route.params.id, answer:this.completedSurvey}, {headers:{Authorization:'Bearer ' + localStorage.getItem('token')}}).then(res=> {
                this.loaded = true
                this.alreadyDoneError = true;
                }).catch( () => this.loaded = true);
        },
        saveGoNext(index, answerType, direction){
            this.error = false;
            (this.checkedAnswers.length > 0 || this.mineOneAnswer != '' || this.selectedYesOrNoAnswer != '' || this.writtenAnswer != '') || direction === 'back' ? '' : this.error = true;
            if(this.error){
                return
            }

            this.completedSurvey != null ? '' : this.completedSurvey = new Array(this.survey.list_of_questions.length);

            
            answerType === 'mineOne' ? this.completedSurvey[this.currentIndex] = this.mineOneAnswer : '';
            answerType === 'mineMultiple' ? this.completedSurvey[this.currentIndex] = this.checkedAnswers : '';
            answerType === 'yesOrNo' ? this.completedSurvey[this.currentIndex] = this.selectedYesOrNoAnswer : '';
            answerType === 'freeToWrite' ? this.completedSurvey[this.currentIndex] = this.writtenAnswer : '';

            direction === 'forth' && !this.error ?  this.currentIndex++ : '';
            direction === 'back' ? this.currentIndex-- : '';

            if(direction === 'back'){
                this.survey.list_of_questions[this.currentIndex].pickedAnswerType === 'mineMultiple' ? this.checkedAnswers = this.completedSurvey[this.currentIndex] : ''
                this.survey.list_of_questions[this.currentIndex].pickedAnswerType === 'mineOne' ? this.mineOneAnswer = this.completedSurvey[this.currentIndex] : ''
                this.survey.list_of_questions[this.currentIndex].pickedAnswerType === 'yesOrNo' ? this.selectedYesOrNoAnswer = this.completedSurvey[this.currentIndex] : ''
                this.survey.list_of_questions[this.currentIndex].pickedAnswerType === 'freeToWrite' ? this.writtenAnswer = this.completedSurvey[this.currentIndex] : '';
            }

            if(direction === 'forth' && this.completedSurvey[this.currentIndex] === undefined){
                this.checkedAnswers = [];
                this.writtenAnswer = '';
                this.selectedYesOrNoAnswer = '';
                this.mineOneAnswer = '';
            }
            console.log(this.completedSurvey);
        },
        goHome(){
            this.$router.push('/');
        }
    },
    mounted(){
            axios.post('/api/getSurveyByKey',
                {key:this.$route.params.id},
                {
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            ).then(res => {
                this.survey = res.data;
                this.loaded = true
                })
                .catch( e =>{
                    e.response.status === 500 ? (this.somethingWentWrongError = true, this.loaded = true) : '';
                    e.response.status === 403 ? (this.alreadyDoneError = true, this.loaded = true) : '';
                });
    }
}
</script>

<style scoped>
.centerError{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.cardWrapper{
    width:100%;
}
.bdy{
    height: 100vh;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;    
}
.actionButtons{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;
    margin-bottom: 20px;
}
textarea{
    width:80%;
    outline: none;
    resize: none;
    border: 1px solid #dddddd;
    border-radius: 8px;
}
.actionButtons>button{
    margin:10px;
    border: none;
    background:#a5e1ad;
    color:white;
    border-radius: 3px;
    outline: none;
    width: 80%;
    height: 40px;
    cursor: pointer;
    transition: .3s ease;
}
.actionButtons>button:hover{
    margin:10px;
    border: none;
    transition: .3s ease;
    width: 80%;
    height:40px;
    background:#6a966f;
    color:white;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
}
.textAreaPositioning{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
}
.mineOnePositioning{
    padding-bottom: 20px;
}
.listOfAnswers{
    margin:10px 0;
}
.listOfAnswers>input{
    margin-left:20px;
    margin-top:5px;
}
.listOfAnswers>label{
    margin-left:5px;
    font-size: .8rem;
    overflow-wrap: break-word;
    margin-right: 10px;
}
.listOfAnswers{
    display: flex;
    align-items: flex-start;
}
input[type="radio"]{
    cursor: pointer;
}
.yesOrNoPositioning{
    width:100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.bdyOfQuestion{
    width:80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 300px;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 1px 1px 22px 1px rgba(0, 0, 255, .1);
    border:1px solid #dddddd;
}
.goHomeButton{
    height:60px;
    cursor: pointer;
    width:150px;
    border:1px solid #dddddd;
    border-radius: 10px;
    outline: none;
    transition: .3s ease;
    background: none;
}
.goHomeButton:hover{
    height:60px;
    cursor: pointer;
    width:150px;
    transition: .3s ease;
    border:1px solid #dddddd;
    background: rgb(240, 237, 237);
    border-radius: 10px;
    outline: none;
}
p{
    text-align: center;
}
.pageWrapper{
    width: 100%;
    display: flex;
    justify-content: center;
}
.titleAndAbout{
    width:80%;
}
.positioningQuestion{
    text-align: center;
}
.titleAndAbout>h1, p{
    margin-left:10px;
}
.contentWrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
}
.titleAndAbout>h1,p{
    text-align: left;
}
.titleAndAbout>p{
    font-size:.8rem;
    font-weight: 200;
}

@media only screen and (max-width:800px){
    .bdyOfQuestion>h1{
        font-size: 1.3rem;
    }
}
@media only screen and (max-width:530px){
    .bdyOfQuestion>h1{
        font-size: 1rem;
    }
}
@media only screen and (max-width:400px){
    .bdyOfQuestion{
        width:100%;
    }
    .bdyOfQuestion>h1{
        font-size: .8rem;
    }
}
</style>
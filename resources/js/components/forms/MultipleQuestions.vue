<template>
    <div class="bdy">
        <Notify :notify="notify" :msg="'Added to List'"/>
        <transition name="fade" mode="in-out">
            <div :key="'1'" v-if="getServerRequeestError" class="ErrorDesign" >
                <div class="backgroundOfError">
                    Sorry, server does not respond, please try again.
                </div>
            </div>
        </transition>
        <form @keydown.enter.prevent @submit.prevent="addQuestionToList()" class="wrapperOfQuestions">
            <transition name="fade" >
                <div class="noQuestionAdded" v-if="this.surveySaveError"  :key="'1'">
                    You did not add any questions
                </div>
            </transition>
            <h1 class="styleH1">Create a survey</h1>
            <div class="answerWrapper">
                <label>Survey Title</label>
                <div class="inputAndButton">
                    <input @keyup.enter="updateTitle()" v-model="title" type="text" />
                    <!-- error -->
                    <button class="actionButton" type="button" @click="updateTitle()">Update Title</button>
                </div>
                <p class="errorMessage" v-if="titleNotCompleted">Enter a title for the survey.</p>
                <hr>
                <label>What is this survey about</label>
                <textarea @keyup.enter="updateAbout()" cols="30" rows="4" v-model="about" ></textarea>
                <!-- error -->
                <p class="errorMessage" v-if="aboutNotCompleted">Tell us what  this survey is about</p>
                <div class="aboutButtonPositioning">
                    <button class="actionButton" type="button" @click="updateAbout()">Update About</button>
                </div>
                <hr>
                <label>Add a question here</label>
                <input v-model="question" type="text" />
                <!-- error -->
                <p class="errorMessage" v-if="questionNotAdded">Add the question</p>
                <hr>
                <label for="selectAnswerType">Select Answer Type</label>
                <select style="width:auto" id="selectAnswerType" v-model="pickedAnswerType">
                    <option value="mineOne">
                        Write my own answers to select (Single correct answer)
                    </option>
                    <option value="mineMultiple">
                        Write my own answers to select (Multiple correct answers)
                    </option>
                    <option value="freeToWrite">
                        Subject is able to write his own answer
                    </option>
                    <option value="yesOrNo">
                        Yes or no answer
                    </option>
                </select>
                <p class="errorMessage" v-if="answerNotSelected">Select the type of answer you wish to get</p>
                <hr>
                <div class="answerForm" @submit.prevent v-if="pickedAnswerType === 'mineOne' || pickedAnswerType === 'mineMultiple'">
                    <label for="answer">Enter answer</label>
                    <div class="inputAndButton">
                        <input @keyup.enter="addAnswers()" v-model="answer" type="text" name="answer">
                        <button class="actionButton" type="button" @click="addAnswers()">Add Answers</button>
                    </div>
                    <p class="errorMessage" v-if="conditionNotMet">Write minimum 2 answers, user can't have only one answer to choose</p>
                    <p class="errorMessage" v-if="noAnswer">Add an answer</p>
                    <ol class="answersList">
                        <p v-if="getAnswerList.length === 0">Nothing was added to the list.</p>
                        <div v-if="getAnswerList.length > 0" >
                            <li v-for="(item, index) in getAnswerList" :key="index">{{item}}</li>
                        </div>
                    </ol>
                </div>
            </div>
            <hr>
            <div class="saveButtons">
                <button class="saveToList"  type="submit">Add Question</button>
                <button type="button" @click="showHidePreview()" class="saveToList spacing">Preview</button>
                <button type="button" @click="saveSurvey()" class="saveToList spacing green">Save Survey</button>
            </div>
        </form>
    </div>
</template>

<script>
import Spinner from "../spinner/Spinner";
import Notify from "./Notification";
export default {
    props:['surveySaveError'],
    data(){
        return {
            pickedAnswerType:'',
            title:'',
            question:'',
            answer:'',
            titleNotCompleted:false,
            aboutNotCompleted:false,
            questionNotAdded:false,
            conditionNotMet: false,
            answerNotSelected: false,
            noAnswer: false,
            notify: false,
            about:'',
        }
    },
    components:{
        Spinner,
        Notify
    },
    computed:{
        getAnswerList(){
            return this.$store.getters.getAnswerList;
        },
        getServerRequeestError(){
            return this.$store.getters.getServerRequeestError;
        },
    },
    methods:{
        saveSurvey(){
            this.$emit('saveSurvey');
        },
        showHidePreview(){
            this.$store.commit({type:'showPreview'});
        },
        updateTitle(){
            this.$store.commit({type:'updateTitle', title:this.title});
        },
        updateAbout(){
            this.$store.commit({type:'updateAbout', about:this.about});
        }
        ,
        addQuestionToList(){
            this.titleNotCompleted = this.title.length === 0  ? true : false;
            this.aboutNotCompleted = this.about.length === 0  ? true : false;
            this.questionNotAdded = this.question.length === 0 ? true : false;
            this.conditionNotMet = this.getAnswerList.length < 2  && (this.pickedAnswerType === 'mineOne' || this.pickedAnswerType === 'mineMultiple') ? true : false;
            this.answerNotSelected = this.pickedAnswerType.length === 0 ? true : false;

            if(this.titleNotCompleted || this.aboutNotCompleted || this.questionNotAdded || this.conditionNotMet || this.answerNotSelected){
                return false;
            }
            this.notify = true;
            const timeNotify = setTimeout( () => {
                this.notify = false;
            }, 2000);
            this.$store.commit({ type:'addQuestionToList', pickedAnswerType:this.pickedAnswerType, title:this.title, about:this.about, question:this.question})
            this.titleNotCompleted=false;
            this.aboutNotCompleted=false;
            this.questionNotAdded=false;
            this.answerNotSelected = false;
            this.conditionNotMet = false;
            this.question = '';
        },
        addAnswers(){
            if(this.answer.length === 0){
                this.noAnswer = true;
                return false;
            }
            this.noAnswer = false;
            this.conditionNotMet = false;
            this.$store.commit({type:'addAnswers', answer:this.answer})
            this.answer = '';
        }
    },
}
</script>

<style scoped>
.ErrorDesign{
    position:absolute;
    width:100%;
    text-align: center;
    top:170px;
    color:red;
    left:50%;
    transform: translateX(-50%);
    font-size:1.2rem;
    font-weight: 900;
}
.styleH1{
    color:#c06014;
}
.noQuestionAdded{
    background-color: #f54748;
    padding:10px 60px;
    margin:20px 0;
    color:white;
    position:absolute;
    z-index: 3000;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
}
.aboutButtonPositioning{
    width:100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.inputAndButton{
    display: flex;
    align-items: center;
}
p{
    margin:0;
}
.addQuestionButton{
    position: fixed;
    left:35%;
    top:50px;
}
.errorMessage{
    color:red;
}
textarea{
    border:1px solid #dddddd;
    outline: none;
    resize: none;
}
.answersList{
    width:100%;
    border:1px solid #dddddd;
    min-height: 80px;
    overflow-wrap: break-word;
}

.answerForm{
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
}
.saveButtons{
    width:80%;
    display: flex;
}
.actionButton{
    outline: none;
    margin:10px 0;
    width:100px;
    height:30px;
    color:#eeeeee;
    cursor: pointer;
    transition: .1s ease-in-out;
    background:#00adb5;
}
.actionButton:hover{
    outline: none;
    margin:10px 0;
    width:100px;
    height:30px;
    color:#eeeeee;
    cursor: pointer;
    transition: .1s ease-in-out;
    background:#02787e;
}
.saveToList{
    outline: none;
    margin:10px 0;
    width:150px;
    height:30px;
    color:#eeeeee;
    border-radius: 3px;
    cursor: pointer;
    transition: .1s ease-in-out;
    background:#02787e;
}
.saveToList:hover{
    outline: none;
    margin:10px 0;
    width:150px;
    height:30px;
    color:#eeeeee;
    border-radius: 3px;
    cursor: pointer;
    transition: .1s ease-in-out;
    background:#05595e;
}
.bdy{
    width:100%;
    height:100%;
    box-sizing: border-box;
}
.warpperOfLine{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
#selectAnswerType{
    margin:10px 0;
    border:1px solid #dddddd;
}
.answerWrapper{
    display: flex;
    flex-direction: column;
    width:80%;
    margin-top:50px;
}
input{
    border:1px solid #dddddd;
    height:30px;
    width:100%;
    outline: none;
    color:rgb(97, 95, 95);
}
select{
    height: 30px;
    outline: none;
}
.wrapperOfQuestions{
    margin-top: 100px;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 50px;
}
input, select, textarea{
   font-family: 'Montserrat', sans-serif;
}

.spacing{
    margin: 10px 20px;
}
.green{
    background: #5dd186;
    margin-left:0;
}
.spacing:hover{
    margin: 10px 20px;
}
.green:hover{
    margin-left:0;
    background: #3a8f58;
}
.fade-enter-active, .fade-leave-active{
	transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
	opacity: 0
}

@media only screen and (max-width:450px) {
    .ErrorDesign{
        font-size: 1rem;
    }
    .saveButtons{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .green {
        width:100%;
    }
    .spacing{
        width:100%;
        margin:10px 0;
    }
    .saveToList{
        width:100%;
    }
    .green:hover {
        width:100%;
    }
    .spacing:hover{
        width:100%;
        margin:10px 0;
    }
    .saveToList:hover{
        width:100%;
    }
    .actionButton{
        margin:0;
        width:100%;
    }
    .actionButton:hover{
        width:100%;
        margin:0;
    }
    .inputAndButton[data-v-19470022] {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
}

</style>

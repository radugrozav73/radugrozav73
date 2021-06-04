<template>
    <div class="bodyOfPreview">
        <div @click="showHidePreview()" class="closeButton">
            <div class="li1"></div>
            <div class="li2"></div>
        </div>
        <div class="titleAndAbout">
            <h2>{{getQuestionList.title}}</h2>
            <p class="aboutBox">{{getQuestionList.about}}</p>
            <div v-show="showEditInput">
                <span>Edit:</span>
                <input ref="editinput" @keydown.enter="saveEdit()" v-model="editedObject" type="text" >
                <button class="saveEditButton" @click="saveEdit()">Save</button>
            </div>
            <div class="warningAndButtons" v-if="showDeleteWarning">
                <div class="warningClass">
                    If you delete this answer, the question will be deleted!
                    <legend class="legenda">(If you delete an answer and the number of remaining answers is lower than 2, the question will be removed due to lack of answers.)</legend>
                </div>
                <div>
                    <button class="deleteAnywayButton" @click="deleteAnyway()" >Delete</button>
                    <button class="cancelButton" @click="cancelDeletion()">Cancel</button>
                </div>
            </div>
        </div>
        <div v-if="getQuestionList.list.length > 0" class="bdy">
            <div v-for="(item, index) in getQuestionList.list" :key="index" class="listOfQuestions">
                <div class="questAndAnswer">
                    <div class="titleAndQuestion">
                        <p class="title">Question nr. {{index + 1}}:</p>
                        <div class="questionAndDeleteButton">
                            <p class="questionStyle">{{item.question}}</p>
                            <div class="answerStyle">
                                <span class="deleteButton" @click="deleteQuestion(index)">Delete</span>
                                <span class="editButton" @click="editQuestion(index, item.question)">Edit</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.pickedAnswerType === 'mineOne' || item.pickedAnswerType === 'mineMultiple'" class="titleAndQuestion">
                        <p class="title">Answers list:</p>
                        <ol class="answers">
                            <li class="answerAndDelete" v-for="(answer, indexAnswers) in item.answersList" :key="indexAnswers">
                                <p class="answerStyle">{{answer}}</p>
                                <span class="deleteButton" @click="deleteAnswer(index, indexAnswers)">Delete</span>
                                <span class="editButton" @click="editAnswer(index, indexAnswers, answer)">Edit</span>
                            </li>
                        </ol>
                    </div>
                    <div v-if="item.pickedAnswerType  === 'yesOrNo'" class="yesOrNoClass">
                        <p class="title">Answers type: Yes or No</p>
                    </div>
                    <div v-if="item.pickedAnswerType  === 'freeToWrite'" class="yesOrNoClass">
                        <p class="title">Answers type: Subject writes his own answers</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bdyOfEmpty" v-if="getQuestionList.list.length === 0">
            <p>Question list is empty :(</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            showDeleteWarning:false,
            editedObject:'',
            showEditInput:false,
            answerIndex:null,
            typeOfEdit:'',
            questionIndex:null,
        }
    },
    computed:{
        getAnswerList(){
            return this.$store.getters.getAnswerList;
        },
        getQuestionList(){
            return this.$store.getters.getQuestionList;
        }
    },
    methods:{
        showHidePreview(){
            this.$store.commit({type:'showPreview'});
        },
        saveEdit(){
            this.typeOfEdit === 'answer' ? this.$store.commit({type:'updateAnswers', index:this.questionIndex, answerIndex:this.answerIndex, editedObject:this.editedObject}) : '';
            this.typeOfEdit === 'question' ? this.$store.commit({type:'updateQuestion', index:this.questionIndex, editedObject:this.editedObject}): '';
            this.showEditInput = false;
        },
        editQuestion(index, question){
            this.typeOfEdit = '';
            this.editedObject = question;
            this.typeOfEdit = this.showEditInput ? null: 'question';
            this.questionIndex = this.showEditInput ? null : index;
            this.showEditInput = !this.showEditInput;
            this.$nextTick(() => this.$refs.editinput.focus())
        },
        editAnswer(index, answerIndex, answer){
            this.editedObject = answer;
            this.typeOfEdit = '';
            this.typeOfEdit = this.showEditInput ? null:'answer';
            this.answerIndex = this.showEditInput ?  null : answerIndex;
            this.questionIndex = this.showEditInput ? null : index;
            this.showEditInput = !this.showEditInput;
            this.$nextTick(()=>this.$refs.editinput.focus());
        },
        deleteAnyway(){
            this.$store.commit({type:'deleteAnswer', index:this.questionIndex, answersIndex:this.answerIndex});
            this.answerIndex = null;
            this.questionIndex = null;
            this.showDeleteWarning = false;
        },
        cancelDeletion(){
            this.answerIndex = null;
            this.questionIndex = null;
            this.showDeleteWarning = false;
        },
        deleteAnswer(index, answersIndex){
            this.answerIndex = answersIndex;
            this.questionIndex = index;
            this.showDeleteWarning = this.getQuestionList.list[this.questionIndex].answersList.length === 2 ?  true : false
            this.showDeleteWarning ? '' : this.$store.commit({type:'deleteAnswer', index:this.questionIndex, answersIndex:this.answerIndex})
        },
        deleteQuestion(index){
            this.$store.commit({type:'deleteQuestion', index:index})
        },
    }
}
</script>

<style scoped>
.input{
    border-radius: 2px;
    outline: none;
    height: 18px;
    border: none;
    font-family: 'Montserrat', sans-serif;
}
.saveEditButton{
    width: 60px;
    outline: none;
    border: none;
    background-color: #00adb5;
    cursor: pointer;
    color: white;
    border-radius: 2px;
}
.closeButton{
    position: absolute;
    top:30px;
    left:30px;
    height:40px;
    width:40px;
    cursor: pointer;
    display: grid;
    place-items: center;
}
.li1{
    height:2px;
    width:100%;
    transform: rotate(-45deg);
    background: white;
    position: relative;
    top:10px;
}
.li2{
    height:2px;
    width:100%;
    transform: rotate(45deg);
    background: white;
    position: relative;
    bottom:10px;
}
.cancelButton{
    background-color: #eeeeee;
    outline: none;
    cursor: pointer;
    font-family: 'Robo Mono', monospace;
    transition: .3s ease;
}
.cancelButton:hover{
    background-color: #b8b3b3;
    outline: none;
    cursor: pointer;
    transition: .3s ease;
    font-family: 'Robo Mono', monospace;
}
.deleteAnywayButton{
    background-color: #e28f83;
    outline: none;
    color: white;
    cursor: pointer;
    transition: .3s ease;
    font-family: 'Robo Mono', monospace;
}
.deleteAnywayButton:hover{
    background-color: #c7796d;
    transition: .3s ease;
    outline: none;
    color: white;
    cursor: pointer;
    font-family: 'Robo Mono', monospace;
}
.warningAndButtons{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.warningClass{
    display: flex;
    justify-content: center;
    align-items: center;
    color:#e28f83;
    width:90%;
    text-align: center;
    flex-direction: column;
}
.aboutBox{
    width:80%;
    font-size: .8rem;
    text-align: center;
}
.titleAndAbout{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.yesOrNoClass{
    font-size:.8rem;
}
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #383737;
}
::-webkit-scrollbar
{
	width: 6px;
	background-color: #383737;
}
::-webkit-scrollbar-thumb
{
	background-color: #ffffff;
}
h2{
    text-align: center;
    text-transform: capitalize;
}
.bodyOfPreview{
    position: fixed;
    height:100vh;
    width:500px;
    background-color: #393e46;
    right:0;
    top:0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color:#eeeeee;
    z-index: 4000;
}
.bdy{
    height:60%;
    width:100%;
    overflow: auto;
}
.bdyOfEmpty{
    height:60%;
    width:100%;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.listOfQuestions{
    display: flex;
    align-items: center;
    flex-direction: column;
    width:80%;
    margin:5px auto;
    padding:10px;
    overflow-y: auto;
}

.questionAndDeleteButton{
    width:90%;
}
.titleAndQuestion{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.legenda{
    font-size: .7rem;
    color:#00adb5;
    text-align: center;
}
.title{
    width:100%;
}
p{
    padding: 0;
    margin: 0;
    overflow-wrap: break-word;
}
.deleteAnswer{
    padding:0 10px;
}
.questionStyle{
    width:90%;
}
.answerStyle{
    width:90%;
}
.questAndAnswer{
    width:100%;
}
.answerAndDelete{
    width:90%;
}
.deleteButton{
    padding:0 10px;
    font-size:.7rem;
    color:#c06014;
    width:60px;
    cursor: pointer;
}
.editButton{
    padding:0 10px;
    font-size:.7rem;
    color:#00adb5;
    width:60px;
    cursor: pointer;
}
.answerAndDelete>p{
    margin:0;
}
.actionButtons{
    display: flex;
    padding:0 10px;
    font-size:.7rem;
    width:100%;
}
.actionButtons>p{
    padding:0 10px;
    font-size: .8rem;
    cursor: pointer;
}
.answers{
    display: flex;
    flex-direction: column;
    width:90%;
    font-size: .8rem;
    margin:0;
}
.answers>span{
    display: flex;
    align-items: center;
}
.listOfQuestions>p{
    margin:0;
    padding:0;
}
@media only screen and (max-width:600px) {
    .bodyOfPreview{
        width:350px;
    }
    .listOfQuestions{
        width:350px;
    }
}
@media only screen and (max-width:400px) {
    .bodyOfPreview{
        width:100%;
    }
    .listOfQuestions{
        width:100%;
    }
}
</style>
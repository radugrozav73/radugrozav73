<template>
    <div class='yesOrNoBdy'>
        <p class="questionTitle">{{this.answerIndex + 1}}. {{item.question}}</p>
        <p  class="answerStyle">Answers:</p>
        <div class="answerStyle">
            <p> - Yes <br> <span class="pickRate">({{getResults('yes')}}% -pick rate)</span></p>
            <p> - No <br> <span class="pickRate">({{getResults('no')}}% -pick rate)</span></p>
        </div>
        <div class="inputAndLabel">
            <p class="searchTitle">List of answers given by people:</p>
            <label>Search by mail</label>
            <input placeholder="Search by mail..." type="text" v-model="filterByMail" name="">
        </div>
        <div class="listOfAnswers">
            <div class="containerOFAnswers" v-for="(el, index) in getList" :key="index">
                <div class="answers">
                    <div class="arangeAnswers">
                        {{index + 1}}  <span class="spacingSpan">{{el.survey_answers[answerIndex]}}</span>
                    </div>
                </div>
                <p class="mail"> {{el.email}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            filterByMail:''
        }
    },
    computed:{
        getList(){
            return this.filterByMail === '' ? this.finished : this.finished.filter( el => el.email.includes(this.filterByMail));
        }
    },
    props:['finished', 'item', 'answerIndex'],
    methods:{
        getResults(item){
            let oc = 0;
            this.finished.map( el => el.survey_answers[this.answerIndex]  === item ? oc++ : '');
            return Number.isInteger(oc/this.finished.length*100) ? (oc/this.finished.length*100) : (oc/this.finished.length*100).toFixed(2);
        }
    },
    mounted(){
    }
}
</script>

<style scoped>
.pickRate{
    color:#03256c;
}
.searchTitle{
    color:#393e46;
}

.inputAndLabel{
    width:95%;
    margin:auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.inputAndLabel>input{
    border:none;
    border-bottom:1px solid #231e23;
    border-radius: 4px;
    color: #231e23;
    outline: none;
    padding:10px 0;
    margin:15px 0;
}
.questionTitle{
    font-size:1.3rem;
    margin-left:20px;
    color:#393e46;
}
.answerStyle{
    margin-left:20px;
}
.listOfAnswers::-webkit-scrollbar-track
{
	border-radius: 10px;
	background-color: inherit;
}
.listOfAnswers::-webkit-scrollbar
{
	width: 4px;
	background-color: #eeeeee;
}
.listOfAnswers::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-color: #393e46;
}
.yesOrNoBdy{
    width:90%;
}
.eachQuestionContainer{
    margin:25px 0;
    border-radius: 10px;
    width:60%;
}
.listOfAnswers{
    width:95%;
    margin:auto;
    max-height: 400px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 0;
    border-top:none;
    margin-bottom: 20px;
}
.arangeAnswers{
    display: flex;
    align-items: center;
    justify-content: center;
}
.arangeAnswers>p {
    margin:0 10px;
}
.answers{
    display: flex;
    color:#393e46;
}
.containerOFAnswers{
    font-size: .7rem;
    padding:0 20px;
    font-family: 'Montserrat', sans-serif;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    display: flex;
}
.containerOFAnswers > p{
    color:#333333;
}
.containerOFAnswers > .mail{
    color:#03256c;
    font-size:.8rem;
    overflow-wrap: break-word;
    width: 100%;
}
.spacingSpan{
    margin-left:5px;
}
@media only screen and (max-width:600px){
    .containerOFAnswers{
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        display: flex;
    }
}
</style>
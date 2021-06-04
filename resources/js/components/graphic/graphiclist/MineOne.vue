<template>
    <div class="eachQuestionContainer">
        <p class="questionTitle">{{this.answerIndex + 1}}. {{item.question}}</p>
        <p  class="answerStyle">Answers:</p>
        <div class="answerStyle" v-if="item.pickedAnswerType === 'mineOne'">
            <div class="fixP" v-for="(item1, index1) in item.answersList" :key="index1">
                <p> - {{item1}} <br> <span class="pickRate">({{getResults(item1)}}% -pick rate)</span></p>
            </div>
        </div>
        
        <div class="inputAndLabel">
            <p class="searchTitle">List of answers given by people:</p>
            <label>Search by mail</label>
            <input  placeholder="Search by mail..." type="text" v-model="filterByMail" name="" >
        </div>
        <div class="listOfAnswers">
            <div class="containerOFAnswers" v-for="(el, index) in getList" :key="index">
                    <div class="answers">
                        <div class="arangeAnswers">
                            <p>{{index + 1}}</p>
                            {{el.survey_answers[answerIndex]}}
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
    props:['item', 'finished', 'answerIndex'],
    methods:{
        getResults(item){
            let oc = 0;
            this.finished.map( el => el.survey_answers[this.answerIndex]  === item ? oc++ : '');
            return Number.isInteger(oc/this.finished.length*100) ? (oc/this.finished.length*100) : (oc/this.finished.length*100).toFixed(2);
        }
    },
}
</script>

<style scoped>
.searchTitle{
    color:#393e46;
}
.pickRate{
    color:#03256c;
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
.fixP>p{
    margin:0;
}
.questionTitle{
    font-size:1.3rem;
    color:#393e46;
    margin-left:20px;
}
.answerStyle{
    margin-left:20px;
    color:#333333;
}
.answerStyle>p{
    margin:0;
}
.eachQuestionContainer{
    border-radius: 10px;
    margin:25px 0;
    width:90%;
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
.listOfAnswers{
    width:95%;
    max-height: 400px;
    overflow: auto;
    font-size:.7rem;
    margin:auto;
    border-top:none;
}
.arangeAnswers{
    display: flex;
    justify-content: center;
}
.arangeAnswers>p {
    margin:0 10px;
    color: #333333;
}
.answers{
    display: flex;
    justify-content: center;
    align-items: center;
    color:#393e46;
}
.containerOFAnswers{
    background-color: inherit;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    display: flex;
    font-size:.7rem;
    padding:0 20px;
    font-family: 'Montserrat', sans-serif;
}
.containerOFAnswers>p{
    color:#393e46;
}
.containerOFAnswers>.mail{
    color:#03256c;
    font-size:.8rem;
    overflow-wrap: break-word;
    width: 100%;
}
</style>
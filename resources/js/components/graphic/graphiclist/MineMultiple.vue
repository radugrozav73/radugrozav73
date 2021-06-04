<template>
            <div class="eachQuestionContainer">
                <p class="questionTitle">{{this.answerIndex + 1}}. {{item.question}}</p>
                <p  class="answerStyle">Answers:</p>
                <div  class="answerStyle" v-for="(item3, index3) in item.answersList" :key="index3">
                    <p> - {{item3}} -<br> <span class="pickRate">({{getPercents(item3, index3)}}% pick rate)</span></p>
                </div>
                
                <div class="inputAndLabel">
                    <p class="searchTitle">List of answers given by people:</p>
                        <label>Search by mail</label>
                        <input placeholder="Search by mail..." v-model="filterMail" type="text">
                </div>
                <div class="listOfAnswers">
                    <div class="answerDisplay" v-for="(item1, index1) in getList" :key="index1">
                        <div class="answers">
                            <p>{{index1 + 1}}</p>
                            <div>
                                <div class="arangeAnswers" v-for="(answer, index2) in item1.survey_answers[answerIndex]" :key="index2">
                                    <p>{{answer}}</p>
                                </div>
                            </div>
                        </div>
                        <p class="mail">{{item1.email}}</p>
                    </div>
                </div>
            </div>
</template>

<script>
export default {
    data(){
        return {
            filterMail:'',
        }
    },
    computed:{
        getList(){
            return this.filterMail === '' ? this.finished : this.finished.filter( el => el.email.includes(this.filterMail));
        }
    },
    props:['item', 'finished', 'answerIndex'],
    methods:{
        getPercents(finishedItem, index){
            let oc = 0;
            this.finished.map(el => el.survey_answers[this.answerIndex].map( el => {
                finishedItem === el ? oc++:'';
            }));
            return Number.isInteger(oc/this.finished.length * 100) ? (oc/this.finished.length * 100) :(oc/this.finished.length*100).toFixed(2);
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
.questionTitle{
    font-size:1.3rem;
    margin-left:20px;
    color:#393e46;
}
.answerStyle{
    margin-left:20px;
    color:#333333;
}
.answerStyle>p{
    margin:0;
}
.listOfAnswers{
    width:95%;
    max-height: 400px;
    margin:auto;
    overflow: auto;
    border-bottom-left-radius: 10px;
    border-top: none;
}
.answers{
    display: flex;
    color: #393e46;
}
.answers>p, .answers>div{
    margin-top: 10px;
    margin-left:10px
}
.arangeAnswers{
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.answerDisplay{
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    display: flex;
    font-size: .7rem;
    font-family: 'Montserrat', sans-serif;
    padding:0 20px;
    max-height: 400px;
    color:#333333;
}
.answerDisplay>.mail{
    color:#03256c;
    font-size:.8rem;
    overflow-wrap: break-word;
    width: 100%;
}
.arangeAnswers>p{
    margin:0;
}
.eachQuestionContainer{
    border-radius: 10px;
    width:90%;
    margin:25px 0;
}

@media only screen and (max-width:600px){
    .answerDisplay{
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        display: flex;
    }
}
</style>
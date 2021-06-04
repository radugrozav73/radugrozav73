<template>
    <div class="eachQuestionContainer">
        <div >
            <p class="questionTitle">{{this.answerIndex + 1}}. {{item.question}}</p>
            <div class="inputAndLabel">
                <p class="searchTitle">List of answers given by people:</p>
                        <label>Search by mail</label>
                        <input placeholder="Search by mail..." v-model="filterMail" type="text">
                </div>
            <div class="listOfAnswers">
                    <div class="answerDisplay" v-for="(item1, index1) in getList" :key="index1">
                        <p>{{index1+1}} <span class="spacingSpan">{{item1.survey_answers[answerIndex]}}</span></p>
                        <p class="mail">{{item1.email}}</p>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['item', 'finished', 'answerIndex'],
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
}
</script>

<style scoped>
.breakSpan{
    overflow-wrap: break-word;
    max-width: 100%;
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
    background-color: #ffffff;
    padding:10px 0;
    margin:15px 0;
}
.listOfAnswers::-webkit-scrollbar-track
{
	border-radius: 10px;
	background-color: transparent;
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
    color:#8b8a8a;
    margin-left:20px;
}
.eachQuestionContainer{
    border-radius: 10px;
    margin:25px 0;
    width:90%;
}
.listOfAnswers{
    width:95%;
    margin:auto;
    max-height: 400px;
    overflow:auto;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 0;
    border-top:none;
}
.answerDisplay{
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    display: flex;
    font-size: .7rem;
    padding:10px 20px;
    font-family: 'Montserrat', sans-serif;
}
.answerDisplay>p{
    margin:5px 0;
    color:#333333;
    overflow-wrap: break-word;
    width: 100%;
}
.answerDisplay>.mail{
    color:#03256c;
    font-size:.8rem;
    overflow-wrap: break-word;
    width: 100%;
}
.spacingSpan{
    margin-left:5px;
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
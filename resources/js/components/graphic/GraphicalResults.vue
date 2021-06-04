<template>
    <div class="bdy">
        <div v-if="!fetchedData.finished">
            <Spinner/>
        </div>
        <div v-if="fetchedData.finished && fetchedData.finished.length === 0">
            <div class="notFoundElement">
                <svg xmlns="http://www.w3.org/2000/svg" width="200px" viewBox="0 0 24 24"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg>
                Looks like nobody completed the survey yet.
            </div>
        </div>
        <div v-if="fetchedData.finished && fetchedData.finished.length > 0">
            <div class="titleAndAbout">
                <h2>{{this.fetchedData.unfinished[0].title}}</h2>
                <p>{{this.fetchedData.unfinished[0].about}}</p>
            </div>
            <br>
            <div class="containerWrapper">
                <div class="questionContainer" v-for="(item, index) in fetchedData.unfinished[0].list_of_questions" :key="index">
                    <YesOrNo :finished="fetchedData.finished" :answerIndex="index" :item="item" v-if="item.pickedAnswerType === 'yesOrNo'"/>
                    <MineOne :finished="fetchedData.finished" :answerIndex="index" :item="item" v-if="item.pickedAnswerType === 'mineOne'"/>
                    <MineMultiple :finished="fetchedData.finished" :answerIndex="index" :item="item" v-if="item.pickedAnswerType === 'mineMultiple'"/>
                    <FreeToWrite :finished="fetchedData.finished" :answerIndex="index" :item="item" v-if="item.pickedAnswerType === 'freeToWrite'"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import MineMultiple from "./graphiclist/MineMultiple";
import FreeToWrite from "./graphiclist/FreeToWrite";
import MineOne from "./graphiclist/MineOne";
import YesOrNo from "./graphiclist/YesORNo";
import Spinner from "../spinner/Spinner";

export default {
    data(){
        return{
            fetchedData:{}
        }
    },
    components:{
        FreeToWrite,
        MineMultiple,
        MineOne,
        YesOrNo,
        Spinner
    },
    mounted(){
        axios.post('/api/getgraphresults', {key:this.$route.params.id}, {headers:{Authorization:'Bearer ' + localStorage.getItem('token')}})
            .then(res => {
                this.fetchedData = res.data;
                console.log(this.fetchedData);
            }).catch();
    }
}
</script>

<style scoped>
.notFoundElement{
    width:100%;
    height:80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.titleAndAbout{
    display: flex;
    width:60%;
    margin:auto;
    flex-direction: column;
    color:#333333;
}
.line{
    width:80%;
    border-bottom: 2px solid #dddddd;
}
.bdy{
    margin-top:100px;
}
.questionContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    border:10px;
    width:60%;
}
.containerWrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
@media only screen and (max-width:800px){
    .titleAndAbout{
        width:85%;
    }
    .titleAndAbout>p{
        font-size:.8rem;
    }
    .questionContainer{
        width:100%;
    }
}
</style>
<template>
    <div>
        <Spinner v-if="showSpinner || getShowSpinner || !getIsLogged" />
        <div class="bdyComponent" v-if="getIsLogged && getQuestionsFromDB.length === 0">
            <h1>You do not have any survey created yet</h1>
        </div>
        <transition name="fade" mode="in-out">
            <div :key="'1'" v-if="getServerRequeestError" class="ErrorDesign" >
                <div class="backgroundOfError">
                    Sorry, server does not respond, please try again.
                </div>
            </div>
        </transition>
        <div class="delimitBody" v-if="getIsLogged && getQuestionsFromDB.length > 0">
            <div :class="[deleteSuccess ? 'addNotifier': 'hideNotifier']"><p>Successfully deleted</p></div>
            <div :class="[deleteError ? 'addNotifier': 'hideNotifier']"><p>Error ocurred, could not delete</p></div>
            <h1>Your surveys</h1>
            <div class="bdyComponent">
                <div class="wrapperOfGridElements"  v-for="(item, index) in getQuestionsFromDB" :key="index">
                    <div  class="eachElement">
                        <h3>{{item.el.title}}</h3>
                        <p>{{item.el.about}}</p>
                    </div>
                    <div class="actionbuttons">
                        <transition class="absoluteCopyButton" v-if="!item.copied" name="fade" mode="out-in"> 
                            <button class="linkButton" :key="'notcopied'"  @click="generateLink(index)">Share</button>
                        </transition>
                        <transition class="absoluteCopyButton" v-if="item.copied" name="fade" mode="out-in">
                            <button class="linkButton" :key="'cipied'" >Copied</button>
                        </transition>
                        <button class="actionButtonPositions" @click="seeResults(item.el.survey_key)">See Results</button> 
                        <button class="actionButtonPositions deleteButton" @click="deleteSurvey(item.el.survey_key, item, index)" >Delete</button>
                    </div>
                </div>
            </div>
            <form v-if="getIsLogged" @submit.prevent class="backNextButtons">
                <button :disabled="getDisabledBackButton" @click="paginBack()">Back</button>
                <button :disabled="getDisabledNextButton" @click="paginNext()">Next</button>
            </form>            
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Spinner from "../spinner/Spinner";

export default {
    data(){
        return{
            selectedSurvey:'',
            modalStatus:false,
            hoverIndex:null,
            showSpinner:false,
            deleteSuccess:false,
            deleteError:false,
            backDisabled:false,
            nextDisabled:false,
            generatedLink:'',
        }
    },
    components:{
        Spinner,
    },
    computed:{
        getDisabledNextButton(){
            return this.$store.getters.getDisabledNextButton;
        },
        getDisabledBackButton(){
            return this.$store.getters.getDisabledBackButton;
        },
        getQuestionsFromDB(){
            return this.$store.getters.getQuestionsFromDB
        },
        getIsLogged(){
            return this.$store.getters.getIsLogged
        },
        getShowSpinner(){
            return this.$store.getters.getShowSpinner
        },
        getServerRequeestError(){
            return this.$store.getters.getServerRequeestError;
        }
    },
    methods:{
        seeResults(key){
            this.$router.push('/surveys/graph/' + key);
        },
        paginNext(){
            this.$store.dispatch({type:'nextPagination'});
        },
        paginBack(){
            this.$store.dispatch({type:'backPagination'});
        },
        deleteSurvey(key, item, index){
            this.showSpinner = true;
            axios.delete('/api/delete/survey/' + key, {headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res =>{
                this.$store.commit({type:'deleteSurvey', index:index})
                this.$store.dispatch({type:'attempt'}).then( () => {
                    this.showSpinner = false;
                    this.deleteSuccess = true;
                })
            setTimeout( () => {
                this.deleteSuccess = false;
            }, 3000)
        }).catch ( e => {
            this.showSpinner = false;
            this.deleteError = true;
            setTimeout( () => {
                this.deleteSurvey = false;
            }, 3000)
        })
        },
        generateLink(index){
            this.generatedLink = window.location.protocol +  '//' + window.location.host + '/list/show/' + this.getQuestionsFromDB[index].el.survey_key;
            this.$store.commit({type:'changeCopiedLink', index:index});
            navigator.clipboard.writeText(this.generatedLink);
        }
    }
}
</script>

<style scoped>
.backgroundOfError{
    border-radius: 5px;
    background-color: rgba(185, 148, 148, 0.436);
    padding:5px 10px;
    position:fixed;
    width:100%;
    text-align: center;
    top:170px;
    left:50%;
    transform: translateX(-50%);
}
.ErrorDesign{
    color:red;
    font-size:1.2rem;
    font-weight: 900;
}
.delimitBody{
    margin-top: 80px;
}
h1{
    color: #c06014;
    text-align: center;
    position: relative;
    top: 30px;
}
.deleteButton{
    color:red;
}
.backNextButtons{
    display: flex;
    justify-content: center;
    align-items: center;
}
.backNextButtons>button{
    margin:20px 30px;
    cursor: pointer;
    background: none;
    outline: none;
    border:1px solid black;
    border-radius: 10px;
    font-size:1.2rem;
    padding:5px 20px;
}
.addNotifier{
    position: fixed;
    bottom: 30px;
    left:30px;
    width:200px;
    height:60px;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color:white;
    background-color:#e93b81;
    transform: scale(1);
    transition: .3s ease-in-out;
}
.hideNotifier{
    position: fixed;
    bottom: 30px;
    left:30px;
    width:150px;
    height:30px;
    font-size: .8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color:white;
    background-color:#4aa96c;
    transform: scale(0);
    visibility: hidden;
    transition: .3s ease-in-out;
}
.actionbuttons{
    position: relative;
    bottom:10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.actionbuttons>.actionButtonPositions{
    cursor: pointer;
    margin:0 20px;
    background: none;
    outline: none;
    border: none;
    font-size:14px;
}
.eachElement{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: .3s ease;
    text-align: center;
}
.eachElementNoModal{
    transition: .3s ease;
    filter: blur(10px);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.eachElement > h3{
    font-size: .9rem;
    width:90%;
}
.eachElement > p{
    font-size: .8rem;
    width:90%;
    text-align: left;
}
.bdyComponent{
    margin-top:100px;
    min-height: 350px;
    display: grid;
    justify-content: center;
    align-items: flex-start;
    grid-template-columns: repeat(auto-fit, 400px);
    gap:15px;
}

.wrapperOfGridElements{
    min-height: 100px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    border:1px solid #dddddd;
    box-shadow: 1px 1px 22px 1px rgba(0, 0, 255, .1);
    transition: .3s ease;
    transform: scale(1);
    user-select: none;
}
.absoluteCopyButton{
    position: absolute;
}
.linkButton{
    cursor: pointer;
    padding:5px 10px;
    text-decoration: underline;
    border-radius: 8px;
    color:#709fb0;
    background: none;
    outline:none;
}
.wrapperOfGridElements::after{
    border-bottom: 2px solid #709fb0;
    position: absolute;
    content:'';
    width:0;
    bottom: 0;
    transition: .3s ease;
}

.wrapperOfGridElements:hover::after{
    border-bottom: 2px solid #709fb0;
    position: absolute;
    content:'';
    width:100%;
    bottom: 0;
    transition: .3s ease;
}
.fade-enter-active, .fade-leave-active{
	transition: opacity .5s
}
.fade-enter, .fade-leave-to{
	opacity: 0
}
@media only screen and (max-width:480px) {
    .bdyComponent{
        grid-template-columns: repeat(auto-fit, 300px);
    }
}
</style>
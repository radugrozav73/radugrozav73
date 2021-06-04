<template>
    <div>
        <Notify :notify="notify" :msg="'Saved to database.'"/>
        <Spinner v-if="getLogRgSpinner" />
        <MultipleQuestions :surveySaveError="surveySaveError" @saveSurvey="saveSurvey" />
        <Preview :class="[showPreview ? 'showPreview':'hidePreview']" />
    </div>
</template>

<script>
import MultipleQuestions from "./forms/MultipleQuestions";
import Preview from "./forms/ListPreview";
import axios from "axios";
import Spinner from "./spinner/Spinner";
import Notify from "./forms/Notification";

export default {
    components: {
        MultipleQuestions,
        Preview,
        Spinner,
        Notify
    },
    data(){
        return{
            notify:false,
            surveySaveError:false
        }
    },
    computed:{
        showPreview(){
            return this.$store.getters.getShowPreview;
        },
        getQuestionList(){
            return this.$store.getters.getQuestionList;
        },
        getLogRgSpinner(){
            return this.$store.getters.getLogRgSpinner;
        }
    },
    methods:{
        saveSurvey(){
            if(this.getQuestionList.list.length === 0 ){
                this.surveySaveError = true;
                setTimeout(() => {
                    this.surveySaveError = false;
                }, 2000);
                return;
            } else {
                this.$store.dispatch({type:'saveSurveyToDatabase'}).then( res => {
                    this.sendingData = false;
                    setTimeout( () => {
                        this.notify = true;
                        setTimeout(() => {
                            this.notify = false;
                        }, 2000)
                        setTimeout( () => {
                            this.$store.commit({type:'resetList'});
                            this.$router.push('/list/surveys');
                        },)
                    }, 1000)
                    })
            }
        },
        showHidePreview(){
            this.showPreview = !this.showPreview;
        }
    }
};
</script>

<style scoped>
.showPreview{
    transition: .3s ease-in-out;
    transform: translateX(0);
}
.hidePreview{
    transition: .3s ease-in-out;
    transform: translateX(100%);
}
.saveAndPreview{
    display: flex;
    justify-content: space-evenly;
    width:600px;
}
.circle{
    width:150px;
    height:20px;
    font-size:.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00adb5;
    transition: .3s ease-in-out;
    user-select: none;
    color: white;
    cursor: pointer;
}
.circle:hover{
    width:150px;
    color: white;
    height:20px;
    font-size: .9rem;
    cursor: pointer;
    transition: .3s ease-in-out;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00696f;
}
.saveButton{
    width:150px;
    height:20px;
    font-size: .9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4aa96c;
    transition: .3s ease-in-out;
    user-select: none;
    color: white;
    cursor: pointer;
}
.saveButton:hover{
    width:150px;
    height:20px;
    font-size: .9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #5dd186;
    transition: .3s ease-in-out;
    user-select: none;
    color: white;
    cursor: pointer;
}
</style>

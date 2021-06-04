<template>
    <div>
        <div class="upperbdy">
            <div class="leftBoxText">
                <h1>See what people <br> think about your ideeas.</h1>
                <p>Create Your Own surveys</p>
                <router-link class="createButton" to="/surveys/create">Create</router-link>
            </div>
            <SurveySVG class="positioningSVG" />
        </div>
    </div>
</template>

<script>
import SurveySVG from "./SurveyImageSVG";
export default {
    components:{
        SurveySVG
    }
}
</script>
<style scoped>

.createButton{
    padding:10px 40px;
    background-color: #2940d3;
    color:white;
    transition:.3s ease;
}
.createButton:hover{
    padding:10px 40px;
    background-color: #4158f1;
    color:white;
    transition:.3s ease;
}
.upperbdy{
    height:100vh;
    width:100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    justify-content: center;
    align-items: center;
}
.leftBoxText{
    width:400px;
    position: relative;
    bottom: 40px;
}
.positioningSVG{
    position: relative;
    right:40px;
}
@media only screen and (max-width:900px) {
    .positioningSVG{
        width:300px;
        right:0;
    }
}
@media only screen and (max-width:800px) {  
    .leftBoxText{
        left:0;
    }
    .upperbdy{
        display: flex;
        justify-content: center;
        flex-direction: column-reverse;
        align-items: center;
    }
}
@media only screen and (max-width:800px) {  
    .leftBoxText{
        width:100%;
        text-align: center;
    }
}

</style>
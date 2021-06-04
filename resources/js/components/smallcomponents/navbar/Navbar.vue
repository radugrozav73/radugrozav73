<template>
    <div>
        <Spinner v-if="getLogRgSpinner" />
        <div :class="hiddenMenu ? 'hiddenMenu':'hideIt'">
                <div class="listInHiddenMenu">
                    <p @click="showMenu()"><router-link  to="/">Home</router-link></p>
                    <p @click="showMenu()"><router-link  to="/list/surveys">My Surveys</router-link></p>
                    <p @click="showMenu()"><router-link  to="/surveys/create">Create Survey</router-link></p>
                </div>
            </div>
        <div class="navbarHidden">
            <div  class="hiddenMenuButton">
                <ul @click="showMenu()">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
            <nav class="navbar">
                <div class="lista">
                    <div class="routeLinksStyling">
                        <p><router-link class="hideLinks" to="/">Home</router-link></p>
                        <p><router-link class="hideLinks" to="/list/surveys">My Surveys</router-link></p>
                        <p><router-link class="hideLinks" to="/surveys/create">Create Survey</router-link></p>
                    </div>
                    <transition  name="fade"  mode="out-in">
                            <div v-if="getAfterLoginNotification === false" :key="'1'">
                                <div class="isLoggedInOrOut isLoggedIn" :key="'1'" v-if="!isLogged">
                                    <p><router-link to="/login">Log In</router-link></p>
                                    <p><router-link to="/register">Register</router-link></p>
                                </div>
                                <div class="isLoggedInOrOut isLoggedIn" :key="'2'" v-if="isLogged" >
                                    <p class="name">Radu Grozav</p>
                                    <p  class="loginLogoutPointer logout" @click="logout()" >Log Out</p>
                                </div>
                            </div>
                            <div  class="isLoggedIn" v-if="getAfterLoginNotification === true" :key="'2'" >
                                <p>Welcome, <span class="spaceWelcomeTagAndName">Radu Grozav </span></p>
                            </div>
                            <div  class="isLoggedIn" v-if="getAfterLogOutNotification === true" :key="'3'" >
                                <p>See You Later, <span class="spaceWelcomeTagAndName">Radu Grozav </span></p>
                            </div>
                    </transition>
                </div>
            </nav>
    </div>
</template>

<script>
import Spinner from "../../spinner/Spinner";
export default {
    data(){
        return {
            hiddenMenu:false,
            hasLoggedOff:false
        }
    },
    components:{
        Spinner
    },
    computed:{
        isLogged(){
            return this.$store.getters.getIsLogged;
        },
        getLogRgSpinner(){
            return this.$store.getters.getLogRgSpinner;
        },
        getAfterLoginNotification(){
            return this.$store.getters.getAfterLoginNotification;
        },
        getAfterLogOutNotification(){
            return this.$store.getters.getAfterLogOutNotification;
        }
        
    },
    methods:{
        showMenu(){
            document.querySelector('ul').classList.toggle('active');  
            !this.hiddenMenu ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto';
            this.hiddenMenu = !this.hiddenMenu
        },
        logout(){
            this.$store.dispatch({type:'userLogout'}).then( () => {
                    this.$route.path === '/' ? '': this.$router.push('/')
            });
        },
        closeMenu(){
            this.hiddenMenu = false;
        }
    }
}
</script>

<style scoped>
.routeLinksStyling{
    display: flex;
    justify-content: flex-start;
    width:100%;
    align-items: center;
}
.spaceWelcomeTagAndName{
    margin-left:10px;
}
.spaceGoodByeTagAndName{

}
.isLoggedIn{
    color:#488b8f;
    width:350px;
    text-align: center;
}

.hideWelcome{
    position: absolute;
    top:110px;
    left:50%;
    transform: translate(-50%);
    height:40px;
    width:200px;
    background-color: #b0eacd;
    display: flex;
    justify-content: center;
    align-items: center;
    color:White;
    border-radius: 6px;
    opacity: 0;
    transition: .3 ease;
}
.welcomeModal{
    position: absolute;
    top:130px;
    left:50%;
    transform: translate(-50%);
    height:40px;
    width:200px;
    background-color: #b0eacd;
    display: flex;
    justify-content: center;
    align-items: center;
    color:White;
    border-radius: 6px;
    opacity: 1;
    transition: .3 ease;
}
.hideIt{
    transform: translateX(-100%);
    transition: .3s ease;
    height:100vh;
    width:100%;
    top:0;
    left:0;
    background-color:#ffffff;
    position: fixed;
    z-index: 100;
    transition: .3s ease;
}
.hiddenMenu{
    height:100vh;
    width:100%;
    top:0;
    left:0;
    background-color:#ffffff;
    position: fixed;
    z-index: 100;
    transform: translateX(0);
    transition: .3s ease;
}
.listInHiddenMenu{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height:80%;
}
.listInHiddenMenu>p{
    margin:0;
}
.navbarHidden{
    display: none;
}
.hiddenMenuButton{
    position: fixed;
    z-index: 150;
    top:0;
}
ul{
    position: absolute;
    left:30px;
    width: 40px;  height: 40px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
}
ul li{
    list-style: none;
    position: absolute;
    transform: translateY(-50%);
    width: 70%;  height: 10px;
    background: #fb9300;
    transition: 1s;
}
ul li:nth-of-type(1){
    top: 30%;  left: 15%; 
    transition-delay: 1s; 
    opacity: 1; 
}
ul li:nth-of-type(2){
    top: 50%;  left: 15%; 
    transition-delay: 0s;   
}
ul li:nth-of-type(3){
    top: 70%;  right: 15%;
    transition-delay: 1s; 
    opacity: 1; 
}
ul.active li:nth-of-type(1){
    left: 100%;
    transition-delay: 0s;
    opacity: 0; 
}
ul.active li:nth-of-type(2){
    transform: translateY(-50%) rotate(405deg);
    transition-delay: .5s;
}
ul.active li:nth-of-type(3){
    right: 100%;
    transition-delay: 0s;
    opacity: 0; 
}

ul li:nth-of-type(2)::before{
    content: '';
    position: absolute;
    top: -150px;  left: 0;
    width: 100%;  height: 100%;
    background: #f54748;
    transform: rotate(90deg);
    transition: 1s;
    transition-delay: .5s;
}
ul.active li:nth-of-type(2)::before{
    top: 0; 
    transition-delay: 1s;
}
a {
    display: inline-block;
    padding: 15px 20px;
    position: relative;
    color:#52616b;
}
a:after{
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: #fb9300;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    cursor: pointer;
    width: 0;
}
a:hover:after { 
    width: 100%; 
    left: 0; 
}
.loginLogoutPointer{
    cursor: pointer;
}
.isLoggedInOrOut{
    display: flex;
    justify-content: space-evenly;
}
.name{
    padding:15px 20px;
    position: relative;
    color:#52616b;
}
.logout{
    padding:15px 20px;
    color:#52616b;
    position: relative;
}
.logout:after{
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: #fb9300;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    cursor: pointer;
    width: 0;
}
.logout:hover:after { 
    width: 100%; 
    left: 0; 
}
.lista{
    width:800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.navbar{
    width:100%;
    height:70px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top:0;
    z-index: 140;
    background-color: #ffffff;
    box-shadow: 0 4px 31px 0 #ab98ab;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
    background:transparent;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    background:transparent;
}
@media only screen and (max-width:1300px) {
    .lista{
        width:70%;
    }
}
@media only screen and (max-width:900px) {
    .lista{
        width:100%;
    }
}
@media only screen and (max-width:650px) {
    .lista{
        width:100%;
    }
    .hideLinks{
        display: none;
    }
    .navbarHidden{
        display: initial;
        position: fixed;
        z-index: 150;
    }
}
@media only screen and (min-width:650px) {
    .navbarHidden{
        display: none;
    }
    .hiddenMenu{
        display: none;
    }
}
</style>
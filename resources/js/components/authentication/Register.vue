<template>
    <div class="bdyOFRegister">
        <transition name="fade" mode="in-out">
            <div :key="'1'" v-if="getServerRequeestError" class="ErrorDesign" >
                <div class="backgroundOfError">
                    Sorry, server did not respond, please try again.
                </div>
            </div>
            <div :key="'2'" v-if="getLogORRegError" class="ErrorDesign" >
                <div class="backgroundOfError">
                    Email already exists, please try a different one.
                </div>
            </div>
        </transition>
        <Spinner v-if="getLogRgSpinner"/>
        <div >
            <h1>Register</h1>
            <form class="wrappper" @sucmit.prevent >
                <div class="data">
                    <label>Full Name:</label>
                    <input v-model="user.name" required type="text" placeholder="Your Name">
                </div>
                <div class="data">
                    <label>Email Address:</label>
                    <input v-model="user.email" required type="email" placeholder="Your Email">
                </div>
                <div class="data">
                    <label>Password:</label>
                    <input v-model="user.password" required type="password" placeholder="Your Email">
                </div>
                <div class="buttonPositionings">
                    <button class="loginButton" type="button" @click="registerUSer()">Register</button>
                    <router-link class="register" to='/login'>Log In if you have an account.</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Spinner from "../spinner/Spinner";

export default {
    data(){
        return {
            user:{
                email:'',
                password:'',
                name:''
            },
            hasLogged:false
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
        getServerRequeestError(){
            return this.$store.getters.getServerRequeestError;
        },
        getLogORRegError() {
            return this.$store.getters.getLogORRegError;
        }
    },
    methods:{
        registerUSer(){
            return this.$store.dispatch({type:'userRegister', user:this.user}).then( () =>  {
                this.hasLogged = true;
                setTimeout(() => {
                    this.hasLogged = false;
                }, 3000)
            });
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

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active
{
 -webkit-box-shadow: 0 0 0 30px white inset !important;
}
.data{
    display: flex;
    flex-direction: column;
}
.data > input{
    outline: none;
    border-bottom: 1px solid #dddddd;
    height:45px;
}
.register{
    text-decoration: underline;
}
.buttonPositionings{
    display: flex;
    flex-direction: column;
}
.loginButton{
    height:30px;
    width:80px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #474f85;
    color:white;
    margin:20px 0;
}
.bdyOFRegister{
    height:100vh;
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
}
.wrappper{
  width: 450px;
  background: #fff;
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}

@media only screen and (max-width:450px){
    .wrapper{
        width:300px;
    }
}
@media only screen and (max-width:350px){
    .loginStyle>h1{
        margin-left:20px;
    }
}
</style>
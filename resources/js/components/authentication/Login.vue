<template>
    <div>
        <Spinner v-if="getLogRgSpinner"/>
        <transition name="fade" mode="in-out">
            <div :key="'1'" v-if="getServerRequeestError" class="ErrorDesign" >
                <div class="backgroundOfError">
                    Sorry, server does not respond, please try again.
                </div>
            </div>
            <div :key="'2'" v-if="getLogORRegError" class="ErrorDesign" >
                <div class="backgroundOfError">
                    Sorry, wrong email or password, please try again.
                </div>
            </div>
        </transition>
        <div class="loginbdy">
            <div class="loginStyle">
                <h1>Log In</h1>
                <form class="wrappper" @sucmit.prevent > 
                    <div class="data">
                        <label>Email</label>
                        <input v-model="user.email" type="email" required>
                    </div>
                    <div class="data">
                        <label>Password</label>
                        <input v-model="user.password" type="password" required>
                    </div>
                    <div class="buttonPositionings">
                        <button class="loginButton" type="button" @click="userLogin()">Log In</button>
                        <router-link class="register" to='/register'>Register if you do not have an account.</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from "../spinner/Spinner.vue";
export default {
    data(){
        return {
            user:{
                email:'',
                password:''
            },
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
        userLogin(){
            return this.$store.dispatch({type:'userLogin', user:this.user}).then( () => this.$router.push('/'));
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
.loginbdy{
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

@media only screen and (max-width:500px){
    .wrappper{
        width:300px;
    }
}
@media only screen and (max-width:350px){
    .loginStyle>h1{
        margin-left:20px;
    }
}
</style>
import Home from "./components/Home.vue";
import ListOfSurveys from "./components/ListOFSurveys.vue";
import Creation from "./components/SurveyCreator.vue";
import Login from "./components/authentication/Login.vue";
import Register from "./components/authentication/Register.vue";
import Survey from "./components/list/Survey.vue";
import Graph from "./components/graphic/GraphicalResults.vue"
import Store from "./store"

export default {
    mode:'history',

    routes: [
        {
            path:'/',
            name:'Home',
            component:Home,
        },
        {
            path:'/list/surveys',
            name:'ListOfSurveys',
            component:ListOfSurveys,
            beforeEnter:(to, from, next) => {
                if(!Store.state.isLogged){
                    next('/login');
                } else {
                    next()
                }
            }
        },
        {
            path:'/surveys/create',
            name:'SurveysCreate',
            component:Creation,
            beforeEnter:(to, from, next) => {
                if(!Store.state.isLogged){
                    next('/login');
                } else {
                    next()
                }
            }
        },
        {
            path:'/login',
            name:'Login',
            component:Login,
            beforeEnter:(to, from, next) => {
                if(Store.state.isLogged){
                    next('/');
                } else {
                    next()
                }
            }
        },
        {
            path:'/register',
            name:'Register',
            component:Register,
            beforeEnter:(to, from, next) => {
                if(Store.state.isLogged){
                    next('/');
                } else {
                    next()
                }
            }
        },
        {
            path:'/list/show/:id',
            name:'Survey',
            component:Survey,
            beforeEnter:(to, from, next) => {
                if(!Store.state.isLogged){
                    next('/login');
                } else {
                    next()
                }
            }
        },
        {
            path:'/surveys/graph/:id',
            name:'Graph',
            component:Graph,
            beforeEnter:(to, from, next) => {
                if(!Store.state.isLogged){
                    next('/login');
                } else {
                    next()
                }
            }
        }
    ]
}
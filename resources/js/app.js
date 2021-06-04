import VueRouter from 'vue-router';
import Vue from "vue";
import Router from "./router";
import Vuex from 'vuex'
import Store from "./store"
import Navbar from "./components/smallcomponents/navbar/Navbar.vue";

Vue.use(Vuex)
Vue.use(VueRouter);

Vue.component('home', require('./components/Home.vue').default);

const store = new Vuex.Store({
    modules: {
        Store
    }
})

store.dispatch('attempt').then( res => {
        
    const app = new Vue({
            el: '#app',
            components: {
                Navbar
            },
            store,
            router:new VueRouter(Router),
            
        });
});



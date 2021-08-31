import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

createApp(App).use(router).use(Vuex).mount('#app').use(store)

const store = new Vuex.Store(
    {
        state: {
            authenticated: false, 
        },
        mutations: {
            setAuthentication(state, status) {
                state.authenticated = status;
            }
        }
    }
)




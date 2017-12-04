import Vue from "vue"
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import approve from './modules/approve'
import task from "./modules/task"

Vue.use(Vuex);

const state = {
    userInfo: null
}
export default new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        approve,
        task
    }
})
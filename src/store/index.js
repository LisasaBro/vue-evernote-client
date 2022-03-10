import Vue from 'vue'
import Vuex from 'vuex'
import notebook from './modules/notebook'
// import note from './modules/note'
//import trash from './modules/trash'
//import user from './modules/user'
import note from './modules/note'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notebook,
    note,
   // trash,
   // user
  }
})

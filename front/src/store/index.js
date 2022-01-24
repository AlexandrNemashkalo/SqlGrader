import mutations from './mutations'
import { parseJwt} from "./func"
import authModule from "./modules/authModule";
import teacherModule from "./modules/teacherModule";
import studentModule from "./modules/studentModule";
import router from '../router'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';
import Swal from "sweetalert2";


import axios from 'axios'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
})


export default new Vuex.Store({
  state: {
    isDark:false,
    port: "https://84.201.174.207/api/",  //"https://hse-class.ru/api/",
    user:{
      id:null,
      name:null,
      email:null,
      isTeacher:null
    },
    layoutWorks:null,
    layoutWorkInfo:null,
    databases: null,
    works: null,
    workInfo: null,
    studentWorkInfo: null,
  },
  mutations,
  modules: {
    authModule,
    teacherModule,
    studentModule
  },
  actions: {

    Exit({commit}){
    },

    async GetUserInfo(state, isTeacher){
      var data = {
        id: 1,
        name: "Test",
        email: "test@edu.hse.ru",
        isTeacher: true
      }
      this.commit('setUser', data)
    },

  },
  plugins: [vuexLocalStorage.plugin]
})

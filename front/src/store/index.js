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
    jwt: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoX2VtYWlsIjoiaWl2YW5vdkBlZHUuaHNlLnJ1IiwiYXV0aF9wcm92aWRlciI6ImtleWNsb2FrIiwiZ29vZ2xlX2VtYWlsIjoiaWl2YW5vdkBtaWVtLmhzZS5ydSIsImhzZV9lbWFpbCI6ImlpdmFub3ZAaHNlLnJ1IiwiaXNfc3VwZXJfYWRtaW4iOnRydWUsIm5hbWUiOnsiZmlyc3RfbmFtZSI6ItCY0LLQsNC9IiwiZnVsbF9uYW1lIjoi0JjQstCw0L3QvtCyINCY0LLQsNC9INCY0LLQsNC90L7QstC40YciLCJsYXN0X25hbWUiOiLQmNCy0LDQvdC-0LIiLCJwYXRyb255bWljIjoi0JjQstCw0L3QvtCy0LjRhyIsInNob3J0X25hbWUiOm51bGx9LCJ1c2VyX2lkIjoiNjAzNjU1ZGQ1OGNhZjczMGUyMmY4OTY1In0.I5Ao9jKcvBmgWNcaQhnwKZIq7sIsYk_f-t_BjgBJgZSttlkko2G-qkgZ1dwAEs1yoQqTQmIAg6EkjRKBxHPgUxcvwMCJ-eUju3IvFCUFhHvNIMrAGzqipPuoEDs6Gp59UlAt52ewhJOKzG4p-QZ2UcRAk3Vzq4Ln7q1yFb3ASeH1MOj1dWUAjoj7lQhyV_YrQkJAOgNlme1XNHoNcce7PS4Oz25BdsYCaedmQn6fOg4ufdUE2xhigULX5QByeD0kyPeMdIwTqON0-n7_HnNVznLCOKQzFOwh5ywpRlI4OqlzOSwfWVsuU_FkPG1sqdgubjvujh2lCR7447RShmE8Fg",
    isDark:false,
    port: "http://awesomesql.ru/api/",  //"https://hse-class.ru/api/",
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

    async GetDatabase(state, databaseId){
      var result ={};
      await axios.get(this.state.port +'teacher/databases/'+databaseId+'?jwt='+this.state.jwt).then( response =>{
          console.log(response)
          result =response.data.database
      }).catch(function (error) {
          Swal.fire({
              icon: 'error',
              title: 'Ошибка',
          })
          console.log(error)});

      return result
  },

  },
  plugins: [vuexLocalStorage.plugin]
})

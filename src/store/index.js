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
    newStudentJwt: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoX3RpbWUiOjE2NDg5NDk0MTQsImF2YXRhciI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tVk5RX2l4SjNmUGcvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQU1adXVjbnFSMWlLNjNMdzB2UWtPT1J6bWZSM2RkRXRMdy9zOTYtYy9waG90by5qcGciLCJlbWFpbCI6InNvbWVAbWllbS5oc2UucnUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmFtaWx5X25hbWUiOiLQmNCz0L7RgNC10LIiLCJmdWxsX25hbWUiOiLQmNCz0L7RgNC10LIg0JjQs9C-0YDRjCDQmNCz0L7RgNC10LLQuNGHIiwiZ2l2ZW5fbmFtZSI6ItCY0LPQvtGA0YwiLCJpc190ZWFjaGVyIjp0cnVlLCJuYW1lIjoi0JjQs9C-0YDQtdCyINCY0LPQvtGA0YwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1WTlFfaXhKM2ZQZy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNucVIxaUs2M0x3MHZRa09PUnptZlIzZGRFdEx3L3M5Ni1jL3Bob3RvLmpwZyIsInByZWZlcnJlZF91c2VybmFtZSI6InNvbWVAbWllbS5oc2UucnUiLCJ1c2VyX2lkIjoiNjAzNjU1ZGQ1OGNhIn0.kREBjx0F3djTd3K6BC40l2TW0l_iBHclKuCyC9i3bFAcc1Ki41A2yHFawSCbmglo2siVFiefrgXGwgxvUNs0GqR3GxfoVjwol_JfJKqb4REJi76s38uzi5fZxmxYSCU8MauXvxqkkgKQZ5F7B4x06Z1fVcpWzKbms2Ppk7mSnkOKK0ZGq_pTjQMGDAL8WS-DGw8tqD3YgNHFLnTMFg_olfg2XTNHw42y59GtoaHlg9Xz440M-EuuLLGflDEv7sxkCso-8MLprRTfoKGmS7qnahk85yK5dUDK-xwC8-xx5lQBwabG69oLEaSQJf1NK2LRgWVsEg2oBX1JXvxpAPbJdA",
    newTeacherJwt: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoX3RpbWUiOjE2NDg5NDk0MTQsImF2YXRhciI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tVk5RX2l4SjNmUGcvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQU1adXVjbnFSMWlLNjNMdzB2UWtPT1J6bWZSM2RkRXRMdy9zOTYtYy9waG90by5qcGciLCJlbWFpbCI6ImlpdmFub3ZAaHNlLnJ1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZhbWlseV9uYW1lIjoi0JjQstCw0L3QvtCyIiwiZnVsbF9uYW1lIjoi0JjQstCw0L3QvtCyINCY0LLQsNC9INCY0LLQsNC90L7QstC40YciLCJnaXZlbl9uYW1lIjoi0JjQstCw0L0iLCJpc190ZWFjaGVyIjp0cnVlLCJuYW1lIjoi0JjQstCw0L3QvtCyINCY0LLQsNC9IiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tVk5RX2l4SjNmUGcvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQU1adXVjbnFSMWlLNjNMdzB2UWtPT1J6bWZSM2RkRXRMdy9zOTYtYy9waG90by5qcGciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJpaXZhbm92QGhzZS5ydSIsInVzZXJfaWQiOiI2MDM2NTVkZDU4Y2FmNzMwZTIyZjg5NjUifQ.IQbOoUsDcuUmJjYAWOUR1uElcyZIQrXmISQaCpYdAg709aAMON7rIYeBwwjh-w3WJ88YXbFL7uji9E02wLJXHrsu4NytSZL1ARCp9trjSKbGUezOzYaavRMdV39Yrapf2kw7e4vEnlzlBZsh44ci0P26CPG5DSQ2ax1dOlTpRckYyOXZTXRApc2R1jDp5GDGN-c7YblMCtFLOp4l68JMMwvcXOrdLP0bQaSo2v15LNO_8qW2fk9PEa3c9jr0sXAxkJ5ttc_dtbatjuHbxUR8NcCjjDSiazoCHZuIOcKn1DxscMte7SAZBDqxP2a859hkVKs9Y5G0ZDBMwZI_tbgkJQ",
    oldJwt: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoX2VtYWlsIjoiaWl2YW5vdkBlZHUuaHNlLnJ1IiwiYXV0aF9wcm92aWRlciI6ImtleWNsb2FrIiwiZ29vZ2xlX2VtYWlsIjoiaWl2YW5vdkBtaWVtLmhzZS5ydSIsImhzZV9lbWFpbCI6ImlpdmFub3ZAaHNlLnJ1IiwiaXNfc3VwZXJfYWRtaW4iOnRydWUsIm5hbWUiOnsiZmlyc3RfbmFtZSI6ItCY0LLQsNC9IiwiZnVsbF9uYW1lIjoi0JjQstCw0L3QvtCyINCY0LLQsNC9INCY0LLQsNC90L7QstC40YciLCJsYXN0X25hbWUiOiLQmNCy0LDQvdC-0LIiLCJwYXRyb255bWljIjoi0JjQstCw0L3QvtCy0LjRhyIsInNob3J0X25hbWUiOm51bGx9LCJ1c2VyX2lkIjoiNjAzNjU1ZGQ1OGNhZjczMGUyMmY4OTY1In0.I5Ao9jKcvBmgWNcaQhnwKZIq7sIsYk_f-t_BjgBJgZSttlkko2G-qkgZ1dwAEs1yoQqTQmIAg6EkjRKBxHPgUxcvwMCJ-eUju3IvFCUFhHvNIMrAGzqipPuoEDs6Gp59UlAt52ewhJOKzG4p-QZ2UcRAk3Vzq4Ln7q1yFb3ASeH1MOj1dWUAjoj7lQhyV_YrQkJAOgNlme1XNHoNcce7PS4Oz25BdsYCaedmQn6fOg4ufdUE2xhigULX5QByeD0kyPeMdIwTqON0-n7_HnNVznLCOKQzFOwh5ywpRlI4OqlzOSwfWVsuU_FkPG1sqdgubjvujh2lCR7447RShmE8Fg",
    jwt: null,
    isDark:false,
    port: "http://awesomesql.ru/api/", 
    user:{
      user_id:null,
      name:null,
      email:null,
      is_teacher:null,
      avatar: null,
    },
    layoutWorks:[],
    layoutWorkInfo:null,
    databases: [],
    databaseInfo: null,
    works: [],
    workInfo: null,
    studentWorkInfo: null,
    groups: [],
    students:[]
  },
  mutations,
  modules: {
    authModule,
    teacherModule,
    studentModule
  },
  actions: {

    Exit({commit}){
        this.commit("setUser", {name:null})
        this.commit("setJwt", null)
        this.commit("setLayoutWorks", [])
        this.commit("setLayoutWorkInfo", null)
        this.commit("setDatabases", [])
        this.commit("setWorks", [])
        this.commit("setWorkInfo", null)
        this.commit("setStudentWorkInfo", null)
        this.commit("setGroups", [])
        this.commit("setDatabaseInfo", null)
    },

  },
  plugins: [vuexLocalStorage.plugin]
})

import Vue from 'vue'
import VueRouter from 'vue-router'


import Main from "../views/Main";
// Auth
import SignIn from "../views/Auth/SignIn";

//Student
import StudentWorks from "../views/Student/StudentWorks";
import StudentWorkInfo from "../views/Student/StudentWorkInfo";

// Teacher
import TeacherWorks from "../views/Teacher/TeacherWorks";
import TeacherWorkInfo from "../views/Teacher/TeacherWorkInfo";
import TeacherStudentWork from "../views/Teacher/TeacherStudentWork";
import TeacherLayoutWorks from "../views/Teacher/TeacherLayoutWorks";
import TeacherLayoutWorkInfo from "../views/Teacher/TeacherLayoutWorkInfo";

// Databases
import TeacherDatabases from "../views/Teacher/TeacherDatabases";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/student/',
    name: 'MainStudent',
    component: Main,
    children:[
      {
        path: 'works',
        name: 'StudentWorks',
        component: StudentWorks
      },
      {
        path: 'works/:studentWorkId',
        name: 'StudentWorkInfo',
        component: StudentWorkInfo
      },
    ]
  },
  {
    path: '/teacher/',
    name: 'MainTeacher',
    component: Main,
    children:[
      {
        path: 'works',
        name: 'TeacherWorks',
        component: TeacherWorks
      },
      {
        path: 'works/:workId',
        name: 'TeacherWorkInfo',
        component: TeacherWorkInfo
      },
      {
        path: 'studentwork/:studentWorkId',
        name: 'TeacherStudentWork',
        component: TeacherStudentWork
      },
      {
        path: 'layoutworks',
        name: 'TeacherLayoutWorks',
        component: TeacherLayoutWorks
      },
      {
        path: 'layoutworks/:isCreate/:layoutWorkId',
        name: 'TeacherLayoutWorkInfo',
        component: TeacherLayoutWorkInfo
      },
      {
        path: 'databases',
        name: 'TeacherDatabases',
        component: TeacherDatabases
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

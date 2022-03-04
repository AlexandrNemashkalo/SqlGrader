import axios from "axios";
import router from "../../router";
import store from "@/store/index";
import Swal from "sweetalert2";
import moment from "moment";

export default {
    actions: {
        async GetLayoutWorksTeacher(state){
            await axios.get(store.state.port +'teacher/layout_works?jwt='+store.state.jwt).then( response =>{
                console.log(response)
                store.commit('setLayoutWorks',response.data.layouts)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },


        async DeleteLayoutWorkTeacher(state, layoutWorkId){
            await axios.delete(store.state.port +'teacher/layout_works/' + layoutWorkId + '?jwt='+store.state.jwt).then( async response =>{
                console.log(response)
                await store.dispatch("GetLayoutWorksTeacher");   
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },

        async GetLayoutWorkInfoTeacher(state, data){
            await axios.get(store.state.port +'teacher/layout_works/' + data + '?jwt='+store.state.jwt).then( response =>{
                console.log(response)
                response.data.layout.tasks = response.data.tasks;
                store.commit('setLayoutWorkInfo', response.data.layout)
                return response.data.layout;
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});

        },

        async CreateLayoutWorkTeacher(state, data){
            //не работает
            var params= {
                database:data.database.id,
                name:data.name,
                tasks: data.tasks,
                jwt:store.state.jwt
              };
            await axios.post(store.state.port +'teacher/layout_works', params).then( response =>{
                console.log(response)
                response.data.layout.tasks = response.data.tasks;
                //store.commit('setLayoutWorkInfo', response.data.layout)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },


        async CopyAndCreateLayoutWorkTeacher(state){
            //store.commit('setLayoutWorkInfo', layoutWorkInfo)
        },

        async GetDatabasesTeacher(state){
            await axios.get(store.state.port +'teacher/databases?jwt='+store.state.jwt).then( response =>{
                console.log(response)
                store.commit('setDatabases', response.data.databases)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },


        async CreateWorkTeacher(state, data){
           var createWork = {
                layoutWorkId:1,
                name:"КР №1",
                dateOfStart:moment().toISOString(),
                dateOfEnd:moment().toISOString(),
                students:["student email 1", "student email 2"]
            }
        },

        async GetWorksTeacher(state){
            await axios.get(store.state.port +'teacher/works?page=0&jwt='+store.state.jwt).then( response =>{
                console.log(response)
                store.commit('setWorks',response.data.works)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },

        async GetWorkInfoTeacher(state, workId){
            await axios.get(store.state.port +'teacher/works/'+workId+'?jwt='+store.state.jwt).then( response =>{
                console.log(response)
                response.data.work.studentWorks = response.data.student_works
                store.commit('setWorkInfo',response.data.work)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },

        async GetStudentWorkInfoTeacher(state, studentWorkId){
            await axios.get(store.state.port +'teacher/student_works/'+studentWorkId+'?jwt='+store.state.jwt).then( response =>{
                console.log(response)
                response.data.student_work.answers = response.data.results
                store.commit('setStudentWorkInfo', response.data.student_work);
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },
    },
}
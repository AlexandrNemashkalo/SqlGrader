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
            var taskIds = [];
            for(let i = 0; i<data.tasks.length; i++){
                let params = {
                    task:{
                        database_id: data.database.id,
                        description: data.tasks[i].description,
                        difficulty: data.tasks[i].difficulty,
                        solution: data.tasks[i].solution,
                        name: data.tasks[i].description
                    }
                }
                await axios.post(store.state.port +'teacher/tasks?jwt='+store.state.jwt, params).then( response =>{
                    console.log(response);
                    taskIds.push(response.data.id)
                }).catch(function (error) {
                    Swal.fire({icon: 'error',title: 'Ошибка'})
                    console.log(error)});
            }

            let params = {
                layout:{
                    database:data.database.id,
                    name: data.name,
                    tasks: taskIds
                }
            };
            await axios.post(store.state.port +'teacher/layout_works?jwt='+store.state.jwt, params).then( response =>{
                console.log(response)
                store.commit('setLayoutWorkInfo', response.data.layout)
                router.replace("/teacher/layoutworks/" + false + "/" + response.data.layout.id)
                router.go(router.currentRoute)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
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

        async GetDatabaseTeacher(state, database){
            await axios.get(store.state.port +'teacher/databases/'+database+'?jwt='+store.state.jwt).then( response =>{
                console.log(response)
                store.commit('setDatabaseInfo', response.data.database)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },

        async PatchDatabaseTeacher(state, data){
            var params = {
                database: {
                    note: data.note,
                    structure: data.structure
                }
            }
            await axios.patch(store.state.port +'teacher/databases/'+data.id+'?jwt='+store.state.jwt, params ).then( async response =>{
                console.log(response)
                await store.dispatch("GetDatabasesTeacher"); 
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },

        async GetGroupsTeacher(state){
            await axios.get(store.state.port +'teacher/groups?jwt='+store.state.jwt).then( response =>{
                console.log(response)
                store.commit('setGroups', response.data.groups)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },

        async CreateWorkTeacher(state, data){
            let params = {
                work:{
                    deadline: data.deadline,
                    emails: data.emails,
                    groups: data.groups,
                    layout_work_ids: data.layout_works,
                    name: data.name,
                    start: data.start
                }
            }
            console.log(params)
            await axios.post(store.state.port +'teacher/works?jwt='+store.state.jwt, params).then( async response =>{
                console.log(response)
                await store.dispatch("GetWorksTeacher"); 
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },

        async PatchWorkTeacher(state, data){
            let params = {
                work:{
                    deadline: data.deadline,
                    emails: data.emails,
                    groups: data.groups,
                    layout_work_ids: data.layout_works,
                    name: data.name,
                    start: data.start
                }
            }
            console.log(params)
            await axios.patch(store.state.port +'teacher/works/'+data.id+'?jwt='+store.state.jwt, params).then( async response =>{
                console.log(response)
                await store.dispatch("GetWorksTeacher"); 
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },

        async GetWorksTeacher(state){
            await axios.get(store.state.port +'teacher/works?page=-1&jwt='+store.state.jwt).then( response =>{
                console.log(response)
                store.commit('setWorks',response.data.works)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },

        async CancelWorkTeacher(state, workId){
            await axios.delete(store.state.port +'teacher/works/' + workId + '?jwt='+store.state.jwt).then( async response =>{
                console.log(response)
                await store.dispatch("GetWorksTeacher");   
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
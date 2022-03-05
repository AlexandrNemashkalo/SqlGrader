import axios from "axios";
import router from "../../router";
import store from "@/store/index";
import Swal from "sweetalert2";
import moment from "moment";

export default {
    actions: {
        async GetWorksStudent(sate){
            await axios.get(store.state.port +'student/student_works?page=0&jwt='+store.state.jwt).then( response =>{
                console.log(response)
                store.commit('setWorks',response.data.student_works)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },

        async GetWorkInfoStudent(sate, studentWorkId){
            await axios.get(store.state.port +'student/student_works/'+ studentWorkId+'?jwt='+store.state.jwt).then( response =>{
                console.log(response)
                response.data.student_work.answers = response.data.results;
                store.commit('setStudentWorkInfo',response.data.student_work)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                })
                console.log(error)});
        },
    },
}
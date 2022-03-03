import axios from "axios";
import router from "../../router";
import store from "@/store/index";
import Swal from "sweetalert2";
import moment from "moment";

export default {
    actions: {
        async GetWorksStudent(){
            var works = [
                {
                    id:2,
                    name:"КР №2",
                    status:"created",
                    dateOfStart:moment(),
                    dateOfEnd:moment(),
                    maxGrade:10,
                    grade: null
                },
                {
                    id:1,
                    name:"КР №1",
                    status:"ended",
                    dateOfStart:moment().toISOString(),
                    dateOfEnd:moment().toISOString(),
                    maxGrade:10,
                    grade: 10
                },
            ]

            store.commit('setWorks', works);
        },
    },
}
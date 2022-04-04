import axios from "axios";
import store from "@/store/index";
import router from "../../router";
import Swal from "sweetalert2";
import { parseJwt } from "../func";

export default {
    actions: {
        async LoginUser(state, data){
            if(data.jwt != null){
                try{
                    var user = parseJwt(data.jwt);
                    console.log(user)
                    user.is_teacher = user.email.includes("@hse.ru")
                    this.commit('setUser', user);
                    state.commit("setJwt", data.jwt)
                    if(user.is_teacher){
                        router.replace('/teacher/')
                    }
                    else{
                        router.replace('/student/')
                    }
                }
                catch( e ){
                    router.replace('')
                    return false;
                }
            }

            if(data.email == "teacher@t.t" && data.password=="teacher1234"){
                state.commit("setJwt", store.state.newTeacherJwt)
                var user = parseJwt(store.state.jwt);
                user.is_teacher = user.email.includes("@hse.ru")
                
                this.commit('setUser', user);
                router.replace('/teacher/')
            }
            else if(data.email == "student@s.s" && data.password=="student1234"){

                state.commit("setJwt", store.state.newStudentJwt)
                var user = parseJwt(store.state.jwt);
                user.is_teacher = user.email.includes("@hse.ru")
                console.log(user)
                this.commit('setUser', user);

                router.replace('/student/')
            }
            else{
                return false; 
            }  
        },

        async Login(state, data){
            router.go(store.state.port +'login')
        },

        CheckJwt(state, jwt, isTeacher){
            if(jwt == null){
                router.replace('/')
            }
            var user = parseJwt(store.state.jwt);
            user.is_teacher = user.email.includes("@hse.ru")
        }
    },
}
import axios from "axios";
import store from "@/store/index";
import router from "../../router";
import Swal from "sweetalert2";

export default {
    actions: {
        async LoginTeacher(state, data){
            await store.dispatch("GetUserInfo")
            if(data.email == "teacher@t.t"){
                
                router.replace('/teacher/')
            }
            else{

                var data = {
                    id: 2,
                    name: "TestStudent",
                    email: "student@edu.hse.ru",
                    isTeacher: false
                  }
                  this.commit('setUser', data)
                router.replace('/student/')
            }
            
        },

        async Login(state, data){
            router.go(store.state.port +'login')
        },
    },
}
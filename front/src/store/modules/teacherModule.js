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
            await axios.post(store.state.port +'teacher/layout_works', {}, {
                params: {
                  database:data.database.id,
                  name:data.name,
                  tasks: data.tasks,
                  jwt:store.state.jwt
                }
              }).then( response =>{
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

        async GetDatabasesTeacher(){
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
                name:"wfs",
                dateOfStart:moment().toISOString(),
                dateOfEnd:moment().toISOString(),
                students:["student email 1", "student email 2"]
            }
        },

        async GetWorksTeacher(){

            var works = [
                {
                    id:1,
                    name:"wfs",
                    status:"created",
                    layoutWork: {id:1, name:"Макет 1"},
                    dateOfStart:moment(),
                    dateOfEnd:moment(),
                    maxGrade:10,
                    assignmentGroups:["BIV195"],
                    assignmentStudents:["test@test.test"],
                },
                {
                    id:2,
                    name:"wfs2",
                    status:"canceled",
                    layoutWork: {id:2, name:"Макет 2"},
                    dateOfStart:moment().toISOString(),
                    dateOfEnd:moment().toISOString(),
                    maxGrade:10,
                    assignmentGroups:["BIV195", "БИВ194"],
                    assignmentStudents:[],
                },
            ]

            store.commit('setWorks', works);

        },

        async GetWorkInfoTeacher(){

            var work = {
                id:1,
                name:"wfs",
                status:"created",
                layoutWork: {id:1, name:"Макет 1"},
                dateOfStart:moment().toISOString(),
                dateOfEnd:moment().toISOString(),
                maxGrade:10,
                studentWorks:[
                    {
                        id:1,
                        dateOfDownload:moment().toISOString(),
                        student:"student email",
                        grade: 5
                    },
                    {
                        id:2,
                        dateOfDownload: moment().toISOString(),
                        student:"student email",
                        grade: 4
                    }
                ]
            }
            store.commit('setWorkInfo', work);
        },

        async GetStudentWorkInfoTeacher(state, studentWorkId){

            var studentWorkInfo ={
                id:1,
                dateOfDownload: moment().toISOString(),
                student:"student email",
                grade: 1,
                maxGrade:2,
                database: {
                    id: 2,
                    name: "school",
                    note: "!2132341Один и тот же человек может сняться в фильме в качестве актера, и он же может быть режиссером и/или сценаристом этого или другого фильма.",
                    structure: "erger g'er<div>gerg</div><div>&nbsp;er gerg e</div><div>&nbsp;grege-- re-- rger</div>"
                },
                answers:[
                    { 
                        number: 1,
                        description: "1 Для каждой персоны выдать количество фильмов, в которых он принимал участие в разных ролях (актер, режиссер, сценарист и т.д.).",
                        solution: "SELECT * FROM TABLE",
                        complexity: 2,
                        isSuccess:true,
                        studentAnswer:"jfwnfbew ek"
                    },
                    { 
                        number: 2,
                        description: "1 Для каждой персоны выдать количество фильмов, в которых он принимал участие в разных ролях (актер, режиссер, сценарист и т.д.).",
                        solution: "SELECT * FROM TABLE",
                        complexity: 3,
                        isSuccess:false,
                        studentAnswer:"jfwnfbew ek"
                    }
                ]
            }
            store.commit('setStudentWorkInfo', studentWorkInfo);
            return studentWorkInfo;
        },
        

        async CheckWorkTeacher(){
            
        }
    },
}
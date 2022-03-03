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
                name:"КР №1",
                dateOfStart:moment().toISOString(),
                dateOfEnd:moment().toISOString(),
                students:["student email 1", "student email 2"]
            }
        },

        async GetWorksTeacher(){

            var works = [
                {
                    id:1,
                    name:"КР №1",
                    status:"created",
                    layoutWork: {id:1, name:"КР на конец модуля 3"},
                    dateOfStart:moment(),
                    dateOfEnd:moment(),
                    maxGrade:10,
                    assignmentGroups:["БИВ195"],
                    assignmentStudents:["test@test.test"],
                },
                {
                    id:2,
                    name:"КР №2",
                    status:"canceled",
                    layoutWork: {id:2, name:"КР на конец модуля 4"},
                    dateOfStart:moment().toISOString(),
                    dateOfEnd:moment().toISOString(),
                    maxGrade:10,
                    assignmentGroups:["БИВ195", "БИВ194"],
                    assignmentStudents:[],
                },
            ]

            store.commit('setWorks', works);

        },

        async GetWorkInfoTeacher(){

            var work = {
                id:1,
                name:"КР №1",
                status:"created",
                layoutWork: {id:1, name:"КР на конец модуля 3"},
                dateOfStart:moment().toISOString(),
                dateOfEnd:moment().toISOString(),
                maxGrade:10,
                studentWorks:[
                    {
                        id:1,
                        dateOfDownload:moment().toISOString(),
                        student:"student email 1",
                        grade: 5
                    },
                    {
                        id:2,
                        dateOfDownload: moment().toISOString(),
                        student:"student email 2",
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
                student:"student email 1",
                grade: 1,
                maxGrade:2,
                database: {
                    id: 2,
                    name: "Фильмы",
                    note: "Один и тот же человек может сняться в фильме в качестве актера, и он же может быть режиссером и/или сценаристом этого или другого фильма.",
                    structure: "-- Фильмы<br>create table films (<br>id number(6) primary key, -- суррогатный П<br>name varchar(50) not null, -- название<br>p_year number(4) not null, -- год выхода<br>country varchar(30), -- страна<br>length time, -- продолжительность<br>rating number(3,1) not null, -- рейтинг (0-10)<br>genre varchar(20) not null -- жанр<br>);<br>-- Люди<br>create table persons (<br>id number(6) primary key, -- суррогатный ПК<br>lname varchar2(40) not null, -- фамилия<br>fname varchar2(40) not null, -- имя, отчество<br>country varchar(30), -- страна<br>birth date not null -- дата рождения<br>);<br>-- Создатели фильмов<br>create table creators (<br>id number(6) primary key,<br>film number (6) not null references films, -- фильм<br>pers number(6) not null references persons, -- человек<br>occup varchar(50) not null, -- участие (актер, режиссер, композитор и т.д.)<br>role varchar(50) -- роль (только для актера)<br>);"
                },
                answers:[
                    { 
                        number: 1,
                        description: "Вывести актеров, которые исполняли две и более роли в одном фильме.",
                        solution: "\"код решения преподавателя\"",
                        complexity: 2,
                        isSuccess:true,
                        studentAnswer:"\"код решения студента\""
                    },
                    { 
                        number: 2,
                        description: "1 Для каждой персоны выдать количество фильмов, в которых он принимал участие в разных ролях (актер, режиссер, сценарист и т.д.).",
                        solution: "\"код решения преподавателя\"",
                        complexity: 3,
                        isSuccess:false,
                        studentAnswer:"\"код решения студента\""
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
import axios from "axios";
import router from "../../router";
import store from "@/store/index";
import Swal from "sweetalert2";
import moment from "moment";

export default {
    actions: {
        async GetLayoutWorksTeacher(state){
            var layoutWorks = [
                    {
                      id : 1,
                      name: "Макет 1",
                      dateOfCreated: moment()
                    },
                    {
                      id: 2,
                      name: "Макет 2",
                      dateOfCreated:moment().toISOString()
                    }
                ]
            store.commit('setLayoutWorks', layoutWorks)
        },


        async DeleteLayoutWorkTeacher(state, layoutWorkId){

        },


        async GetLayoutWorkInfoTeacher(state, data){
            var layoutWorkInfo = {
                id: data,
                name: "Макет 1",
                database: {
                    id: 1,
                    name: "film",
                    note: "Один и тот же человек может сняться в фильме в качестве актера, и он же может быть режиссером и/или сценаристом этого или другого фильма.",
                    structure: "erger g'er<div>gerg</div><div>&nbsp;er gerg e</div><div>&nbsp;grege-- re-- rger</div>"
                },
                tasks:[
                    {
                        id: 1, 
                        description: "1 Для каждой персоны выдать количество фильмов, в которых он принимал участие в разных ролях (актер, режиссер, сценарист и т.д.).",
                        solution: "SELECT * FROM TABLE",
                        complexity: 1
                    },
                    {
                        id: 2, 
                        description: "2 Для каждой персоны выдать количество фильмов, в которых он принимал участие в разных ролях (актер, режиссер, сценарист и т.д.).",
                        solution: "SELECT * FROM TABLE",
                        complexity: 2
                    }
                ]
            }
            store.commit('setLayoutWorkInfo', layoutWorkInfo)
            return layoutWorkInfo;
        },

        async CreateLayoutWorkTeacher(state){
            //store.commit('setLayoutWorkInfo', layoutWorkInfo)
        },


        async CopyAndCreateLayoutWorkTeacher(state){
            //store.commit('setLayoutWorkInfo', layoutWorkInfo)
        },

        async GetDatabasesTeacher(){
            var databases = [
                {
                    id: 1,
                    name: "film",
                    note: "Один и тот же человек может сняться в фильме в качестве актера, и он же может быть режиссером и/или сценаристом этого или другого фильма.",
                    structure: "-- 1Фильмы\ncreate table films (\nid number(6) primary key, -- суррогатный П\nname varchar(50) not null, -- название\np_year number(4) not null, -- год выхода\ncountry varchar(30), -- страна\nlength time, -- продолжительность\nrating number(3,1) not null, -- рейтинг (0-10)\ngenre varchar(20) not null -- жанр\n);\n-- Люди\ncreate table persons (\nid number(6) primary key, -- суррогатный ПК\nlname varchar2(40) not null, -- фамилия\nfname varchar2(40) not null, -- имя, отчество\ncountry varchar(30), -- страна\nbirth date not null -- дата рождения\n);\n-- Создатели фильмов\ncreate table creators (\nid number(6) primary key,\nfilm number (6) not null references films, -- фильм\npers number(6) not null references persons, -- человек\noccup varchar(50) not null, -- участие (актер, режиссер, композитор и т.д.)\nrole varchar(50) -- роль (только для актера)\n);"
                },
                {
                    id: 2,
                    name: "school",
                    note: "!2132341Один и тот же человек может сняться в фильме в качестве актера, и он же может быть режиссером и/или сценаристом этого или другого фильма.",
                    structure: "erger g'er<div>gerg</div><div>&nbsp;er gerg e</div><div>&nbsp;grege-- re-- rger</div>"
                },
            ]

            store.commit('setDatabases', databases)
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
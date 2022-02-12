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
                      name: "КР на конец модуля 3",
                      dateOfCreated: moment()
                    },
                    {
                      id: 2,
                      name: "КР на конец модуля 4",
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
                name: "КР на конец модуля 3",
                database: {
                    id: 1,
                    name: "Фильмы",
                    note: "Один и тот же человек может сняться в фильме в качестве актера, и он же может быть режиссером и/или сценаристом этого или другого фильма.",
                    structure: "-- Фильмы<br>create table films (<br>id number(6) primary key, -- суррогатный П<br>name varchar(50) not null, -- название<br>p_year number(4) not null, -- год выхода<br>country varchar(30), -- страна<br>length time, -- продолжительность<br>rating number(3,1) not null, -- рейтинг (0-10)<br>genre varchar(20) not null -- жанр<br>);<br>-- Люди<br>create table persons (<br>id number(6) primary key, -- суррогатный ПК<br>lname varchar2(40) not null, -- фамилия<br>fname varchar2(40) not null, -- имя, отчество<br>country varchar(30), -- страна<br>birth date not null -- дата рождения<br>);<br>-- Создатели фильмов<br>create table creators (<br>id number(6) primary key,<br>film number (6) not null references films, -- фильм<br>pers number(6) not null references persons, -- человек<br>occup varchar(50) not null, -- участие (актер, режиссер, композитор и т.д.)<br>role varchar(50) -- роль (только для актера)<br>);"
                },
                tasks:[
                    {
                        id: 1, 
                        description: "Вывести актеров, которые исполняли две и более роли в одном фильме.",
                        solution: "\"код решения\"",
                        complexity: 1
                    },
                    {
                        id: 2, 
                        description: "Вывести список фильмов, вышедших в текущем году в России и США",
                        solution: "\"код решения\"",
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
                    name: "Фильмы",
                    note: "Один и тот же человек может сняться в фильме в качестве актера, и он же может быть режиссером и/или сценаристом этого или другого фильма.",
                    structure: "-- Фильмы<br>create table films (<br>id number(6) primary key, -- суррогатный П<br>name varchar(50) not null, -- название<br>p_year number(4) not null, -- год выхода<br>country varchar(30), -- страна<br>length time, -- продолжительность<br>rating number(3,1) not null, -- рейтинг (0-10)<br>genre varchar(20) not null -- жанр<br>);<br>-- Люди<br>create table persons (<br>id number(6) primary key, -- суррогатный ПК<br>lname varchar2(40) not null, -- фамилия<br>fname varchar2(40) not null, -- имя, отчество<br>country varchar(30), -- страна<br>birth date not null -- дата рождения<br>);<br>-- Создатели фильмов<br>create table creators (<br>id number(6) primary key,<br>film number (6) not null references films, -- фильм<br>pers number(6) not null references persons, -- человек<br>occup varchar(50) not null, -- участие (актер, режиссер, композитор и т.д.)<br>role varchar(50) -- роль (только для актера)<br>);"
                },
                {
                    id: 2,
                    name: "Кинотеатр",
                    note: "Один и тот же человек может купить несколько билетов.",
                    structure: "Create table Movies (<br>id  numeric(5, 0)  primary key,     -- идентификатор<br>name    varchar(50) not null,       -- название фильма<br>genre   varchar(30) not null,       -- название жанра<br>director varchar(50) not null,      -- режиссер<br>studio  varchar(50) not null,       -- студия<br>rating  numeric(3, 1) null default 0,   -- рейтинг от 0 до 10<br>f_year  numeric(4) not null,        -- год выхода в прокат<br>format varchar(25) not null,        -- формат (2D, 3D и т.д.)<br>duration time not null      -- продолжительность<br>);<br>-- Сеансы<br>create table sessions (<br>id  numeric(5)  primary key,    -- идентификатор<br>stime   time not null,          -- время сеанса<br>sdate   date not null,          -- дата сеанса<br>price   numeric(3) not null,        -- стоимость билетов<br>film    numeric(5) not null references Movies   -- фильм<br>);<br>-- Билеты<br>Create table tickets(<br>id  numeric(6) primary key, -- идентификатор<br>state   varchar(20) ,           -- статус (продан / забронирован)<br>contacts numeric(11) null,      -- телефон покупателя<br>snum    numeric(5) references sessions, -- сеанс<br>row     numeric(2) not null,        -- номер ряда<br>place   numeric(2) not null     -- номер места<br>);"
                },
            ]

            store.commit('setDatabases', databases)
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
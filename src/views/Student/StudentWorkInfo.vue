<template>
  <div>

 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
        <div>
        <p v-if="isEdit && currentTime >0">
          <h5 >До завершения работы осталось:</h5> 
          {{ getFormatDuration(currentTime) }}
        </p>
        <p>
          <h5 >Описание БД:</h5> 
          {{$store.state.databaseInfo.note}}
        </p>
        <p>
          <h5>Структура:</h5> 
          <span v-html="$store.state.databaseInfo.structure"></span></p>
        </div>

        <v-img
          height="500"
          contain
          :src="'http://awesomesql.ru/images/'+$store.state.databaseInfo.id+'/'+$store.state.databaseInfo.id+'.png'"
        ></v-img>
        
        <h5>Вопросы:</h5>

        <div v-for="(i, index) in editStudentWork.answers " :key="i.index"  style="margin-bottom:70px">
          <div >
             <div style="display:inline-block;font-size:20px" class="mb-2">
                <span >{{index +1}}. Задание </span>
                <v-icon :color="i.correct ? 'success' : 'error'">
                  {{i.correct ? 'mdi-checkbox-marked-circle-outline' :'mdi-close'  }}
                </v-icon>
                <!--<v-spacer></v-spacer>-->
                <v-btn
                    v-if="isEdit"
                    color="primary"
                    style="right:8px;position: absolute"
                    class="mr-2"
                    @click="checkAnswer(i)"
                    small
                    >
                    Проверить
                </v-btn>
                
             </div>
            
            <v-textarea
            label="Описание вопроса"
            outlined
            v-model="i.task.description"
            rows="2"
            :readonly="true"
            ></v-textarea>
 
            <label>Ваше решение:</label>
            <v-card dark  style="border:1px solid gray; border-radius:5px;"  >
            <prism-editor 
                :readonly="!isEdit"
                class="language-sql" 
                v-model="i.result_query" 
                :highlight="highlighter" 
                line-numbers>
            </prism-editor>
            </v-card>

            <v-simple-table v-if="i.query_data_columns != null && i.query_data_columns.length > 0">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th v-for="(column, index) in i.query_data_columns" :key="index" class="text-left">
                      {{column}}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in i.query_data" :key="index">
                    <td v-for="(columnkey, idx) in i.query_data_columns" :key="idx">{{ item[columnkey] }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

          </div>
        </div>

      </v-form>

  </div>

</template>

<script>

import Swal from "sweetalert2";
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import th
 import moment from 'moment'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-tomorrow.css'; // i

export default {
  name: "StudentWorkInfo",
 components: {
      PrismEditor,
    },
  data(){
    return{
      isEdit: false,
      database:{
          note: null,
          structure: null
      },
      valid: true,
      requiredRules: [
        v => !!v || 'Is required',
      ],
      editStudentWork: {
            id: null,
            answers:[]
        },
        currentTime: 5,
        timer: null
      }
    },

    async mounted(){
     
    this.isEdit = this.$route.params.isEdit == "true"
  
    await this.$store.dispatch("GetWorkInfoStudent", this.$route.params.studentWorkId);

    await this.$store.dispatch("GetDatabaseStudent", this.$store.state.studentWorkInfo.database);
    var work =  this.$store.state.studentWorkInfo;
    work.answers = work.answers.map(a => {
      a.query_data_columns = []
      a.query_data = []
      return a;
    })
    this.editStudentWork = work
    if( this.isEdit){
       this.startTimer()
    }
  },
  watch: {
    currentTime(time) {
      if (time <= 0) {
        this.stopTimer()
      }
    }

  },
  methods:{
    startTimer() {
      this.currentTime = moment.duration(moment( this.editStudentWork.deadline).diff(moment()))
      this.timer = setInterval(() => {
        this.currentTime =  this.currentTime - 1000
      }, 1000)
    },
    stopTimer() {
      this.$router.replace('/student/works')
    },
    getFormatDuration(time){
      var seconds = parseInt( (time / 1000) % 60 ) ;
      var minutes = parseInt( (time / (1000*60) ) % 60 ) ;
      var hours   = parseInt( (time / (1000*60*60) ) % 24 ) ;
      var days   = parseInt( (time / (1000*60*60*24) )) ;
      var daysString =''
      if(days > 1){
        daysString = days +" д "
      }
      return daysString + hours + " ч "+minutes+" мин "+seconds+" c ";
    },
      async checkAnswer(answer){
        var response = await this.$store.dispatch("GetAndUpdateResultStudent", answer);
          this.editStudentWork.answers.forEach( x =>{
            if(x.id == response.id){ 
              x.correct = response.correct
              x.result_query = response.result_query  
              if(response.query_data != null){
                x.query_data_columns = response.query_data.columns
                x.query_data = response.query_data.query_data
              }
              else{
                x.query_data_columns = []
                x.query_data = []
              }
              
            }
          });

          this.editStudentWork = Object.assign({}, this.editStudentWork)
        
          if(response.correct){
            Swal.fire({
                    icon: 'success',
                    title: 'Успех',
                })
          }
          else{
            Swal.fire({
              icon: 'warning',
              title: 'Запрос неверный',
            })
          }
      },

      highlighter(code) {
        return highlight(code, languages.sql); // languages.<insert language> to return html with markup
        
      },
  }
}
</script>

<style>
  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>
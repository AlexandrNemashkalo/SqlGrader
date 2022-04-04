<template>
  <div>

 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
        <p>
          <h5>Описание:</h5> 
          {{$store.state.databaseInfo.note}}
        </p>
        <p>
          <h5>Структура:</h5> 
          <span v-html="$store.state.databaseInfo.structure"></span></p>
        
        <h5>Вопросы:</h5>

        <div v-for="(i, index) in editStudentWork.answers " :key="i.index"  style="margin-bottom:70px">
          <div >
             <div style="display:inline-block;font-size:20px" class="mb-2">
                <span >{{index +1}}. Задание ({{complexities[i.task.difficulty]}}) </span>
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

          </div>
        </div>

      </v-form>

  </div>

</template>

<script>

import Swal from "sweetalert2";
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import th
 
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
      complexities:{
        elementary:"Элементарно",
        easy:"Легко",
        medium:"Терпимо",
        hard:"Сложно"
      },
      valid: true,
      requiredRules: [
        v => !!v || 'Is required',
      ],
      editStudentWork: {
            id: null,
            answers:[]
        },
      }
    },

  async mounted(){
    this.isEdit = this.$route.params.isEdit == "true"
  
    await this.$store.dispatch("GetWorkInfoStudent", this.$route.params.studentWorkId);

    await this.$store.dispatch("GetDatabaseStudent", this.$store.state.studentWorkInfo.database);

    this.editStudentWork = this.$store.state.studentWorkInfo
  },
  methods:{
      async checkAnswer(answer){
        var response = await this.$store.dispatch("GetAndUpdateResultStudent", answer);

        if(response.errors != null && response.errors.work != null ){
           Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                    text:response.errors.work
                })
        }
        else{
          this.editStudentWork.answers.forEach( x =>{
            if(x.id == response.id){
              console.log(response)
              x.correct = response.correct
              x.result_query = response.result_query
              
            }
          });

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
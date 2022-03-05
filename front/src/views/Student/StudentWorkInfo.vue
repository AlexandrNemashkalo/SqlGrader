<template>
  <div>

 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-btn
     style="right:0;position: absolute"
      v-if="isCreate || true"
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
      small
    >
      Отправить
    </v-btn>
    
        <p>
          <h5>Описание:</h5> 
          {{database.note}}
        </p>
        <p>
          <h5>Структура:</h5> 
          <span v-html="database.structure"></span></p>
        
        <h5>Вопросы:</h5>

        <div v-for="(i, index) in editStudentWork.answers " :key="i.index" class="mb-5">
          <div>
             <div style="display:inline-block;font-size:20px" class="mb-3">
                <span >{{index +1}}. Задание ({{complexities[i.task.difficulty]}}) </span>
                <v-icon :color="i.correct ? 'success' : 'error'">
                  {{i.correct ? 'mdi-checkbox-marked-circle-outline' :'mdi-close'  }}
                </v-icon>
                <!--<v-spacer></v-spacer>-->
                <v-btn
                    v-if="isCreate || true"
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
            required
            v-model="i.task.description"
            rows="2"
            :rules="requiredRules"
            :readonly="true"
            ></v-textarea>
 
            <label>Ваше решение:</label>
            <v-card dark  style="border:1px solid gray; border-radius:5px;"  >
            <prism-editor 
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
      isCreate: false,
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
    await this.$store.dispatch("GetWorkInfoStudent", this.$route.params.studentWorkId);

    this.database = await this.$store.dispatch("GetDatabase", this.$store.state.studentWorkInfo.answers[0].task.database );
    
    this.editStudentWork =this.$store.state.studentWorkInfo
  },
  methods:{
      async checkAnswer(answer){

      },
      highlighter(code) {
        return highlight(code, languages.sql); // languages.<insert language> to return html with markup
      },
    async validate () {
        var isOk = this.$refs.form.validate()
        if(isOk){
          //await this.$store.dispatch("CreateLayoutWorkTeacher", this.editLayoutWork);
        }
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
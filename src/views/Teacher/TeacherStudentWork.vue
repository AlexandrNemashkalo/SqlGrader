<template>
  <div>
    <div v-if="editStudentWork.user != null">
      <h5>Студент: {{editStudentWork.user.full_name}} ({{editStudentWork.user.email}})</h5> 
      <h5>Оценка: {{editStudentWork.grade}}</h5> 
    </div> 
      <div v-if="$store.state.databaseInfo != null">
        <p>
          <h5>Описание:</h5> 
          {{$store.state.databaseInfo.note}}
        </p>
        <p>
          <h5>Структура:</h5> 
          <span v-html="$store.state.databaseInfo.structure"></span>
        </p>
      </div> 
        <h5>Вопросы:</h5>

        <div v-for="(i, index) in editStudentWork.answers " :key="i.index" class="mb-5">
          <div>
             <div style="display:inline-block;font-size:20px" class="mb-3">
                <span >{{index +1}} вопрос </span>
                <v-icon :color="i.correct ? 'success' : 'error'">
                  {{i.correct ? 'mdi-checkbox-marked-circle-outline' :'mdi-close'  }}
                </v-icon>
                
             </div>
            
            <v-textarea
            label="Описание вопроса"
            outlined
            v-model="i.task.description"
            rows="1"
            :readonly="true"
            ></v-textarea>

            <v-textarea
            label="Решение студента"
            outlined
            v-model="i.result_query"
            rows="1"
            :readonly="true"
            ></v-textarea>

            <span>Было отправлено {{i.solve_count}} р.</span>

        <v-select
          :items="complexities"
          item-text="name"
          item-value="id"
          label="Сложность"
          v-model="i.task.difficulty"
          :readonly="true"
        ></v-select>
          </div>
        </div>

  </div>
</template>

<script>
export default {
  name: "TeacherLabInfo",
  data(){
    return{
      complexities:[
        {id: 'elementary', name:"Элементарно"},
        {id: 'easy', name:"Легко"},
        {id: 'medium', name:"Терпимо"},
        {id: 'hard', name:"Сложно"}
        ],
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      databaseRules: [
        v => !!v || 'Database is required',
        v => !!v.id || 'Database is required'
      ],
      requiredRules: [
        v => !!v || 'Is required',
      ],
      editStudentWork: {
                id:null,
                dateOfDownload: null,
                student:null,
                grade: null,
                maxGrade:null,
                answers:[]
      },
      database: {
                id: null,
                name: null,
                note:null,
                structure: null
      },
    }
  },

  async mounted(){
      await this.$store.dispatch("GetStudentWorkInfoTeacher", this.$route.params.studentWorkId);
      await this.$store.dispatch("GetDatabaseTeacher",this.$store.state.studentWorkInfo.database);
      this.editStudentWork = this.$store.state.studentWorkInfo;
      //this.getDatabase()
    },

  methods:{
    /*getDatabase(){
      if(this.editStudentWork.answers.length > 0){
        this.database = this.$store.state.databases.filter((x)=> x.id == this.editStudentWork.answers[0].task.database)[0]
      }
    },*/
    validate () {
        this.$refs.form.validate()
        console.log(this.$refs.form.validate())
        console.log(this.editStudentWork)
      },
  }
}
</script>

<style scoped>

</style>
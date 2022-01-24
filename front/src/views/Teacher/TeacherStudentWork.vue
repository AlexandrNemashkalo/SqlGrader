<template>
  <div>
       
    <h5> {{editStudentWork.student}}</h5> 
    <h5> {{editStudentWork.grade}} / {{editStudentWork.maxGrade}}</h5> 

    <v-select
          v-model="editStudentWork.database"
          :items="$store.state.databases"
          label="База данных"
          item-text="name"
          item-value="id"
          :readonly="true"
    ></v-select>
        <template v-if="editStudentWork.database != null && editStudentWork.database.id != null ">
        <p>
          <h5>Описание:</h5> 
          {{editStudentWork.database.note}}
        </p>
        <p>
          <h5>Структура:</h5> 
          <span v-html="editStudentWork.database.structure"></span></p>
        </template>
        <h5>Вопросы:</h5>

        <div v-for="(i, index) in editStudentWork.answers " :key="i.index" class="mb-5">
          <div>
             <div style="display:inline-block;font-size:20px" class="mb-3">
                <span >{{index +1}} вопрос </span>
                <v-icon :color="i.isSuccess ? 'success' : 'error'">
                  {{i.isSuccess ? 'mdi-checkbox-marked-circle-outline' :'mdi-close'  }}
                </v-icon>
             </div>
            
            <v-textarea
            label="Описание вопроса"
            outlined
            v-model="i.description"
            rows="1"
            :readonly="true"
            ></v-textarea>

            <v-textarea
            label="Решение студента"
            outlined
            v-model="i.studentAnswer"
            rows="1"
            :readonly="true"
            ></v-textarea>

            <v-textarea
            label="Решение преподавателя"
            outlined
            v-model="i.solution"
            rows="1"
            :readonly="true"
            ></v-textarea>


        <v-select
          :items="complexities"
          item-text="name"
          item-value="id"
          label="Сложность"
          v-model="i.complexity"
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
        {id:1, name:"Легко"},
        {id:2, name:"Терпимо"},
        {id:3, name:"Сложно"},
        {id:4, name:"Это вообще решаемо!?"}
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
                database: {
                    id: null,
                    name: null,
                    note:null,
                    structure: null
                },
                answers:[]
        },
      }
    },

  async created(){
    await this.$store.dispatch("GetDatabasesTeacher");

    this.editStudentWork = await this.$store.dispatch("GetStudentWorkInfoTeacher", this.$route.params.studentWorkId);
    console.log(this.editStudentWork )
  },
  methods:{
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
<template>
  <div>
 

 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-btn
      v-if="isCreate"
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Создать макет
    </v-btn>

    <v-text-field
      required
      :rules="nameRules"
      label="Название макета"
      v-model="editLayoutWork.name"
      :readonly="!isCreate"
    ></v-text-field>

    <v-select
          v-model="editLayoutWork.database"
          :items="$store.state.databases"
          label="База данных"
          item-text="id"
          item-value="id"
          @change ="changeDatabase"
          :rules="databaseRules"
          required
          :readonly="!isCreate"
    ></v-select>
        <template v-if="editLayoutWork.database != null && editLayoutWork.database.id != null ">
        <p>
          <h5>Описание:</h5> 
          {{editLayoutWork.database.note}}
        </p>
        <p>
          <h5>Структура:</h5> 
          <span v-html="editLayoutWork.database.structure"></span></p>
        </template>
        <h5>Вопросы:</h5>

        <div v-for="(i, index) in editLayoutWork.tasks " :key="i.index" class="mb-5">
          <div>
             <div style="display:inline-block;font-size:20px" class="mb-3">
                <span >{{index +1}} вопрос </span>
                <v-icon v-if="isCreate" @click="deleteTask(index)">
                  mdi-close
                </v-icon>
             </div>
            
            <v-textarea
            v-if="isFixed"
            label="Описание вопроса"
            outlined
            required
            v-model="i.description"
            rows="1"
            :rules="requiredRules"
            :readonly="!isCreate"
            ></v-textarea>

            <v-textarea
            v-if="isFixed"
            label="Решение"
            outlined
            required
            :rules="requiredRules"
            v-model="i.solution"
            rows="1"
            :readonly="!isCreate"
            ></v-textarea>

        <v-select
          v-if="isFixed"
          :items="complexities"
          item-text="name"
          item-value="id"
          label="Сложность"
          v-model="i.difficulty"
          required
          :rules="requiredRules"
          :readonly="!isCreate"
        ></v-select>
          </div>
        </div>

        <v-btn v-if="isCreate" text @click="addTask()">
        Добавить вопрос
        </v-btn>

      </v-form>

  </div>
</template>

<script>
export default {
  name: "TeacherLayoutWorkInfo",
  data(){
    return{
      isCreate: false,
      complexities:[
        {id: 'elementary', name:"Элементарно"},
        {id: 'easy', name:"Легко"},
        {id: 'medium', name:"Терпимо"},
        {id: 'hard', name:"Сложно"}
        ],
      valid: true,
      isFixed:true,
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
      editLayoutWork: {
            id: null,
            name: null,
            type: '',
            database: {
              id : null,
              structure : null,
              name : null,
              note: null
            },
            tasks:[]
        },
      }
    },

  async mounted(){
    await this.$store.dispatch("GetDatabasesTeacher");
    this.isCreate = this.$route.params.isCreate == "true";
    this.isFixed = this.$route.params.type == "fixed";

    if(this.isCreate && this.$route.params.layoutWorkId == 0 ){
      this.editLayoutWork = 
      {
        id: null,
        name: null,
        database: {
          id : null,
          structure : null,
          name : null,
          note: null
        },
        tasks:[]
      }
      this.$refs.form.validate()
    }
    else{
      await this.$store.dispatch("GetLayoutWorkInfoTeacher", this.$route.params.layoutWorkId);
      this.editLayoutWork = this.$store.state.layoutWorkInfo
      this.editLayoutWork.database = this.$store.state.databases.filter((x)=> x.id == this.editLayoutWork.database)[0]
    }
    this.editLayoutWork.type = this.$route.params.type;
  },
  methods:{
    async validate () {
        var isOk = this.$refs.form.validate()
        if(isOk){
          if(this.isFixed){
            await this.$store.dispatch("CreateFixedLayoutWorkTeacher", this.editLayoutWork);
          }
          else{
            await this.$store.dispatch("CreateRandomLayoutWorkTeacher", this.editLayoutWork);
          }
        }
      },

    addTask(){
      this.editLayoutWork.tasks.push({
        description: "",
        solution: "",
        difficulty: null
      })
    },

    changeDatabase(a){

      this.editLayoutWork.database = this.$store.state.databases.find(x => x.id == a)
    },

    deleteTask(index){
      this.editLayoutWork.tasks.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
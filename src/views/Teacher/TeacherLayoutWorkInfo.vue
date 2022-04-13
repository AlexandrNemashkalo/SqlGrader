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

        <v-btn v-if="isCreate"  color="primary" small @click="addTask()">
        Добавить новый вопрос
        </v-btn>

        <v-dialog
          v-if="isFixed && isCreate "
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :disabled="editLayoutWork.database.id == null"
              color="primary"
              dark
              class="mx-2"
              v-bind="attrs"
              v-on="on"
              small
            >
              Добавить существующий вопрос
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Добавление существующего вопроса</span>
            </v-card-title>

            <v-card-text>
                <v-select
                v-model="editedItem"
                :items="tasks"
                label="Задание"
                item-text="name"
                item-value="id"
              ></v-select>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-form>

  </div>
</template>

<script>
export default {
  name: "TeacherLayoutWorkInfo",
  data(){
    return{
      isCreate: false,
       dialog: false,
      complexities:[
        {id: 'one', name:"Простой запрос"},
        {id: 'join', name:"JOIN"},
        {id: 'group', name:"Группировка"},
        {id: 'subquery', name:"Подзапросы"}
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

      editedIndex: -1,
      editedItem: {
       
      },
      
      }

      
    },

  async mounted(){
    await this.$store.dispatch("GetDatabasesTeacher");
    this.isCreate = this.$route.params.isCreate == "true";
    this.isFixed = this.$route.params.type == "fixed";

    if(this.isCreate && this.$route.params.layoutWorkId == 0 ){
      await this.$store.dispatch("GetTasksTeacher");
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

  computed:{
    tasks(){
      return this.$store.state.tasks.filter(x => x.database == this.editLayoutWork.database.id)
    }
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
      this.editLayoutWork.tasks = []
      this.editLayoutWork.database = this.$store.state.databases.find(x => x.id == a)
    },

    deleteTask(index){
      this.editLayoutWork.tasks.splice(index, 1)
    },

    close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, null)
          this.editedIndex = -1
        })
      },

      async save () {
        var task =this.$store.state.tasks.filter(x => x.id == this.editedItem)[0]
         this.editLayoutWork.tasks.push({
            id: task.id,
            description: task.description,
            solution: task.solution,
            difficulty: task.difficulty
        })
      
        this.close()
      },

  }
}
</script>

<style scoped>

</style>
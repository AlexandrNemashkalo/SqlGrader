<template>
<div>
 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <v-data-table
    :headers="headers"
    :items="$store.state.tasks"
    sort-by="name"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Задания</v-toolbar-title>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mx-2"
              v-bind="attrs"
              v-on="on"
              small
            >
              Добавить
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Добавление задания</span>
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="editedItem.name"
                    label="Название"
                ></v-text-field>
                <v-text-field
                    v-model="editedItem.description"
                    label="Описание"
                ></v-text-field>
                <v-select
                    v-model="editedItem.database"
                    :items="$store.state.databases"
                    label="База данных"
                    item-text="id"
                    item-value="id"
                    :rules="requiredRules"
                    required
                ></v-select>
                <v-select
                    :items="complexities"
                    item-text="name"
                    item-value="id"
                    label="Сложность"
                    v-model="editedItem.difficulty"
                    required
                    :rules="requiredRules"
                ></v-select>
                <v-textarea
                    label="Решение"
                    outlined
                    required
                    :rules="requiredRules"
                    v-model="editedItem.solution"
                    rows="3"
                ></v-textarea>
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
        <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>  
      </v-toolbar>
    </template>
     <template v-slot:item.actions="{ item }">
      <v-icon
        @click="deleteTask(item.id)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
  </v-form>
</div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      search: '',
      dialogDelete:false,
      valid: true,
        complexities:[
        {id: 'one', name:"Простой запрос"},
        {id: 'join', name:"JOIN"},
        {id: 'group', name:"Группировка"},
        {id: 'subquery', name:"Подзапросы"}
        ],
      headers: [
        { text: 'Название', align: 'start' , value:"name"},
        { text: 'База данных' , value:"database"},
        { text: 'Описание' , value:"description"},
        { text: 'Решение' , value:"solution"},
        { text: 'Сложность' , value:"difficulty"},
        { text: 'Действия' , value:"actions"},
      ],
      requiredRules: [
        v => !!v || 'Is required',
      ],

      editedIndex: -1,
      editedItem: {
        name: '',
        database:'',
        difficulty:'',
        description:'',
        solution:''
      },
      defaultItem: {
        name: '',
        database:'',
        difficulty:'',
        description:'',
        solution:''
      },
    }),

    async mounted(){
      await this.$store.dispatch("GetDatabasesTeacher");
      await this.$store.dispatch("GetTasksTeacher");
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
      },

      async deleteTask(taskId){
        this.editedIndex = taskId;
        this.dialogDelete = true
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedIndex = -1
        })
      },

      async deleteItemConfirm () {
        await this.$store.dispatch("DeleteTaskTeacher", this.editedIndex);
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        var isOk = this.$refs.form.validate()
        if(isOk){
            await this.$store.dispatch("CreateTaskTeacher", this.editedItem);
            this.close()
        }
      },
    },
  }
</script>
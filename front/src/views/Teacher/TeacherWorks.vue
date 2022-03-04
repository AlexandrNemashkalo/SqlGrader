<template>
<div>

<v-data-table
    :headers="headers"
    :items="$store.state.works"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Контрольные работы</v-toolbar-title>
         
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
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
        <v-dialog
          v-model="dialog"
          max-width="800px"
        >
         <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Опубликовать контрольную
            </v-btn>
          </template>
          <v-card >
           <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
            <v-card-title>
              <span class="text-h5">Редактирование контрольной работы </span>
            </v-card-title>

            <v-card-text>  
              <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                      :rules="nameRules"
              ></v-text-field>
                 
              <v-select
                v-model="editedItem.layoutWork"
                :items="$store.state.layoutWorks"
                label="Макет"
                item-text="name"
                item-value="id"
                @change ="changeLayoutWork"
                :rules="layoutWorkRules"
              ></v-select>

              <v-datetime-picker label="Дата и время начала контрольной" v-model="editedItem.start">
                <template v-slot:timeIcon="{  }">
                    <v-icon>
                        mdi-clock-outline
                    </v-icon>
                </template>
                <template v-slot:dateIcon="{  }">
                    <v-icon>
                        mdi-calendar
                    </v-icon>
                </template>
              </v-datetime-picker>

              <v-datetime-picker label="Дата и время окончания контрольной" v-model="editedItem.deadlin">
                <template v-slot:timeIcon="{  }">
                    <v-icon>
                        mdi-clock-outline
                    </v-icon>
                </template>
                <template v-slot:dateIcon="{  }">
                    <v-icon>
                        mdi-calendar
                    </v-icon>
                </template>
              </v-datetime-picker>

              <v-combobox
                v-model="editedItem.groups"
                :items="groups"
                label="Назначенные группы"
                multiple
                chips
              ></v-combobox>

              <v-combobox
                v-model="editedItem.emails"
                label="Студенты"
                multiple
                chips
              ></v-combobox>

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
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.layoutWork="{ item }">
      <v-btn @click="goToLayoutWork(item.layoutWork.id)">{{item.layoutWork.name}}</v-btn>
    </template>

    <template v-slot:item.start="{ item }">
      <div>{{getFormatDate(item.start)}}</div>
      <div>{{getFormatDate(item.deadline)}}</div>
    </template>

    <template v-slot:item.assignments="{ item }">
        <v-chip v-for ="(assignment, index) in item.groups" :key="index">
        <v-icon small class="mr-1">
            mdi-account-group
        </v-icon>
        {{ assignment}}
        </v-chip>
        <v-chip v-for ="(assignment, index) in item.emails" :key="(index+1)*-1">
        <v-icon small class="mr-1">
           mdi-account
        </v-icon>
        {{ assignment}}
        </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn
          v-if="item.state!='created'"
          icon
          @click="getWorkInfo(item.id)"
        >
         <v-icon>mdi-eye</v-icon>
      </v-btn>

      <v-btn
          icon
          @click="editWork(item)"
        >
         <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn
          v-if="item.state=='created'"
          icon
          @click="startWork(item)"
        >
         <v-icon>mdi-play-box-outline</v-icon>
      </v-btn>

      <v-btn
          v-if="item.state=='created' || item.state=='running'"
          icon
          @click="cancelWork(item)"
        >
         <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>

      <v-btn
          icon
          @click="deleteWork(item)"
        >
         <v-icon>mdi-delete</v-icon>
      </v-btn>

    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>

</div>
</template>

<script>
import moment from 'moment'

export default {
  name: "TeacherWorks",
  data(){
    return{
      valid: true,
      editedIndex: null,
      groups:[
          "БИВ195",
          "БИВ194",
          "БИВ193",
          "БИВ192",
      ],
      dialog: false,
      dialogDelete: false,
       headers: [
        { text: 'Название', align: 'start',value: 'name'},
        //{ text: 'Макет', value: 'layoutWork', sortable: false },
        { text: 'Время выполнения', value: 'start', sortable: false },
        { text: 'Назначено', value: 'assignments', sortable: false },
        { text: 'Статус', value: 'state', sortable: false },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
       nameRules: [
        v => !!v || 'Name is required',
      ],
      layoutWorkRules: [
        v => !!v || 'LayoutWork is required',
        v => !!v.id || 'LayoutWork is required',
      ],
      reveal: false,
      searchId:null,
      elevation:0,
      model: null,
      editedIndex: -1,
      editedItem: {
        name: null,
        layoutWork: {
            id: null,
            name: null
        },
        start: null,
        deadline: null,
        groups: [],
        emails: []
      },
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  created(){
    window.addEventListener('scroll', this.handleScroll);
  },

  async mounted(){
    await this.$store.dispatch("GetWorksTeacher");
  },

  methods:{
    async getWorkInfo(workId){
        this.$router.push("works/"+ workId)
    },

    handleScroll (event) {
      if(window.scrollY > 0){
        this.elevation = 5
      }else {
        this.elevation = 0
      }
    },

    async deleteWork(layoutWorkId){
        this.editedIndex = layoutWorkId;
        this.dialogDelete = true
    },

    closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedIndex = -1
        })
    },

    async deleteItemConfirm () {
        await this.$store.dispatch("DeleteLayoutWorkTeacher", this.editedIndex);
        this.closeDelete()
      },

      initialize () {
      },

      editWork (item) {

        this.editedItem = Object.assign({}, item)
        if(this.editedItem.start != null){
            this.editedItem.start = this.getFormatDate(this.editedItem.start)
        }
        if(this.editedItem.deadline != null){
            this.editedItem.deadline = this.getFormatDate(this.editedItem.deadline)
        }
        this.dialog = true
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          //this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if(this.$refs.form.validate()){
            console.log(this.editedItem)
        await this.$store.dispatch("CreateWorkTeacher", this.editedItem);
        this.close()
        }
      },

      changeLayoutWork(a){
            this.editedItem.layoutWork = this.$store.state.layoutWorks.find(x => x.id == a)
      },

      getFormatDate(date){
          return moment(date).format("YYYY-MM-DD HH:mm")
      },
      goToLayoutWork(layoutWorkId){
          this.$router.push("layoutworks/" + false + "/" + layoutWorkId)
      }
  }
}
</script>

<style scoped>

</style>
<template>
<div>

<v-data-table
    :headers="headers"
    :items="$store.state.works"
    sort-by="name"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Контрольные работы</v-toolbar-title>
        <v-dialog
          v-model="dialog"
          max-width="800px"
        >
         <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              class="ml-2 mr-2"
              dark
              v-bind="attrs"
              v-on="on"
              small
            >
              Создать
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

              <v-checkbox
                 v-if="editedIndex ==-1"
                 v-model="editedItem.isFixed"
                  @click="clearLayouts()"
                :label="`Fixed`"
              ></v-checkbox>  

              <v-select
                :readonly="editedIndex != -1"
                v-model="editedItem.layout_works"
                :items="layoutWorks"
                label="Макет"
                item-text="name"
                item-value="id"
                multiple
                chips
                :rules="layoutWorkRules"
              >
                <template v-if="editedItem.isFixed" v-slot:prepend-item>
                  <v-list-item
                    ripple
                    @mousedown.prevent
                    @click="toggle"
                  >
                    <v-list-item-action>
                      <v-icon :color="editedItem.layout_works.length > 0 ? '#652cd4' : ''">
                        {{ icon }}
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        Select All
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>

              <v-datetime-picker label="Дата и время начала контрольной" type="datetime-local" v-model="editedItem.start">
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

              <v-datetime-picker label="Дата и время окончания контрольной" type="datetime-local"  v-model="editedItem.deadline">
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
                :items="$store.state.groups"
                label="Назначенные группы"
                item-value="name"
                item-text="name"
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
        
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-dialog v-model="dialogCancel" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to cancel this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeCancel">NO</v-btn>
              <v-btn color="blue darken-1" text @click="cancelItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
      </v-toolbar>
    </template>
    <template v-slot:item.layoutWorkIds="{ item }">
      <v-chip v-for ="(layout, index) in item.layout_works" :key="index"
      small
      class="mr-1 mb-1"
      @click="goToLayoutWork(layout.id)"
      >
        {{ layout.name}}
      </v-chip>
    </template>

    <template v-slot:item.start="{ item }">
      <div>{{getFormatDate(item.start)}}</div>
      <div>{{getFormatDate(item.deadline)}}</div>
    </template>

    <template v-slot:item.assignments="{ item }">
        <v-chip v-for ="(assignment, index) in item.groups" :key="index"
          small
          class="mr-1 mb-1">
        <v-icon small class="mr-1">
            mdi-account-group
        </v-icon>
        {{ assignment}}
        </v-chip>
        <v-chip v-for ="(assignment, index) in item.emails" :key="(index+1)*-1"
          small
          class="mr-1 mb-1">
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
          v-if="item.state=='created'"
          icon
          @click="editWork(item)"
        >
         <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn
          v-if="item.state=='created' || item.state=='running'"
          icon
          @click="cancelWork(item.id)"
        >
         <v-icon>mdi-close-circle-outline</v-icon>
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
      search: '',
      dialog: false,
      dialogCancel: false,
       headers: [
        { text: 'Название', align: 'start',value: 'name'},
        { text: 'Макеты', value: 'layoutWorkIds', sortable: false },
        { text: 'Время выполнения', value: 'start', sortable: true },
        { text: 'Назначено', value: 'assignments', sortable: false },
        { text: 'Статус', value: 'state', sortable: true },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
       nameRules: [
        v => !!v || 'Name is required',
      ],
      layoutWorkRules: [
        v => !!v || 'LayoutWork is required',
        v => v.length > 0 || 'LayoutWork is required',
      ],
      reveal: false,
      searchId:null,
      elevation:0,
      model: null,
      editedIndex: -1,
      editedItem: {
        isFixed: true,
        id: null,
        name: null,
        start: null,
        deadline: null,
        groups: [],
        emails: [],
        layout_works:[]
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
    await this.$store.dispatch("GetGroupsTeacher");
  },

  computed: {
      layoutWorks(){
        return this.$store.state.layoutWorks.filter(layoutWork => this.editedItem.isFixed == (layoutWork.type == "fixed") );
      },
      likesAllFruit () {
        return this.editedItem.layout_works.length === this.$store.state.layoutWorks.length
      },
      likesSomeFruit () {
        return this.editedItem.layout_works.length > 0 && !this.likesAllFruit
      },
      icon () {
        if (this.likesAllFruit) return 'mdi-close-box'
        if (this.likesSomeFruit) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
  },
  methods:{
    clearLayouts(){
        this.editedItem.layout_works = []
      },
    toggle () {
        this.$nextTick(() => {
          if (this.likesAllFruit) {
            this.editedItem.layout_works = []
          } else {
            this.editedItem.layout_works = this.$store.state.layoutWorks.slice()
          }
        })
      },
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

    async cancelWork(workId){
        this.editedIndex = workId;
        this.dialogCancel = true
    },

    closeCancel () {
        this.dialogCancel = false
        this.$nextTick(() => {
          this.editedIndex = -1
        })
    },

    async cancelItemConfirm () {
        await this.$store.dispatch("CancelWorkTeacher", this.editedIndex);
        this.closeCancel()
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
          this.editedIndex = -1
          this.editedItem.id = null
        })
      },

      async save () {
        if(this.$refs.form.validate()){
          console.log(this.editedItem)
          if(this.editedItem.layout_works.length > 0 && typeof this.editedItem.layout_works[0] == "object"  ){
            this.editedItem.layout_works = this.editedItem.layout_works.map(x => x.id)
          }
          if(this.editedItem.id == null)
          {
             if(this.editedItem.start != null){
                this.editedItem.start = moment(this.editedItem.start).add(3, 'hours').toISOString()
             }
              if(this.editedItem.deadline != null){
                this.editedItem.deadline = moment(this.editedItem.deadline).add(3, 'hours').toISOString()
              }
            await this.$store.dispatch("CreateWorkTeacher", this.editedItem);
          }
          else
          {
              if(this.editedItem.start != null){
                this.editedItem.start = moment(this.editedItem.start).add(3, 'hours').toISOString()
              }
              if(this.editedItem.deadline != null){
                this.editedItem.deadline = moment(this.editedItem.deadline).add(3, 'hours').toISOString()
              }
             await this.$store.dispatch("PatchWorkTeacher", this.editedItem);
          }
        this.close()
        }
      },

      getLayoutWorkName(id){
            return this.$store.state.layoutWorks.find(x => x.id == a).name
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
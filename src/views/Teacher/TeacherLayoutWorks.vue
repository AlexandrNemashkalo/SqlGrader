<template>
<div>

<v-data-table
    :headers="headers"
    :items="$store.state.layoutWorks"
    sort-by="name"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Макеты контрольных работ</v-toolbar-title>
        
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                class="mx-2"
                dark
                v-bind="attrs"
                v-on="on"
                small
              >
                Создать
              </v-btn>
            </template>
            <v-list>
              <v-list-item  @click="createLayoutWork('fixed')">
                <v-list-item-title>fixed</v-list-item-title>
              </v-list-item>
              <v-list-item  @click="createLayoutWork('randomized')">
                <v-list-item-title>randomized</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

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
        class="mr-2"
        @click="getLayoutWorkInfo(item)"
      >
        mdi-eye 
      </v-icon>

      <v-icon
        v-if="item.type=='fixed'"
        class="mr-2"
        @click="copyAndCreateLayoutWork(item.id)"
      >
        mdi-content-copy
      </v-icon>

      <v-icon
        @click="deleteLayoutWork(item.id)"
      >
        mdi-delete
      </v-icon>

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
export default {
  name: "TeacherLayoutWorks",
  data(){
    return{
      editedIndex: null,
      dialog: false,
      search:'',
      dialogDelete: false,
       headers: [
        { text: 'Название', align: 'start',value: 'name'},
        { text: 'База данных', value: 'database', sortable: false },
        { text: 'Тип', value: 'type', sortable: false },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      reveal: false,
      searchId:null,
      elevation:0,

      model: null,
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  created(){
    window.addEventListener('scroll', this.handleScroll);
  },

  async mounted(){
    await this.$store.dispatch("GetLayoutWorksTeacher");
  },

  methods:{
    initialize () {
    },
    async createLayoutWork(type){
        this.$router.push("layoutworks/" + true+ "/0/" + type )
    }, 

    async getLayoutWorkInfo(layoutWork){
        this.$router.push("layoutworks/" + false + "/" + layoutWork.id + "/" + layoutWork.type)
    }, 

    async copyAndCreateLayoutWork(layoutWorkId){
        this.$router.push("layoutworks/" + true + "/" + layoutWorkId)
    },

    onChange: function (e){
      if(e != null)
      this.searchId = e.value;
      else
        this.searchId = null
    },

    handleScroll (event) {
      if(window.scrollY > 0){
        this.elevation = 5
      }else {
        this.elevation = 0
      }
    },

    async deleteLayoutWork(layoutWorkId){
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
  }
}
</script>

<style scoped>

</style>
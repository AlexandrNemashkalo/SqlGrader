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
      </v-toolbar>
    </template>

    <template v-slot:item.grade="{ item }">
      <div v-if="item.grade != null">{{item.grade}} / {{item.maxGrade}}</div>
    </template>

    <template v-slot:item.dateOfStart="{ item }">
      <div>{{getFormatDate(item.dateOfStart)}}</div>
      <div>{{getFormatDate(item.dateOfEnd)}}</div>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon  class="mr-2" @click="getStudentWorkInfo(item.id)">
        mdi-eye 
      </v-icon>

      <v-icon class="mr-2" @click="editStudentWork(item)">
        mdi-pencil
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

//import moment from 'moment'
export default {
  name: "StudentWorks",
  data(){
    return{
       headers: [
        { text: 'Название', align: 'start',value: 'name'},
        { text: 'Время выполнения', value: 'dateOfStart', sortable: false },
        { text: 'Статус', value: 'status', sortable: false },
        { text: 'Оценка', value: 'grade', sortable: false },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      elevation:0,

    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  created(){
    window.addEventListener('scroll', this.handleScroll);
    this.$store.dispatch("GetWorksStudent");
  },

  methods:{
    async getStudentWorkInfo(studentWorkId){
        this.$router.push("works/"+ studentWorkId)
    },

    async editStudentWorkInfo(studentWorkId){
        this.$router.push("works/"+ studentWorkId)
    },

    handleScroll (event) {
      if(window.scrollY > 0){
        this.elevation = 5
      }else {
        this.elevation = 0
      }
    },

    initialize () {
    },

    getFormatDate(date){
      return "" //moment(date).format("YYYY-MM-DD HH:mm")
    },
  }
}
</script>

<style scoped>

</style>
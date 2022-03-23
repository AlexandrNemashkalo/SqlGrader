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

    <template v-slot:item.dates="{ item }">
      <div>{{getFormatDate(item.work.start)}}</div>
      <div>{{getFormatDate(item.work.deadline)}}</div>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn
          v-if="item.work.state=='ended'"
          icon
          @click="getStudentWorkInfo(item.id)"
        >
         <v-icon>mdi-eye</v-icon>
      </v-btn>

      <v-btn
         v-if="item.state=='running' || true"
          icon
          @click="editStudentWorkInfo(item.id)"
        >
         <v-icon>mdi-pencil</v-icon>
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
  name: "StudentWorks",
  data(){
    return{
       headers: [
        { text: 'Название', align: 'start',value: 'work.name'},
        { text: 'Время выполнения', value: 'dates', sortable: false },
        { text: 'Статус', value: 'work.state', sortable: false },
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
  },

  async mounted(){
    await this.$store.dispatch("GetWorksStudent");
  },

  methods:{
    async getStudentWorkInfo(studentWorkId){
        this.$router.push("works/false/"+ studentWorkId)
    },

    async editStudentWorkInfo(studentWorkId){
        this.$router.push("works/true/"+ studentWorkId)
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
      return moment(date).format("YYYY-MM-DD HH:mm")
    },
  }
}
</script>

<style scoped>

</style>
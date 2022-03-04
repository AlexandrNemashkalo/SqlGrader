<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.workInfo.studentWorks"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:item.dateOfDownload="{ item }">
      <div>{{getFormatDate(item.dateOfDownload)}}</div>
    </template>

    <template v-slot:item.grade="{ item }">
      <div>{{item.grade}} / {{$store.state.workInfo.maxGrade}}</div>
    </template>
    
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Работы студентов по "{{$store.state.workInfo.name}}"</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
     <v-icon class="mr-2" @click="getStudentWorkInfo(item.id)">
        mdi-eye 
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
</template>

<script>
import moment from 'moment';

  export default {
    data: () => ({
      headers: [
        { text: 'Email студента',align: 'start', value: 'student' },
        { text: 'Дата загрузки', value: 'dateOfDownload', sortable: false },
        { text: 'Оценка', value: 'grade', sortable: false },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
    }),

    async mounted(){
        await this.$store.dispatch("GetWorkInfoTeacher", this.$route.params.workId  );
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
      },

      getStudentWorkInfo(studentWorkId){
       this.$router.push("/teacher/studentWork/" + studentWorkId)
      },
      
      getFormatDate(date){
          return moment(date).format("YYYY-MM-DD HH:mm")
      },
    },
  }
</script>
<template>
  <v-data-table
    :headers="headers"
    :items="$store.state.workInfo != null ? $store.state.workInfo.student_works : []"
    sort-by="name"
    class="elevation-1"
    :search="search"
    :items-per-page="1000"
  >
    <template v-slot:item.grade="{ item }">
      <div>{{item.grade}}</div>
    </template>
    
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title v-if="$store.state.workInfo != null">
          Работы студентов по "{{$store.state.workInfo.name}}"
          </v-toolbar-title>
        
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
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
      search:'',
      headers: [
        { text: 'ФИО студента', align: 'start', value: 'user.full_name' },
        { text: 'Email студента',align: 'start', value: 'user.email' },
        { text: 'Оценка', value: 'grade', sortable: true },
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
      
    },
  }
</script>
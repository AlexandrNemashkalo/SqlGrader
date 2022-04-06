<template>
<div>
  <v-data-table
    :headers="headers"
    :items="this.$store.state.students"
    sort-by="name"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Студенты</v-toolbar-title>
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
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        { text: 'Email', align: 'start' , value:"email"},
        { text: 'ФИО',  value:"full_name"},
        { text: 'Группа',  value:"group"},
        { text: 'Дата добавления',  value:"created_at"},
      ],
    }),

    async mounted(){
      await this.$store.dispatch("GetStudentsTeacher");
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
      },
    },
  }
</script>
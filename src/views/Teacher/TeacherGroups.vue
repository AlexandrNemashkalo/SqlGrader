<template>
<div>
  <v-data-table
    :headers="headers"
    :items="groups"
    sort-by="name"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Группы</v-toolbar-title>


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
              <span class="text-h5">Добавление группы</span>
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="editedItem.name"
                    label="Name"
                ></v-text-field>
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

        
      </v-toolbar>
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
        { text: 'Название', align: 'start' , value:"name"},
      ],

      editedIndex: -1,
      editedItem: {
        name: '',
         
      },
      defaultItem: {
        name: '',
      },
    }),


    async mounted(){
      await this.$store.dispatch("GetGroupsTeacher");
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    computed: {
      groups () {
        return this.$store.state.groups.map(x => { return {name:x}})
      },
    },

    methods: {
      initialize () {
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        await this.$store.dispatch("CreateGroupTeacher", this.editedItem);
        this.close()
      },
    },
  }
</script>
<template>
<div>
  <v-data-table
    :headers="headers"
    :items="$store.state.databases"
    sort-by="name"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:item.structure="{ item }" >
      <div  v-html="item.structure"></div>
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Базы данных</v-toolbar-title>
        <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      
        <v-dialog
          v-model="dialog"
          max-width="800px"
        >
          <v-card>
            <v-card-title class="mb-5">
              <span class="text-h5">Редактирование описания бд </span>
            </v-card-title>
           
            <v-card-text >  

            <v-textarea
            label="Описание"
            outlined
            v-model="editedItem.note"
            rows="3"
            ></v-textarea>

              <p>Структура</p>
              <rich-text-editor :height="300" :buttonsDisplay="{cancel:false, valid:false, imageButton:false, linkButton:false  }"  v-model="editedItem.structure"/>

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
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="mr-2"
        @click="editItem(item)"
      >
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
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      headers: [
        { text: 'Название', align: 'start', value: 'id',
        },
        { text: 'Описание', value: 'note', sortable: false,width: "30%" },
        { text: 'Структура', value: 'structure', sortable: false,  },
        { text: 'Действия', value: 'actions', sortable: false },
      ],

      editedIndex: -1,
      editedItem: {
        id: null,
        name: '',
        note: '',
        structure: '',  
      },
      defaultItem: {
        name: '',
        note: '',
        structure: ''
      },
    }),


    async mounted(){
      await this.$store.dispatch("GetDatabasesTeacher");
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

      editItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        await this.$store.dispatch("PatchDatabaseTeacher", this.editedItem);
        this.close()
      },
    },
  }
</script>
/* eslint-disable */
<template>
  <div>
    <Nav></Nav>
    <b-container>
      <b-row>
        <b-col>
          <b-table
            selectable
            :select-mode="selectMode"
            selectedVariant="success"
            :fields="fields"
            :items="documents"
            @row-selected="rowSelected"
            show-empty
          >
            <template slot="empty" slot-scope="scope">
              <h4>No documents</h4>
            </template>
            <template slot="thead-top" slot-scope="data"></template>
          </b-table>
          <b-button variant="primary" v-on:click="open">Open</b-button>
          <b-button variant="danger" v-on:click="deleteDoc">Delete</b-button>
        </b-col>
        <b-col>
          <br><br>
          <textarea style="height:auto" rows="16" class='form-control' v-model='openedFile'></textarea>
          <br>
          <b-button variant="primary" v-on:click="saveChanges">Save changes</b-button>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
  import Nav from './Nav'
  import Service from '../service/PostService'

  export default {
    name: "Documents",
    components: {Nav},
    data() {
      return {
        selectMode: 'single',
        documents: [],
        fields: [
          {key: "title", label: "Title"},
          {key: "creation", label: "Created"},
          {key: "modification", label: "Last modification"}
        ],
        selected: {},
        openedFile: ''
      }
    },
    mounted() {
      this.getDocuments();
    },
    methods: {
      async getDocuments() {
        const response = await Service.fetchdocuments();
        this.documents = response.data.documents;
      },
      rowSelected(item) {
        this.selected = item[0];
      },

      async open() {
        const response = await Service.getDocument({
          id: this.selected._id
        });
        this.openedFile = response.data.text;
      },

      async deleteDoc() {
        await Service.deleteDocument(this.selected._id);
        this.getDocuments();
      },

      async saveChanges() {
        await Service.updateDocument({
          id: this.selected._id,
          title: this.selected.title,
          text: this.openedFile
        });
        this.openedFile = '';
      }

    }
  }
</script>

<style scoped>

</style>

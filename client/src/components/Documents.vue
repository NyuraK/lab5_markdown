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
          <b-card>
            <b-card-text>
              {{openedFile}}
            </b-card-text>
          </b-card>
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
        // let doc = {
        //   _id: Number,
        //   title: String,
        //   creation: Date,
        //   modification: Date
        // };
        // for (let i=0; i<temp.length; i++) {
        //   doc._id = temp[i]._id;
        //   doc.title = temp[i].title;
        //   doc.creation = new Date(temp[i].creation);
        //   doc.modification = new Date(temp[i].creation);
        //   temp2.push(doc);
        // }
        this.documents = response.data.documents;
      },
      rowSelected(item) {
        this.selected = item[0]._id;
      },

      async open() {
        const response = await Service.getDocument({
          id: this.selected
        });
        this.openedFile = response.data.text;
      },

      async deleteDoc() {
        await Service.deleteDocument(this.selected);
        this.getDocuments();
      }

    }
  }
</script>

<style scoped>

</style>

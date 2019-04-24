<template>
  <b-container>
    <b-form>
      <b-form-input
        type="text"
        v-model="title"
        requred
        placeholder="Enter file name to save"/>
      <b-row>
        <b-col>
          <h2 class="text-success text-center">Enter Markdown Text</h2>
          <textarea style="height:auto" rows="16" class='form-control' v-model='md_text'></textarea>
        </b-col>
        <b-col>
          <h2 class="text-success text-center">Preview</h2>
          <div class="well well-sm pre-scrollable" v-html='previewText'></div>
        </b-col>
      </b-row>
    </b-form>
    <b-button type="submit" variant="primary" v-on:click="save">Save</b-button>
  </b-container>
</template>
<script>
  import DocumentService from "../service/PostService";

  let marked = require('marked');
  export default {
    name: 'Markdown',
    data() {
      return {
        md_text: '# Title',
        title: ''
      }
    },
    computed: {
      previewText() {
        marked.setOptions({
          renderer: new marked.Renderer(),
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: false,
          sanitize: true,
          smartLists: true,
          smartypants: false
        });
        return marked(this.md_text)
      }
    },
    methods: {
      save: function () {
        if (this.title !== "" && this.md_text !== "") {
          DocumentService.addNewDocument({
            title: this.title,
            text: this.md_text
          });
          this.title ='';
          this.md_text='';
        } else {
          alert("Empty fields!");
        }
      }
    }
  }
</script>

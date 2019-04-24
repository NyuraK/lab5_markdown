<template>
  <v-data-table
    :headers="headers"
    :items="documents"
    class="elevation-1"
  >
  </v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Document',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Author', value: 'author' }
        ],
        documents: []
      }
    }
  }
</script>

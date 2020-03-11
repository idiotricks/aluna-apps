<template>
  <div>
    <b-table
      v-if="stockIns"
      striped
      bordered
      hover
      :items="stockIns"
      :fields="fields"
      @row-clicked="onSelected"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'stock-in-list',
  props: [
    'stockIns'
  ],
  data () {
    return {
      fields: [
        'numcode',
        'date'
      ]
    }
  },
  methods: {
    onSelected (stockIn, index, event) {
      this.$emit('onSelected', stockIn)
    }
  }
}
</script>

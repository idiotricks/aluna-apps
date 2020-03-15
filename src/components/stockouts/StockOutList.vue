<template>
  <div>
    <b-table
      v-if="stockOuts"
      striped
      bordered
      hover
      :items="stockOuts"
      :fields="fields"
      @row-clicked="onSelected"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'stock-out-list',
  props: [
    'stockOuts'
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
    onSelected (stockOut, index, event) {
      this.$emit('onSelected', stockOut)
    }
  }
}
</script>

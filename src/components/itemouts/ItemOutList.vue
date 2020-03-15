<template>
  <div>
    <b-table
      v-if="itemOuts"
      striped
      bordered
      hover
      :items="itemOuts"
      :fields="fields"
      @row-clicked="onSelected"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'item-out-list',
  props: [
    'itemOuts'
  ],
  data () {
    return {
      fields: [
        'product_name',
        'quantity'
      ]
    }
  },
  methods: {
    onSelected (itemOut, index, event) {
      this.$emit('onSelected', itemOut)
    }
  }
}
</script>

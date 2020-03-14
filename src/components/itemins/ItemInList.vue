<template>
  <div>
    <b-table
      v-if="itemIns"
      striped
      bordered
      hover
      :items="itemIns"
      :fields="fields"
      @row-clicked="onSelected"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'item-in-list',
  props: [
    'itemIns'
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
    onSelected (itemIn, index, event) {
      this.$emit('onSelected', itemIn)
    }
  }
}
</script>

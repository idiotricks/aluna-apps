<template>
  <div>
    <b-table
      v-if="products"
      striped
      bordered
      hover
      :items="products"
      :fields="fields"
      @row-clicked="onSelected"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'product-list',
  props: [
    'products'
  ],
  data () {
    return {
      fields: [
        'numcode',
        'name',
        'cogs',
        'price',
        'stock'
      ]
    }
  },
  methods: {
    onSelected (product, index, event) {
      this.$emit('onSelected', product)
    }
  }
}
</script>

<template>
  <div>
    <b-table
      v-if="suppliers"
      striped
      bordered
      hover
      :items="suppliers"
      :fields="fields"
      @row-clicked="onSelected"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'supplier-list',
  props: [
    'suppliers'
  ],
  data () {
    return {
      fields: [
        'numcode',
        'name',
        'phone'
      ]
    }
  },
  methods: {
    onSelected (supplier, index, event) {
      this.$emit('onSelected', supplier)
    }
  }
}
</script>

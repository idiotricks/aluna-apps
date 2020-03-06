<template>
  <div>
    <b-table
      v-if="customers"
      striped
      bordered
      hover
      :items="customers"
      :fields="fields"
      @row-clicked="onSelected"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'customer-list',
  props: [
    'customers'
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
    onSelected (customer, index, event) {
      this.$emit('onSelected', customer)
    }
  }
}
</script>

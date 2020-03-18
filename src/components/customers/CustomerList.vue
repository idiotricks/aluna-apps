<template>
  <div>
    <b-table
      bordered
      hover
      striped
      :items="objs"
      :fields="fields"
      @row-clicked="take"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'customer-edit',
  props: ['objs', 'fields'],
  methods: {
    take (item, index, event) {
      this.$emit('take', item, index, event)
    }
  }
}
</script>

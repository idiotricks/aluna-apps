<template>
    <b-table
      head-variant="light"
      select-mode="single"
      selectable
      selected-variant="primary"
      hover
      :busy="objs.length < 1"
      :items="objs"
      :fields="fields"
      @row-clicked="take"
    >
      <template v-slot:cell(is_calculate)="data">
        <b-badge v-if="data.item.is_calculate" variant="success">sudah naik</b-badge>
        <b-badge v-if="!data.item.is_calculate" variant="warning">belum dinaikan</b-badge>
      </template>
      <template v-slot:table-busy>
        Data not yet available!
      </template>
    </b-table>
</template>

<script>
export default {
  name: 'stock-out-list',
  props: ['objs', 'fields'],
  methods: {
    take (item, index, event) {
      this.$emit('take', item, index, event)
    }
  }
}
</script>

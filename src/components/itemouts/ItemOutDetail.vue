<template>
  <div>
    <b-table
      stacked
      borderless
      :items="[obj]"
      :fields="fields"
      :busy="!obj"
    >
      <template v-slot:table-busy>
        Data not yet available!
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'item-out-detail',
  props: ['obj', 'fields']
}
</script>

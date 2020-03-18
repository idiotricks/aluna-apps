<template>
  <div>
    <div v-if="obj">
      <b-table stacked :items="[obj]" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stock-out-detail',
  props: ['obj', 'fields']
}
</script>

<style>

</style>

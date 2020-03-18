<template>
  <div>
    <div v-if="obj">
      <b-table :items="[obj]" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-detail',
  props: ['obj', 'fields']
}
</script>

<style>

</style>

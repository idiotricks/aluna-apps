<template>
  <div v-if="totalRows">
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      @change="paginate"
    />
  </div>
</template>

<script>
export default {
  name: 'ui-common-pagination',
  props: ['totalRows', 'currentPage'],
  data () {
    return {
      perPage: 10
    }
  },
  methods: {
    paginate (page) {
      this.$emit('paginate', page)
    }
  }
}
</script>

<style>

</style>

<template>
  <b-pagination
    v-if="totalRows"
    v-model="currPage"
    size="sm"
    :total-rows="totalRows"
    :per-page="perPage"
    @change="paginate"
  />
</template>

<script>
export default {
  name: 'ui-common-pagination',
  props: ['totalRows', 'currentPage'],
  data () {
    return {
      perPage: 10,
      currPage: 1
    }
  },
  methods: {
    paginate (page) {
      this.$emit('paginate', page)
    }
  },
  watch: {
    currentPage (value) {
      this.currPage = value
    }
  }
}
</script>

<style>

</style>

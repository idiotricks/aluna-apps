<template>
  <div v-if="totalRows">
    <b-pagination
      v-model="currPage"
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

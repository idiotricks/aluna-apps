<template>
  <div v-if="count">
    <b-pagination
      v-model="currentPage"
      :total-rows="count"
      :per-page="perPage"
      @change="onPaginate"
    >
    </b-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination-template',
  props: [
    'count',
    'currentPage'
  ],
  data () {
    return {
      perPage: 10
    }
  },
  methods: {
    onPaginate (page) {
      this.$emit('onPaginate', page)
    }
  }
}
</script>

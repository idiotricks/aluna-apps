<template>
  <div>
    <div>
      <input
        type="text"
        placeholder="Search"
        aria-label="Search"
        v-model="q"
        class="form-control"
        @keypress.enter="search"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ui-common-search',
  data () {
    return {
      q: ''
    }
  },
  methods: {
    search () {
      this.$emit('search', this.q)
    }
  }
}
</script>

<style>

</style>

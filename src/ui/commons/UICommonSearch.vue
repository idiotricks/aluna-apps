<template>
  <div>
    <div>
      <b-form-input
        type="text"
        :placeholder="placeholder"
        v-model="q"
        class="form-control"
        @change="search"
      >
      </b-form-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ui-common-search',
  data () {
    return {
      q: '',
      placeholder: 'Pencarian'
    }
  },
  methods: {
    search () {
      this.placeholder = this.q || 'Pencarian'
      this.$emit('search', this.q)
    }
  }
}
</script>

<style>

</style>

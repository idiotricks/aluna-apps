<template>
  <div>
    <div class="form-group">
      <input
        class="form-control mr-4"
        type="search"
        placeholder="Search"
        aria-label="Search"
        v-model="search"
        @keypress.enter="onSearch"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-template',
  data () {
    return {
      search: '',
      isPublish: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: true, text: 'Is Publish' },
        { value: false, text: 'Draft' }
      ]
    }
  },
  methods: {
    onSearch () {
      this.$emit('onSearch', this.search)
    }
  }
}
</script>

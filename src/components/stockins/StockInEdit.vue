<template>
  <div>
    <div v-if="lodat">
      <div class="form-group">
        <label>Tanggal</label>
        <b-form-datepicker
          v-model="lodat.date"
          class="mb-2"
          locale="id"
          @input="edit(lodat.id, 'date', lodat.date)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stock-in-edit',
  props: ['obj'],
  data () {
    return {
      lodat: this.obj
    }
  },
  methods: {
    edit (id, field, value) {
      this.$emit('edit', id, field, value)
    }
  },
  watch: {
    obj: {
      handler (n, o) {
        this.lodat = JSON.parse(JSON.stringify(n))
      },
      deep: true
    }
  }
}
</script>

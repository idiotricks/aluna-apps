<template>
  <div>
    <div v-if="lodat">
      <div class="form-group">
        <label>Supplier Number</label>
        <input
          class="form-control"
          type="text"
          disabled
          :value="lodat.numcode"
        />
      </div>
      <div class="form-group">
        <label>Name</label>
        <input
          class="form-control"
          type="text"
          v-model="lodat.name"
          @change="edit(lodat.id, 'name', lodat.name)"
        />
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input
          class="form-control"
          type="text"
          v-model="lodat.phone"
          @change="edit(lodat.id, 'phone', lodat.phone)"
        />
      </div>
      <div class="form-group">
        <label>Address</label>
        <textarea
          class="form-control"
          v-model="lodat.address"
          @change="edit(lodat.id, 'address', lodat.address)"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'supplier-edit',
  props: ['obj'],
  data () {
    return {
      lodat: this.obj
    }
  },
  methods: {
    edit (id, field, value) {
      if (this.obj[field] !== value) {
        this.$emit('edit', id, field, value)
      }
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

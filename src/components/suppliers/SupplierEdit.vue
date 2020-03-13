<template>
  <div>
    <div v-if="obj">
      <div class="form-group">
        <label>Supplier Number</label>
        <input
          type="text"
          :value="obj.numcode"
          disabled
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label>Name</label>
        <input
          type="text"
          @change="onEdited(obj.id, 'name', obj.name)"
          v-model="obj.name"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input
          type="text"
          @change="onEdited(obj.id, 'phone', obj.phone)"
          v-model="obj.phone"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label>Address</label>
        <textarea
          @change="onEdited(obj.id, 'address', obj.address)"
          class="form-control"
          v-model="obj.address"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'supplier-edit',
  props: ['supplier'],
  data () {
    return {
      obj: this.supplier
    }
  },
  methods: {
    onEdited (id, field, value) {
      if (this.supplier[field] !== value) {
        this.$emit('onEdited', id, field, value)
      }
    }
  },
  watch: {
    supplier: {
      handler (n, o) {
        this.obj = JSON.parse(JSON.stringify(n))
      },
      deep: true
    }
  }
}
</script>

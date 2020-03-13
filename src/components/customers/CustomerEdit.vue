<template>
  <div>
    <div v-if="obj">
      <div class="form-group">
        <label>Customer Number</label>
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
          @blur="onEdited(obj.id, 'name', obj.name)"
          v-model="obj.name"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input
          type="text"
          @blur="onEdited(obj.id, 'phone', obj.phone)"
          v-model="obj.phone"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label>Address</label>
        <textarea
          @blur="onEdited(obj.id, 'address', obj.address)"
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
  name: 'customer-edit',
  props: ['customer'],
  data () {
    return {
      obj: this.customer
    }
  },
  methods: {
    onEdited (id, field, value) {
      if (this.customer[field] !== value) {
        this.$emit('onEdited', id, field, value)
      }
    }
  },
  watch: {
    customer: {
      handler (n, o) {
        this.obj = JSON.parse(JSON.stringify(n))
      },
      deep: true
    }
  }
}
</script>

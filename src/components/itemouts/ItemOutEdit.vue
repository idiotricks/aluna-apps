<template>
  <div>
    <div v-if="obj">
      <div class="form-group">
        <label>Product</label>
        <input
          @change="onEdited(obj.id, 'quantity', obj.quantity)"
          type="text"
          disabled
          class="form-control"
          :value="`${obj.product_name} (${obj.product_stock})`"
        />
      </div>
      <div class="form-group">
        <label>Quantity</label>
        <input
          @change="onEdited(obj.id, 'quantity', obj.quantity)"
          type="number"
          class="form-control"
          v-model="obj.quantity"
          :max="obj.product_stock"
          :min="1"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-out-edit',
  props: ['itemOut'],
  data () {
    return {
      obj: this.itemOut
    }
  },
  methods: {
    onEdited (id, field, value) {
      if (this.itemOut[field] !== value) {
        this.$emit('onEdited', id, field, value)
      }
    }
  },
  watch: {
    itemOut: {
      handler (n, o) {
        this.obj = JSON.parse(JSON.stringify(n))
      },
      deep: true
    }
  }
}
</script>

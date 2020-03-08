<template>
  <div>
    <div v-if="obj">
      <div class="form-group">
        <label>Product Number</label>
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
          :disabled="obj.is_publish"
          v-model="obj.name"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label>COGS</label>
        <input
          type="number"
          @blur="onEdited(obj.id, 'cogs', obj.cogs)"
          :disabled="obj.is_publish"
          v-model="obj.cogs"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label>Price</label>
        <input
          type="number"
          @blur="onEdited(obj.id, 'price', obj.price)"
          :disabled="obj.is_publish"
          v-model="obj.price"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label>Stock</label>
        <input
          type="number"
          @blur="onEdited(obj.id, 'stock', obj.stock)"
          :disabled="obj.is_publish"
          v-model="obj.stock"
          class="form-control"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-edit',
  props: ['product'],
  data () {
    return {
      obj: this.product
    }
  },
  methods: {
    onEdited (id, field, value) {
      if (this.product[field] !== value) {
        this.$emit('onEdited', id, field, value)
      }
    }
  },
  watch: {
    product: {
      handler (n, o) {
        this.obj = JSON.parse(JSON.stringify(n))
      },
      deep: true
    }
  }
}
</script>

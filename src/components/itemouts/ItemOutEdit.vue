<template>
  <div>
    <div v-if="lodat">
      <div class="form-group">
        <label>Product</label>
        <b-form-input
          type="text"
          :value="`${lodat.product_name} (${lodat.product_stock})`"
          :min="1"
          disabled
        />
      </div>
      <div class="form-group">
        <label>Stock</label>
        <b-form-input
          type="number"
          v-model="lodat.quantity"
          :min="1"
          @change="edit(lodat.id, 'quantity', lodat.quantity)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stock-out-edit',
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

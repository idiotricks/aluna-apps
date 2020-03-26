<template>
  <div>
    <div v-if="lodat">
      <div class="form-group">
        <label>Product Number</label>
        <input class="form-control" type="text" disabled :value="lodat.numcode" />
      </div>
      <div class="form-group">
        <label>Name</label>
        <input class="form-control" type="text" v-model="lodat.name" @change="edit(lodat.id, 'name', lodat.name)" />
      </div>
      <div class="form-group">
        <label>Stock</label>
        <b-form-input
          type="number"
          :value="lodat.stock"
          :min="1"
          disabled
        />
      </div>
      <div class="form-group">
        <label>COGS</label>
        <b-form-input
          type="number"
          v-model="lodat.cogs"
          :min="1"
          @change="edit(lodat.id, 'cogs', lodat.cogs)"
        />
      </div>
      <div class="form-group">
        <label>Price</label>
        <b-form-input
          type="number"
          v-model="lodat.price"
          :min="lodat.cogs ? lodat.cogs : 1"
          @change="edit(lodat.id, 'price', lodat.price)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-edit',
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

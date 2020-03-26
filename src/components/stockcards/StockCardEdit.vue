<template>
  <div>
    <div v-if="lodat">
      <div class="form-group">
        <label>Number ID</label>
        <b-form-datepicker
          :value="lodat.numcode"
          disabled
        />
      </div>
      <div class="form-group">
        <label>Date</label>
        <b-form-datepicker
          :value="lodat.date"
          disabled
        />
      </div>
      <div class="form-group">
        <label>Produk</label>
        <b-form-input
          disabled
          :value="lodat.product_name"
        />
      </div>
      <div class="form-group">
        <label>Saldo Awal</label>
        <b-form-input
          disabled
          :value="lodat.init_balance"
        />
      </div>
      <div class="form-group">
        <label>Stok Masuk</label>
        <b-form-input
          disabled
          :value="lodat.total_in"
        />
      </div>
      <div class="form-group">
        <label>Stok Keluar</label>
        <b-form-input
          disabled
          :value="lodat.total_out"
        />
      </div>
      <div class="form-group">
        <label>Saldo Akhir</label>
        <b-form-input
          disabled
          :value="lodat.end_balance"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customer-edit',
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

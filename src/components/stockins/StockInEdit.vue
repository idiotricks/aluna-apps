<template>
  <div>
    <div v-if="obj">
      <div class="form-group">
        <label>StockIn Number</label>
        <input
          type="text"
          :value="obj.numcode"
          disabled
          class="form-control"
        />
      </div>
      <div class="form-group">
        <b-calendar @selected="onEdited(obj.id, 'date', obj.date)" v-model="obj.date" locale="en"></b-calendar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stock-in-edit',
  props: ['stockIn'],
  data () {
    return {
      obj: this.stockIn
    }
  },
  methods: {
    onEdited (id, field, value) {
      if (this.stockIn[field] !== value) {
        this.$emit('onEdited', id, field, value)
      }
    }
  },
  watch: {
    stockIn: {
      handler (n, o) {
        this.obj = JSON.parse(JSON.stringify(n))
      },
      deep: true
    }
  }
}
</script>

<template>
  <div>
    <div v-if="obj">
      <div class="form-group">
        <!-- <b-calendar width="500px" @selected="" v-model="obj.date"></b-calendar> -->
        <b-form-datepicker
          @input="onEdited(obj.id, 'date', obj.date)"
          v-model="obj.date"
        ></b-form-datepicker>
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
    async onEdited (id, field, value) {
      if (this.stockIn[field] !== value) {
        await this.$emit('onEdited', id, field, value)
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

<template>
  <div>
    <div v-if="obj">
      <div class="form-group">
        <label>Quantity</label>
        <input
          @change="onEdited(obj.id, 'quantity', obj.quantity)"
          type="number"
          class="form-control"
          v-model="obj.quantity"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-in-edit',
  props: ['itemIn'],
  data () {
    return {
      obj: this.itemIn
    }
  },
  methods: {
    onEdited (id, field, value) {
      if (this.itemIn[field] !== value) {
        this.$emit('onEdited', id, field, value)
      }
    }
  },
  watch: {
    itemIn: {
      handler (n, o) {
        this.obj = JSON.parse(JSON.stringify(n))
      },
      deep: true
    }
  }
}
</script>

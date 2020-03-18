<template>
  <div>
    <p>
      <b-form-datepicker
        @input="filterStart"
        locale="id"
        id="start-date"
        v-model="startDate"
        class="mb-2"
        placeholder="Start Date"
      />
    </p>
    <p>
      <b-form-datepicker
        @input="filter"
        locale="id"
        id="end-date"
        v-model="endDate"
        :disabled="!startDate"
        class="mb-2"
      />
    </p>
  </div>
</template>

<script>
export default {
  name: 'ui-common-date-filter',
  data () {
    return {
      startDate: null,
      endDate: null
    }
  },
  methods: {
    filter () {
      const cpyEndDate = new Date(this.endDate)
      const cpyStartDate = new Date(this.startDate)

      if (cpyEndDate <= cpyStartDate && this.endDate !== null) {
        this.endDate = null
        this.startDate = null
        this.$emit('filter', null, null)
        alert('Invalid filter date range')
      } else {
        this.$emit('filter', this.startDate, this.endDate)
      }
    },
    filterStart () {
      this.endDate = null
    }
  }
}
</script>

<style>

</style>

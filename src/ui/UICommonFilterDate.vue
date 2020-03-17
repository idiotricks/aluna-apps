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
      ></b-form-datepicker>
    </p>
    <p>
      <b-form-datepicker
        @input="filter"
        locale="id"
        id="end-date"
        v-model="endDate"
        :disabled="!startDate"
        class="mb-2"
      ></b-form-datepicker>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ui-common-filter-date',
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
        alert('Invlaid your date range filter')
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

<template>
  <div>
    <div v-if="stockIn">
      <dl class="row">
        <dt class="col-sm-3 text-truncate">
          Stock In Number
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ stockIn.numcode }}
        </dd>
        <dt class="col-sm-3 text-truncate">
          Date
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ stockIn.date }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stock-in-detail',
  props: ['stockIn']
}
</script>

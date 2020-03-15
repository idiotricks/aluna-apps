<template>
  <div>
    <div v-if="stockOut">
      <dl class="row">
        <dt class="col-sm-3 text-truncate">
          Stock Out Number
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ stockOut.numcode }}
        </dd>
        <dt class="col-sm-3 text-truncate">
          Date
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ stockOut.date }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stock-out-detail',
  props: ['stockOut']
}
</script>

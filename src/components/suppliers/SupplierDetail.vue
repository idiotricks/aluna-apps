<template>
  <div>
    <div v-if="supplier">
      <dl class="row">
        <dt class="col-sm-3 text-truncate">
          Name
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ supplier.name }}
        </dd>
        <dt class="col-sm-3 text-truncate">
          Phone
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ supplier.phone }}
        </dd>
        <dt class="col-sm-3 text-truncate">
          Address
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ supplier.address }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'supplier-detail',
  props: ['supplier']
}
</script>

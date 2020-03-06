<template>
  <div>
    <div v-if="customer">
      <dl class="row">
        <dt class="col-sm-3 text-truncate">
          Name
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ customer.name }}
        </dd>
        <dt class="col-sm-3 text-truncate">
          Phone
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ customer.phone }}
        </dd>
        <dt class="col-sm-3 text-truncate">
          Address
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ customer.address }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customer-detail',
  props: ['customer']
}
</script>

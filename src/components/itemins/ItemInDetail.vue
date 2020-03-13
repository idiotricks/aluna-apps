<template>
  <div>
    <div v-if="itemIn">
      <dl class="row">
        <dt class="col-sm-3 text-truncate">
          Product
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ itemIn.product }}
        </dd>
        <dt class="col-sm-3 text-truncate">
          Quantity
        </dt>
        <dd class="col-sm-9 text-truncate">
          IDR. {{ itemIn.quantity }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-in-detail',
  props: ['itemIn']
}
</script>

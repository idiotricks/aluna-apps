<template>
  <div>
    <div v-if="itemOut">
      <dl class="row">
        <dt class="col-sm-3 text-truncate">
          Product
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ itemOut.product }}
        </dd>
        <dt class="col-sm-3 text-truncate">
          Quantity
        </dt>
        <dd class="col-sm-9 text-truncate">
          IDR. {{ itemOut.quantity }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-out-detail',
  props: ['itemOut']
}
</script>

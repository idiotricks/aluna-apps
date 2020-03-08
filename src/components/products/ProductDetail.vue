<template>
  <div>
    <div v-if="product">
      <dl class="row">
        <dt class="col-sm-3 text-truncate">
          Product Code
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ product.numcode }}
        </dd>
        <dt class="col-sm-3 text-truncate">
          Name
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ product.name }}
        </dd>
        <dt class="col-sm-3 text-truncate">
          COGS
        </dt>
        <dd class="col-sm-9 text-truncate">
          IDR. {{ product.cogs }}
        </dd>
        <dt class="col-sm-3 text-truncate">
          Price
        </dt>
        <dd class="col-sm-9 text-truncate">
          IDR. {{ product.price }}
        </dd>
        <dt class="col-sm-3 text-truncate">
          Stock
        </dt>
        <dd class="col-sm-9 text-truncate">
          {{ product.stock }} Unit
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-detail',
  props: ['product']
}
</script>

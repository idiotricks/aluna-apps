<template>
  <div v-if="init">
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-12">
          <button
            class="btn btn-secondary"
            @click="onNewProduct()"
          >
            New Product
          </button>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-12">
          <b-card header="Search Product">
            <search-template
              @onSearch="onSearchProduct"
              @onSearchPublish="onSearchPublishProduct"
            />
          </b-card>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-12">
          <b-modal
            ref="edit-modal-product"
            :title="product ? product.name : ''"
            hide-footer
            no-close-on-backdrop
            no-close-on-esc
            no-fade
          >
            <product-edit
              :product="product"
              @onEdited="onEditedProduct"
            />
            <b-button-group v-if="product">
              <b-button @click="chooseProduct(product)">
                Choose
              </b-button>
            </b-button-group>
          </b-modal>
          <b-card header="Products">
            <product-list
              :products="products"
              @onSelected="onSelectedProduct"
            />
            <pagination-template
              @onPaginate="onPaginateProduct"
              :currentPage="productParams.page"
              :count="productCount"
            />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchTemplate from '@/templates/SearchTemplate'
import PaginationTemplate from '@/templates/PaginationTemplate'

import ProductList from '@/components/products/ProductList'
import ProductDetail from '@/components/products/ProductDetail'
import ProductEdit from '@/components/products/ProductEdit'
import ProductMixin from '@/components/products/ProductMixin'

export default {
  name: 'product-choice',
  data () {
    return {
      init: false
    }
  },
  components: {
    'search-template': SearchTemplate,
    'pagination-template': PaginationTemplate,
    'product-list': ProductList,
    'product-detail': ProductDetail,
    'product-edit': ProductEdit
  },
  mixins: [
    ProductMixin
  ],
  methods: {
    async onAllProduct () {
      await this.productAll()
      this.init = true
    },
    async onSearchProduct (search) {
      this.setSearchProduct(search)
      this.onAllProduct()
    },
    async onSearchPublishProduct (value) {
      this.setPublishProduct(value)
      this.onAllProduct()
    },
    async onPaginateProduct (page) {
      this.setPageProduct(page)
      this.onAllProduct()
    },
    async onNewProduct () {
      await this.productNew()
      await this.onAllProduct()
      await this._onEditModalProduct(true)
    },
    async onSelectedProduct (product) {
      this.product = product
      this._onEditModalProduct(true)
    },
    async onEditedProduct (id, field, value) {
      await this.productEdit(id, field, value)
      await this.onAllProduct()
      this.freshProduct()
    },
    _onEditModalProduct (show) {
      if (show) {
        this.$refs['edit-modal-product'].show()
      } else {
        this.$refs['edit-modal-product'].hide()
      }
    },
    chooseProduct (product) {
      this.$emit('chooseProduct', product)
    },
    freshProduct () {
      this.$emit('freshProduct')
    }
  },
  async mounted () {
    await this.onAllProduct()
  }
}
</script>

<style>

</style>

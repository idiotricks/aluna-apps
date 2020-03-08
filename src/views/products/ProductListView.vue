<template>
  <div v-if="init">
    <navbar-template app="Product Manager">
      <b-nav-item-dropdown text="Actions" right>
        <b-dropdown-item @click="onNewProduct" href="#">New Product</b-dropdown-item>
      </b-nav-item-dropdown>
    </navbar-template>
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-3">
          <b-card header="Search Product">
            <search-template
              @onSearch="onSearchProduct"
              @onSearchPublish="onSearchPublishProduct"
            />
          </b-card>
        </div>
        <div class="col-md-9">
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
              <b-button
                v-if="product.is_publish"
                @click="onDraftProduct(product.id)"
              >
                Draft Mode
              </b-button>
              <b-button
                v-if="!product.is_publish"
                @click="onPublishProduct(product.id)"
              >
                Publish
              </b-button>
              <b-button
                @click="onDeletedProduct(product.id)"
              >
                Remove
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
import NavbarTemplate from '@/templates/NavbarTemplate'
import SearchTemplate from '@/templates/SearchTemplate'
import PaginationTemplate from '@/templates/PaginationTemplate'

import ProductList from '@/components/products/ProductList'
import ProductDetail from '@/components/products/ProductDetail'
import ProductEdit from '@/components/products/ProductEdit'
import ProductMixin from '@/components/products/ProductMixin'

export default {
  name: 'product-list-view',
  data () {
    return {
      init: false
    }
  },
  components: {
    'navbar-template': NavbarTemplate,
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
    },
    async onSelectedProduct (product) {
      this.product = product
      this._onEditModalProduct(true)
    },
    async onDeletedProduct (id) {
      const confirm = window.confirm('Are you sure ?')
      if (confirm) {
        this._onEditModalProduct(false)
        await this.productDelete(id)
        await this.onAllProduct()
      }
    },
    async onEditedProduct (id, field, value) {
      await this.productEdit(id, field, value)
      await this.onAllProduct()
    },
    async onPublishProduct (id) {
      await this.productPublish(id)
      await this.onAllProduct()
    },
    async onDraftProduct (id) {
      await this.productDraft(id)
      await this.onAllProduct()
    },
    _onEditModalProduct (show) {
      if (show) {
        this.$refs['edit-modal-product'].show()
      } else {
        this.$refs['edit-modal-product'].hide()
      }
    }
  },
  async mounted () {
    await this.onAllProduct()
  }
}
</script>

<style>

</style>

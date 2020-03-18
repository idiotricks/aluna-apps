<template>
  <div>
    <ui-common-header app="Product Manager">
      <b-nav-item-dropdown text="Actions" right>
        <b-dropdown-item v-if="segmentA" @click="onCreateProduct()" href="#">
          New Product
        </b-dropdown-item>
        <b-dropdown-item
          v-if="segmentB"
          @click="onResetProduct"
          href="#"
        >
          Back
        </b-dropdown-item>
        <b-dropdown-item
          v-if="segmentB"
          @click="onDeleteProduct(product)"
          href="#"
        >
          {{ product.is_init ? 'Discard ' : 'Delete ' }}
          {{ product.name }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </ui-common-header>
    <!-- SEGMENT-A -->
    <div v-if="segmentA" class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-3">
          <b-card header="Search Product">
            <ui-common-search @search="onSearchProduct" />
          </b-card>
          <b-card class="mt-4" header="Filter Product by Date">
            <ui-common-date-filter @filter="onFilterDateProduct" />
          </b-card>
        </div>
        <div class="col-md-9">
          <b-card header="Products">
            <product-list
              :objs="products"
              :fields="[
                'numcode',
                'name',
                'username',
                'stock',
                'cogs',
                'price',
                'created'
              ]"
              @take="onTakeProduct"
            />
            <ui-common-pagination
              class="mt-3"
              :totalRows="totalProduct"
              :currentPage="queryProduct.page"
              @paginate="onPaginateProduct"
            />
          </b-card>
        </div>
      </div>
    </div>
    <!-- SEGMENT-B -->
    <div v-if="segmentB" class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-6">
          <b-card :header="product.name">
            <product-edit
              :obj="product"
              @edit="onEditProduct"
            />
          </b-card>
        </div>
        <div class="col-md-6">
          <b-card header="Preview Product">
            <product-detail
              :obj="product"
              :fields="[
                'numcode',
                'name',
                'username',
                'stock',
                'cogs',
                'price',
                'created'
              ]"
            />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UICommonHeader from '@/ui/commons/UICommonHeader'
import UICommonPagination from '@/ui/commons/UICommonPagination'
import UICommonSearch from '@/ui/commons/UICommonSearch'
import UICommonDateFilter from '@/ui/commons/UICommonDateFilter'

import ProductMixin from '@/components/products/ProductMixin'
import ProductList from '@/components/products/ProductList'
import ProductEdit from '@/components/products/ProductEdit'
import ProductDetail from '@/components/products/ProductDetail'

export default {
  name: 'view-common-product',
  data () {
    return {
      segmentA: true,
      segmentB: false
    }
  },
  components: {
    'ui-common-header': UICommonHeader,
    'ui-common-pagination': UICommonPagination,
    'ui-common-search': UICommonSearch,
    'ui-common-date-filter': UICommonDateFilter,
    'product-list': ProductList,
    'product-edit': ProductEdit,
    'product-detail': ProductDetail
  },
  mixins: [
    ProductMixin
  ],
  methods: {
    async onAllProduct () {
      try {
        await this.allProduct()
      } catch (error) {
        console.log(error)
      }
    },
    async onTakeProduct (product) {
      try {
        await this.getProduct(product.id)
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
      }
    },
    async onCreateProduct () {
      try {
        await this.createProduct()
        await this.allProduct()
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
      }
    },
    async onEditProduct (id, field, value) {
      try {
        await this.editProduct(id, field, value)
        await this.allProduct()
      } catch (error) {
        console.log(error)
      }
    },
    onResetProduct () {
      try {
        this.resetProduct()
        this.segmentA = true
        this.segmentB = false
      } catch (error) {
        console.log(error)
      }
    },
    async onDeleteProduct (product) {
      try {
        const confirm = await this.$bvModal.msgBoxConfirm(
          `Are you sure to delete "${product.name}"`,
          {
            title: 'Delete Confirmation',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            centered: true
          }
        )
        if (confirm) {
          this.segmentA = true
          this.segmentB = false
          await this.deleteProduct(product.id)
          await this.resetProduct()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async onSearchProduct (search) {
      try {
        this.setQuerySearchProduct(search)
        await this.allProduct()
      } catch (error) {
        console.log(error)
      }
    },
    async onPaginateProduct (page) {
      try {
        this.setQueryPageProduct(page)
        this.allProduct()
      } catch (error) {
        console.log(error)
      }
    },
    async onFilterDateProduct (startDate, endDate) {
      try {
        this.setQueryDateRangeProduct(startDate, endDate)
        await this.allProduct()
      } catch (error) {
        console.log(error)
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

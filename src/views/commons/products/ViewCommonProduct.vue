<template>
  <div>
    <ui-common-header app="Product Manager" />
    <ui-common-action>
      <!-- TODO: pagination top -->
      <!-- <b-button-group v-if="segmentA">
        <b-pagination
          v-model="queryProduct.page"
          size="sm"
          :total-rows="totalProduct"
          :per-page="10"
          @change="onPaginateProduct"
        />
      </b-button-group> -->
      <b-button-group size="sm" v-if="segmentA">
        <b-button @click="onExportCSVProduct()">
          Export CSV
        </b-button>
        <b-button @click="onExportPDFProduct()">
          Export PDF
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentA">
        <b-button variant="primary" @click="onCreateProduct()">New Product</b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button variant="outline-secondary" @click="onDeleteProduct(product)">
          {{ product.is_init ? 'Discard' : 'Delete Product' }}
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button @click="onResetProduct">
          Close
        </b-button>
      </b-button-group>
    </ui-common-action>
    <b-container :fluid="true">
      <b-row class="mt-4">
        <b-col>
          <b-card no-body>
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
          </b-card>
          <ui-common-pagination
            class="mt-4"
            :totalRows="totalProduct"
            :currentPage="queryProduct.page"
            @paginate="onPaginateProduct"
          />
        </b-col>
        <b-col v-if="segmentA" cols="3">
          <b-card header="Search Product">
            <ui-common-search @search="onSearchProduct" />
          </b-card>
          <b-card class="mt-4" header="Filter Product by Date">
            <ui-common-date-filter @filter="onFilterDateProduct" />
          </b-card>
        </b-col>
        <b-col v-if="segmentB" cols="6">
          <b-card header="Edit Product">
            <product-edit
              :obj="product"
              @edit="onEditProduct"
            />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UICommonHeader from '@/ui/commons/UICommonHeader'
import UICommonAction from '@/ui/commons/UICommonAction'
import UICommonPagination from '@/ui/commons/UICommonPagination'
import UICommonSearch from '@/ui/commons/UICommonSearch'
import UICommonDateFilter from '@/ui/commons/UICommonDateFilter'

import HelperAlert from '@/helpers/HelperAlert'

import ProductMixin from '@/components/products/ProductMixin'
import ProductList from '@/components/products/ProductList'
import ProductEdit from '@/components/products/ProductEdit'

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
    'ui-common-action': UICommonAction,
    'ui-common-pagination': UICommonPagination,
    'ui-common-search': UICommonSearch,
    'ui-common-date-filter': UICommonDateFilter,
    'product-list': ProductList,
    'product-edit': ProductEdit
  },
  mixins: [
    ProductMixin,
    HelperAlert
  ],
  methods: {
    async onAllProduct () {
      try {
        await this.allProduct()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onTakeProduct (product) {
      try {
        await this.getProduct(product.id)
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
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
        this.errorHandler(error)
      }
    },
    async onEditProduct (id, field, value) {
      try {
        await this.editProduct(id, field, value)
        await this.allProduct()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    onResetProduct () {
      try {
        this.resetProduct()
        this.segmentA = true
        this.segmentB = false
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
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
        this.errorHandler(error)
      }
    },
    async onExportCSVProduct () {
      try {
        const data = await this.exportCSVProduct()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-products-${date.toLocaleDateString()}.csv`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onExportPDFProduct () {
      try {
        const data = await this.exportPDFProduct()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-Products-${date.toLocaleDateString()}.pdf`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onSearchProduct (search) {
      try {
        this.setQuerySearchProduct(search)
        await this.allProduct()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onPaginateProduct (page) {
      try {
        this.setQueryPageProduct(page)
        this.allProduct()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onFilterDateProduct (startDate, endDate) {
      try {
        this.setQueryDateRangeProduct(startDate, endDate)
        await this.allProduct()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
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

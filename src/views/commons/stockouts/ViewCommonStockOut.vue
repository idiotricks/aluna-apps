<template>
  <div>
    <ui-common-header app="Stock Out Manager" />
    <ui-common-action>
      <b-button-group size="sm" v-if="segmentA">
        <b-button @click="onExportCSVStockOut()">
          Export CSV
        </b-button>
        <b-button @click="onExportPDFStockOut()">
          Export PDF
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentA">
        <b-button variant="primary" @click="onCreateStockOut()">
          New Stock Out
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button
          v-if="!stockOut.is_calculate"
          @click="onCalculateStockOut(stockOut)"
        >
          Stock Adjustment
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button v-if="!stockOut.is_calculate && stockOut.customer" @click="() => $refs['modalCreateCustomer'].show()">
          Edit Customer
        </b-button>
        <b-button v-if="!stockOut.is_calculate && stockOut.customer" @click="onEditStockOut(stockOut.id, 'supplier', null)">
          Remove Customer
        </b-button>
        <b-button v-if="!stockOut.is_calculate && !stockOut.customer" @click="onAllCustomer()">
          Browse Customer
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button v-if="!stockOut.is_calculate" @click="onAllProduct()">
          Browse Product
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button v-if="stockOut.is_calculate" @click="onPrintPDFStockOut(stockOut)">
          Save to PDF
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button
          variant="outline-secondary"
          v-if="!stockOut.is_calculate"
          @click="onDeleteStockOut(stockOut)"
          title="Trash"
        >
          To Trash
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button
          @click="onAllStockOut()"
        >
          Back
        </b-button>
      </b-button-group>
    </ui-common-action>
    <b-container :fluid="true">
      <b-row class="mt-4">
        <b-col>
          <b-card no-body>
            <stock-out-list
              :objs="stockOuts"
              :fields="[
                'numcode',
                'date',
                'customer_name',
                'customer_phone',
                'is_calculate'
              ]"
              @take="onTakeStockOut"
            />
          </b-card>
          <ui-common-pagination
            class="mt-4"
            :totalRows="totalStockOut"
            :currentPage="queryStockOut.page"
            @paginate="onPaginateStockOut"
          />
        </b-col>
        <b-col v-if="segmentA" cols="3">
          <b-card header="Search Stock Out">
            <ui-common-search @search="onSearchStockOut" />
          </b-card>
          <b-card class="mt-4" header="Filter Stock Out by Date">
            <ui-common-date-filter @filter="onDateFilterStockOut" />
          </b-card>
        </b-col>
        <b-col v-if="segmentB" cols="6">
          <b-card v-if="!stockOut.is_calculate" header="Stock Out">
            <stock-out-edit
              :obj="stockOut"
              @edit="onEditStockOut"
            />
          </b-card>
          <b-card no-body v-if="stockOut.is_calculate" header="Stock Out">
            <stock-out-detail
              :obj="stockOut"
              :fields="[
                'numcode',
                'date'
              ]"
            />
          </b-card>
          <b-card no-body class="mt-4" header="Customer">
            <customer-detail
              :fields="[
                'numcode',
                'name',
                'phone',
                'address'
              ]"
              :obj="customer"
            />
          </b-card>
          <b-card class="mt-4" no-body header="Items">
            <b-row>
              <b-col>
                <item-out-list
                  :objs="itemOuts"
                  :fields="[
                    'product_name',
                    'quantity'
                  ]"
                  @take="onTakeItemOut"
                />
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <!-- POPUP MODAL -->
    <b-modal
      ref="modalAllCustomer"
      title="Customers"
      hide-header-close
      hide-footer
      size="lg"
    >
      <b-row class="mb-4">
        <b-col cols="9">
          <ui-common-search @search="onSearchCustomer" />
        </b-col>
        <b-col cols="3">
          <b-button-group>
            <b-button block @click="onCreateCustomer">
              New Customer
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <customer-list
            :objs="customers"
            :fields="['numcode', 'name', 'phone']"
            @take="onTakeCustomer"
          />
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      ref="modalCreateCustomer"
      title="Customer"
      hide-header-close
      hide-footer
      size="lg"
    >
      <b-row>
        <b-col>
          <customer-edit
            :obj="customer"
            @edit="onEditCustomer"
          />
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      ref="modalAllProduct"
      title="Products"
      hide-header-close
      hide-footer
      size="lg"
    >
      <b-row class="mb-4">
        <b-col cols="12">
          <ui-common-search
            @search="onSearchProduct"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <product-list
            :objs="products"
            :fields="[
              'numcode',
              'name',
              'cogs',
              'price',
              'stock'
            ]"
            @take="onTakeProduct"
          />
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      ref="modalEditItemOut"
      title="Item"
      hide-header-close
      hide-footer
      size="lg"
    >
      <b-row>
        <b-col>
          <item-out-edit @edit="onEditItemOut" :obj="itemOut" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button-group>
            <b-button @click="onDeleteItemOut(itemOut)">Delete</b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import UICommonHeader from '@/ui/commons/UICommonHeader'
import UICommonAction from '@/ui/commons/UICommonAction'
import UICommonPagination from '@/ui/commons/UICommonPagination'
import UICommonSearch from '@/ui/commons/UICommonSearch'
import UICommonDateFilter from '@/ui/commons/UICommonDateFilter'

import HelperAlert from '@/helpers/HelperAlert'

import StockOutMixin from '@/components/stockouts/StockOutMixin'
import StockOutList from '@/components/stockouts/StockOutList'
import StockOutEdit from '@/components/stockouts/StockOutEdit'
import StockOutDetail from '@/components/stockouts/StockOutDetail'

import CustomerMixin from '@/components/customers/CustomerMixin'
import CustomerList from '@/components/customers/CustomerList'
import CustomerEdit from '@/components/customers/CustomerEdit'
import CustomerDetail from '@/components/customers/CustomerDetail'

import ProductMixin from '@/components/products/ProductMixin'
import ProductList from '@/components/products/ProductList'
import ProductEdit from '@/components/products/ProductEdit'

import ItemOutMixin from '@/components/itemouts/ItemOutMixin'
import ItemOutList from '@/components/itemouts/ItemOutList'
import ItemOutEdit from '@/components/itemouts/ItemOutEdit'

export default {
  name: 'view-common-stock-out',
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
    'stock-out-list': StockOutList,
    'stock-out-edit': StockOutEdit,
    'stock-out-detail': StockOutDetail,
    'customer-list': CustomerList,
    'customer-edit': CustomerEdit,
    'customer-detail': CustomerDetail,
    'product-list': ProductList,
    'product-edit': ProductEdit,
    'item-out-list': ItemOutList,
    'item-out-edit': ItemOutEdit
  },
  mixins: [
    HelperAlert,
    ProductMixin,
    StockOutMixin,
    CustomerMixin,
    ItemOutMixin
  ],
  methods: {
    async onAllStockOut () {
      try {
        this.setQuerySearchStockOut(null)
        this.setQueryDateRangeStockOut(null, null)
        await this.allStockOut()
        this.segmentA = true
        this.segmentB = false
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onTakeStockOut (stockOut) {
      try {
        await this.getStockOut(stockOut.id)
        await this.getCustomer(stockOut.customer)
        this.setQueryStockOutItemOut(this.stockOut.id)
        await this.allItemOut()
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onCreateStockOut () {
      try {
        await this.createStockOut()
        await this.getCustomer(this.stockOut.customer)
        this.setQueryStockOutItemOut(this.stockOut.id)
        await this.allItemOut()
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onEditStockOut (id, field, value) {
      try {
        if (this.stockOut.is_calculate) {
          this.messageWarning('Proses ini tidak diizinkan karena stok sudah di adjust')
          return
        }
        await this.editStockOut(id, field, value)
        await this.getCustomer(this.stockOut.customer)
        await this.allStockOut()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onDeleteStockOut (stockOut) {
      try {
        const confirm = await this.deleteConfirm(stockOut.numcode)
        if (confirm) {
          this.segmentA = true
          this.segmentB = false
          this.deleteStockOut(stockOut.id)
          this.deleteSuccess()
          this.resetStockOut()
          this.allStockOut()
        }
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onSearchStockOut (search) {
      try {
        this.setQuerySearchStockOut(search)
        await this.allStockOut()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onPaginateStockOut (page) {
      try {
        this.setQueryPageStockOut(page)
        await this.allStockOut()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onDateFilterStockOut (startDate, endDate) {
      try {
        this.setQueryDateRangeStockOut(startDate, endDate)
        await this.allStockOut()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onCalculateStockOut (stockOut) {
      try {
        if (this.stockOut.is_calculate) {
          this.messageWarning('Proses ini tidak diizinkan karena stok sudah di adjust')
          return
        }
        await this.calculateStockOut(stockOut.id)
        await this.allStockOut()
        this.messageSuccess('Stok berhasil di adjust')
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onExportCSVStockOut () {
      try {
        const data = await this.exportCSVStockOut()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-stock-out-${date.toLocaleDateString()}.csv`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onExportPDFStockOut () {
      try {
        const data = await this.exportPDFStockOut()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-stock-out-${date.toLocaleDateString()}.pdf`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onPrintPDFStockOut (stockOut) {
      try {
        const data = await this.printPDFStockOut(stockOut.id)
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-stock-out-${date.toLocaleDateString()}.pdf`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onAllCustomer () {
      try {
        this.setQuerySearchCustomer(null)
        await this.allCustomer()
        this.$refs['modalAllCustomer'].show()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onTakeCustomer (customer) {
      try {
        await this.getCustomer(customer.id)
        await this.editStockOut(this.stockOut.id, 'customer', customer.id)
        await this.allStockOut()
        this.$refs['modalAllCustomer'].hide()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onSearchCustomer (search) {
      try {
        await this.setQuerySearchCustomer(search)
        await this.allCustomer()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onCreateCustomer () {
      try {
        await this.createCustomer()
        this.$refs['modalCreateCustomer'].show()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onEditCustomer (id, field, value) {
      try {
        await this.editCustomer(id, field, value)
        await this.allCustomer()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onAllProduct () {
      try {
        await this.allProduct()
        this.$refs['modalAllProduct'].show()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onTakeProduct (product) {
      try {
        await this.getProduct(product.id)
        if (this.product.stock <= 0) {
          alert('Stock not available')
          return
        }
        await this.createItemOut({
          stockout: this.stockOut.id,
          product: this.product.id,
          quantity: 0
        })
        await this.allItemOut()
        this.$refs['modalEditItemOut'].show()
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
    async onTakeItemOut (itemOut) {
      try {
        if (this.stockOut.is_calculate) {
          this.messageWarning('Proses ini tidak diizinkan karena stok sudah di adjust')
          return
        }
        await this.getItemOut(itemOut.id)
        this.$refs['modalEditItemOut'].show()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onEditItemOut (id, field, value) {
      try {
        if (this.stockOut.is_calculate) {
          this.messageWarning('Proses ini tidak diizinkan karena stok sudah di adjust')
          return
        }
        await this.editItemOut(id, field, value)
        await this.allItemOut()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onDeleteItemOut (itemOut) {
      try {
        if (this.stockOut.is_calculate) {
          this.messageWarning('Proses ini tidak diizinkan karena stok sudah di adjust')
          return
        }
        const confirm = await this.deleteConfirm(itemOut.product_name)
        if (confirm) {
          this.$refs['modalEditItemOut'].hide()
          await this.deleteItemOut(itemOut.id)
          await this.allItemOut()
        }
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    }
  },
  mounted () {
    this.onAllStockOut()
  }
}
</script>

<style>

</style>

<template>
  <div>
    <ui-common-header app="Stock In Manager" />
    <ui-common-action>
      <b-button-group size="sm" v-if="segmentA">
        <b-button @click="onExportCSVStockIn()">
          Export CSV
        </b-button>
        <b-button @click="onExportPDFStockIn()">
          Export PDF
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentA">
        <b-button variant="primary" @click="onCreateStockIn()">
          New Stock In
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button v-if="!stockIn.is_calculate" @click="onCalculateStockIn(stockIn)">
          Stock Adjustment
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button v-if="!stockIn.is_calculate && stockIn.supplier" @click="() => $refs['modalCreateSupplier'].show()">
          Edit Supplier
        </b-button>
        <b-button v-if="!stockIn.is_calculate && stockIn.supplier" @click="onEditStockIn(stockIn.id, 'supplier', null)">
          Remove Supplier
        </b-button>
        <b-button v-if="!stockIn.is_calculate && !stockIn.supplier" @click="onAllSupplier()">
          Browse Supplier
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button v-if="!stockIn.is_calculate" @click="onAllProduct()">
          Browse Product
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button v-if="stockIn.is_calculate" @click="onPrintPDFStockIn(stockIn)">
          Save to PDF
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button
          variant="outline-secondary"
          v-if="!stockIn.is_calculate"
          @click="onDeleteStockIn(stockIn)"
          title="Trash"
        >
          To Trash
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button @click="onAllStockIn()">
          Close
        </b-button>
      </b-button-group>
    </ui-common-action>
    <div class="container-fluid">
      <b-row>
        <b-col>
          <b-card no-body>
            <stock-in-list
              :objs="stockIns"
              :fields="[
                'numcode',
                'date',
                'supplier_name',
                'supplier_phone',
                'is_calculate'
              ]"
              @take="onTakeStockIn"
            />
          </b-card>
          <ui-common-pagination
            class="mt-4"
            :totalRows="totalStockIn"
            :currentPage="queryStockIn.page"
            @paginate="onPaginateStockIn"
          />
        </b-col>
        <b-col v-if="segmentA" cols="3">
          <b-card header="Search Stock In">
            <ui-common-search @search="onSearchStockIn" />
          </b-card>
          <b-card class="mt-4" header="Filter Stock In by Date">
            <ui-common-date-filter @filter="onDateFilterStockIn" />
          </b-card>
        </b-col>
        <b-col v-if="segmentB" cols="6">
          <b-card v-if="!stockIn.is_calculate" header="Stock In">
            <stock-in-edit
              :obj="stockIn"
              @edit="onEditStockIn"
            />
          </b-card>
          <b-card no-body v-if="stockIn.is_calculate" header="Stock In">
            <stock-in-detail
              :obj="stockIn"
              :fields="[
                'numcode',
                'date'
              ]"
            />
          </b-card>
          <b-card no-body class="mt-4" header="Supplier">
            <supplier-detail :fields="[
              'numcode',
              'name',
              'phone',
              'address'
            ]" :obj="supplier" />
          </b-card>
          <b-card no-body class="mt-4" header="Items">
            <item-in-list
              :objs="itemIns"
              :fields="[
                'product_name',
                'product_stock',
                'quantity'
              ]"
              @take="onTakeItemIn"
            />
          </b-card>
        </b-col>
      </b-row>
    </div>
    <!-- POPUP MODAL -->
    <b-modal
      ref="modalAllSupplier"
      title="Suppliers"
      hide-header-close
      hide-footer
      size="lg"
    >
      <b-row class="mb-4">
        <b-col cols="9">
          <ui-common-search @search="onSearchSupplier" />
        </b-col>
        <b-col cols="3">
          <b-button-group>
            <b-button block @click="onCreateSupplier">
              New Supplier
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <supplier-list
            :objs="suppliers"
            :fields="['numcode', 'name', 'phone']"
            @take="onTakeSupplier"
          />
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      ref="modalCreateSupplier"
      title="Supplier"
      hide-header-close
      hide-footer
      size="lg"
    >
      <b-row>
        <b-col>
          <supplier-edit :obj="supplier" @edit="onEditSupplier" />
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
      ref="modalEditItemIn"
      title="Item"
      hide-header-close
      hide-footer
      size="lg"
    >
      <b-row>
        <b-col>
          <item-in-edit @edit="onEditItemIn" :obj="itemIn" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button-group>
            <b-button @click="onDeleteItemIn(itemIn)">Delete</b-button>
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

import StockInMixin from '@/components/stockins/StockInMixin'
import StockInList from '@/components/stockins/StockInList'
import StockInEdit from '@/components/stockins/StockInEdit'
import StockInDetail from '@/components/stockins/StockInDetail'

import SupplierMixin from '@/components/suppliers/SupplierMixin'
import SupplierList from '@/components/suppliers/SupplierList'
import SupplierEdit from '@/components/suppliers/SupplierEdit'
import SupplierDetail from '@/components/suppliers/SupplierDetail'

import ProductMixin from '@/components/products/ProductMixin'
import ProductList from '@/components/products/ProductList'
import ProductEdit from '@/components/products/ProductEdit'

import ItemInMixin from '@/components/itemins/ItemInMixin'
import ItemInList from '@/components/itemins/ItemInList'
import ItemInEdit from '@/components/itemins/ItemInEdit'

export default {
  name: 'view-common-stock-in',
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
    'stock-in-list': StockInList,
    'stock-in-edit': StockInEdit,
    'stock-in-detail': StockInDetail,
    'supplier-list': SupplierList,
    'supplier-edit': SupplierEdit,
    'supplier-detail': SupplierDetail,
    'product-list': ProductList,
    'product-edit': ProductEdit,
    'item-in-list': ItemInList,
    'item-in-edit': ItemInEdit
  },
  mixins: [
    HelperAlert,
    ProductMixin,
    StockInMixin,
    SupplierMixin,
    ItemInMixin
  ],
  methods: {
    async onAllStockIn () {
      try {
        this.setQuerySearchStockIn(null)
        this.setQueryDateRangeStockIn(null, null)
        await this.allStockIn()
        this.segmentA = true
        this.segmentB = false
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onTakeStockIn (stockIn) {
      try {
        await this.getStockIn(stockIn.id)
        if (stockIn.supplier) {
          await this.getSupplier(stockIn.supplier)
        }
        this.setQueryStockInItemIn(this.stockIn.id)
        await this.allItemIn()
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onCreateStockIn () {
      try {
        await this.createStockIn()
        await this.getSupplier(this.stockIn.supplier)
        this.setQueryStockInItemIn(this.stockIn.id)
        await this.allItemIn()
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onEditStockIn (id, field, value) {
      try {
        if (this.stockIn.is_calculate) {
          this.messageWarning(
            'Proses ini tidak diizinkan karena stok sudah di adjust'
          )
          return
        }
        await this.editStockIn(id, field, value)
        await this.allStockIn()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onDeleteStockIn (stockIn) {
      try {
        const confirm = await this.deleteConfirm(stockIn.numcode)
        if (confirm) {
          this.segmentA = true
          this.segmentB = false
          this.deleteStockIn(stockIn.id)
          this.messageSuccess('Berhasil membuang')
          this.resetStockIn()
          this.allStockIn()
        }
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onSearchStockIn (search) {
      try {
        this.setQuerySearchStockIn(search)
        await this.allStockIn()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onPaginateStockIn (page) {
      try {
        this.setQueryPageStockIn(page)
        await this.allStockIn()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onDateFilterStockIn (startDate, endDate) {
      try {
        this.setQueryDateRangeStockIn(startDate, endDate)
        await this.allStockIn()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onCalculateStockIn (stockIn) {
      try {
        if (this.stockIn.is_calculate) {
          this.messageWarning(
            'Proses ini tidak diizinkan karena stok sudah di adjust'
          )
          return
        }
        await this.calculateStockIn(stockIn.id)
        await this.allStockIn()
        this.messageSuccess('Berhasil melakukan penambahan stok')
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onExportCSVStockIn () {
      try {
        const data = await this.exportCSVStockIn()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-stock-in-${date.toLocaleDateString()}.csv`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onExportPDFStockIn () {
      try {
        const data = await this.exportPDFStockIn()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-stock-in-${date.toLocaleDateString()}.pdf`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onPrintPDFStockIn (stockIn) {
      try {
        const data = await this.printPDFStockIn(stockIn.id)
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-stock-in-${date.toLocaleDateString()}.pdf`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onAllSupplier () {
      try {
        this.setQuerySearchSupplier(null)
        await this.allSupplier()
        this.$refs['modalAllSupplier'].show()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onTakeSupplier (supplier) {
      try {
        await this.getSupplier(supplier.id)
        await this.editStockIn(this.stockIn.id, 'supplier', supplier.id)
        await this.allStockIn()
        this.$refs['modalAllSupplier'].hide()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onSearchSupplier (search) {
      try {
        await this.setQuerySearchSupplier(search)
        await this.allSupplier()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onCreateSupplier () {
      try {
        await this.createSupplier()
        this.$refs['modalCreateSupplier'].show()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onEditSupplier (id, field, value) {
      try {
        await this.editSupplier(id, field, value)
        await this.allSupplier()
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
        await this.createItemIn({
          stockin: this.stockIn.id,
          product: this.product.id,
          quantity: 0
        })
        await this.allItemIn()
        this.$refs['modalEditItemIn'].show()
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
    async onTakeItemIn (itemIn) {
      try {
        if (this.stockIn.is_calculate) {
          this.messageWarning(
            'Proses ini tidak diizinkan karena stok sudah di adjust'
          )
          return
        }
        await this.getItemIn(itemIn.id)
        this.$refs['modalEditItemIn'].show()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onEditItemIn (id, field, value) {
      try {
        if (this.stockIn.is_calculate) {
          this.messageWarning(
            'Proses ini tidak diizinkan karena stok sudah di adjust'
          )
          return
        }
        await this.editItemIn(id, field, value)
        await this.allItemIn()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onDeleteItemIn (itemIn) {
      try {
        if (this.stockIn.is_calculate) {
          this.messageWarning(
            'Proses ini tidak diizinkan karena stok sudah di adjust'
          )
          return
        }
        const confirm = await this.deleteConfirm(itemIn.product_name)
        if (confirm) {
          this.$refs['modalEditItemIn'].hide()
          await this.deleteItemIn(itemIn.id)
          await this.allItemIn()
        }
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    }
  },
  mounted () {
    this.onAllStockIn()
  }
}
</script>

<style>

</style>

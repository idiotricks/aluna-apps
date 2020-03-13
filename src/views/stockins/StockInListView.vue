<template>
  <div v-if="init">
    <navbar-template app="StockIn Manager">
      <b-nav-item-dropdown text="Actions" right>
        <b-dropdown-item @click="onNewStockIn" href="#">New StockIn</b-dropdown-item>
      </b-nav-item-dropdown>
    </navbar-template>
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-3">
          <b-card header="Search StockIn">
            <search-template @onSearch="onSearchStockIn" />
          </b-card>
        </div>
        <div class="col-md-9">
          <b-card header="StockIns">
            <stock-in-list :stockIns="stockIns" @onSelected="onSelectedStockIn" />
            <pagination-template @onPaginate="onPaginateStockIn" :currentPage="stockInParams.page" :count="stockInCount" />
          </b-card>
        </div>
      </div>
    </div>
    <div class="popup">
      <b-modal
        ref="edit-modal-stockIn"
        :title="stockIn ? `${stockIn.numcode} / ${stockIn.date}` : ''"
        hide-footer
        size="xl"
      >
        <div class="row">
          <div class="col-md-6">
            <b-card header="Stock Date">
              <stock-in-edit :stockIn="stockIn" @onEdited="onEditedStockIn" />
            </b-card>
          </div>
          <div class="col-md-6">
            <b-card
              @click="_onChoiceModalSupplier(true)"
              header="Supplier"
              tag="article"
            >
              <supplier-detail :supplier="supplier" />
            </b-card>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-12">
            <b-card
              header="Items"
              tag="article"
            >
              <div class="row">
                <div class="col-md-12">
                  <b-button @click="_onChoiceModalProduct">New Item</b-button>
                </div>
                <div class="col-md-12 mt-4">
                  <item-in-list :itemIns="itemIns" @onSelected="onSelectedItemIn" />
                </div>
              </div>
            </b-card>
          </div>
        </div>
        <b-button-group class="mt-4" v-if="stockIn">
          <b-button @click="_onChoiceModalProduct(true)">Finish</b-button>
          <b-button @click="onDeletedStockIn(stockIn.id)">Remove</b-button>
        </b-button-group>
      </b-modal>
      <b-modal
        ref="choice-modal-supplier"
        title="Choose Supplier"
        hide-footer
        size="lg"
      >
        <supplier-choice @chooseSupplier="chooseSupplier" />
      </b-modal>
      <b-modal
        ref="choice-modal-product"
        title="Choose Product"
        hide-footer
        size="lg"
      >
        <product-choice @chooseProduct="chooseProduct" />
      </b-modal>
      <b-modal
        ref="edit-modal-itemin"
        title="Item"
        hide-footer
        size="lg"
      >
        <item-in-edit :itemIn="itemIn" @onEdited="onEditedItemIn" />
      </b-modal>
    </div>
  </div>
</template>

<script>
import NavbarTemplate from '@/templates/NavbarTemplate'
import SearchTemplate from '@/templates/SearchTemplate'
import PaginationTemplate from '@/templates/PaginationTemplate'

import StockInList from '@/components/stockins/StockInList'
import StockInDetail from '@/components/stockins/StockInDetail'
import StockInEdit from '@/components/stockins/StockInEdit'
import StockInMixin from '@/components/stockins/StockInMixin'

import SupplierChoice from '@/components/suppliers/SupplierChoice'
import SupplierDetail from '@/components/suppliers/SupplierDetail'
import SupplierMixin from '@/components/suppliers/SupplierMixin'

import ProductChoice from '@/components/products/ProductChoice'

import ItemInList from '@/components/itemins/ItemInList'
import ItemInEdit from '@/components/itemins/ItemInEdit'
import ItemInMixin from '@/components/itemins/ItemInMixin'

export default {
  name: 'stock-in-list-view',
  data () {
    return {
      init: false
    }
  },
  components: {
    'navbar-template': NavbarTemplate,
    'search-template': SearchTemplate,
    'pagination-template': PaginationTemplate,
    'stock-in-list': StockInList,
    'stock-in-detail': StockInDetail,
    'stock-in-edit': StockInEdit,
    'supplier-choice': SupplierChoice,
    'supplier-detail': SupplierDetail,
    'product-choice': ProductChoice,
    'item-in-list': ItemInList,
    'item-in-edit': ItemInEdit
  },
  mixins: [
    StockInMixin,
    SupplierMixin,
    ItemInMixin
  ],
  methods: {
    async onAllStockIn () {
      await this.stockInAll()
      this.init = true
    },
    async onSearchStockIn (search) {
      this.setSearchStockIn(search)
      this.onAllStockIn()
    },
    async onPaginateStockIn (page) {
      this.setPageStockIn(page)
      this.onAllStockIn()
    },
    async onNewStockIn () {
      this.stockInNew()
      this.resetItemIns()
      this.resetSupplier()
      this._onEditModalStockIn(true)
      this.onAllStockIn()
    },
    async onSelectedStockIn (stockIn) {
      this.stockIn = stockIn
      await this._onEditModalStockIn(true)
      await this.onGetSupplier(stockIn.supplier)
      await this.onAllItemIn(stockIn.id)
    },
    async onDeletedStockIn (id) {
      const confirm = window.confirm('Are you sure ?')
      if (confirm) {
        this._onEditModalStockIn(false)
        await this.stockInDelete(id)
        await this.onAllStockIn()
      }
    },
    async onEditedStockIn (id, field, value) {
      await this.stockInEdit(id, field, value)
      await this.onAllStockIn()
    },
    async _onEditModalStockIn (show) {
      if (show) {
        await this.$refs['edit-modal-stockIn'].show()
      } else {
        await this.$refs['edit-modal-stockIn'].hide()
      }
    },
    async _onChoiceModalSupplier (show) {
      if (show) {
        await this.$refs['choice-modal-supplier'].show()
      } else {
        await this.$refs['choice-modal-supplier'].hide()
      }
    },
    async onGetSupplier (id) {
      if (id) {
        await this.supplierGet(id)
      }
    },
    chooseSupplier (supplier) {
      this.stockInEdit(this.stockIn.id, 'supplier', supplier.id)
      this.stockInAll()
      this.supplierGet(supplier.id)
      this._onChoiceModalSupplier(false)
    },
    async _onChoiceModalProduct (show) {
      if (show) {
        await this.$refs['choice-modal-product'].show()
      } else {
        await this.$refs['choice-modal-product'].hide()
      }
    },
    async onAllItemIn (stockIn) {
      this.setFilterStockInItemIn(stockIn)
      await this.itemInAll()
    },
    async _onChoiceModalItemIn (show) {
      if (show) {
        await this.$refs['edit-modal-itemin'].show()
      } else {
        await this.$refs['edit-modal-itemin'].hide()
      }
    },
    async chooseProduct (product) {
      await this.itemInNew({stockin: this.stockIn.id, product: product.id})
      await this._onChoiceModalItemIn(true)
      await this.onAllItemIn(this.stockIn.id)
      await this._onChoiceModalProduct(false)
      await this.onGetItemIn(this.itemIn.id)
    },
    async onGetItemIn (id) {
      if (id) {
        await this.itemInGet(id)
      }
    },
    async onSelectedItemIn (itemIn) {
      this.itemIn = itemIn
      await this._onChoiceModalItemIn(true)
    },
    async onEditedItemIn (id, field, value) {
      await this.itemInEdit(id, field, value)
      await this.onAllItemIn(this.stockIn.id)
    }
  },
  async mounted () {
    await this.onAllStockIn()
  }
}
</script>

<style>

</style>

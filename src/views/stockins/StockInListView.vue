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
          <b-card header="Search StockIn" header-bg-variant="primary" border-variant="primary" header-text-variant="light">
            <search-template @onSearch="onSearchStockIn" />
          </b-card>
        </div>
        <div class="col-md-9">
          <b-card header="Stock In" header-bg-variant="primary" border-variant="primary" header-text-variant="light">
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
        scrollable
        header-bg-variant="primary"
        header-text-variant="light"
      >
        <div class="row">
          <div class="col-md-6">
            <b-card
              header="Stock Date"
              header-bg-variant="primary"
              border-variant="primary"
              header-text-variant="light"
            >
              <stock-in-edit :stockIn="stockIn" @onEdited="onEditedStockIn" />
            </b-card>
            <b-card
              header="Supplier"
              class="mt-4"
              header-bg-variant="primary"
              border-variant="primary"
              header-text-variant="light"
            >
              <div class="row">
                <div class="col-md-12">
                  <supplier-detail :supplier="supplier" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <b-button v-if="stockIn.is_calculate === false" @click="_onChoiceModalSupplier(true)" variant="success">Choose Supplier</b-button>
                </div>
              </div>
            </b-card>
          </div>
          <div class="col-md-6">
            <b-card
              header="Items"
              tag="article"
              header-bg-variant="primary"
              border-variant="primary"
              header-text-variant="light"
            >
              <div class="row" >
                <div class="col-md-12 mb-4" v-if="stockIn.is_calculate === false">
                  <b-button @click="_onChoiceModalProduct">New Item</b-button>
                </div>
                <div class="col-md-12">
                  <item-in-list :itemIns="itemIns" @onSelected="onSelectedItemIn" />
                </div>
              </div>
            </b-card>
          </div>
        </div>
        <b-button-group class="mt-4" v-if="stockIn">
          <b-button
            v-if="stockIn.is_init === false && stockIn.is_calculate === false"
            @click="onCalculateStockIn(stockIn)"
            variant="success"
          >
            Increase Stock
          </b-button>
          <b-button v-if="stockIn.is_init === false" variant="danger" @click="onDeletedStockIn(stockIn.id)">
            Remove
          </b-button>
          <b-button v-if="stockIn.is_init === true" variant="warning" @click="onDeletedStockIn(stockIn.id)">
            Discard
          </b-button>
        </b-button-group>
      </b-modal>
      <b-modal
        ref="choice-modal-supplier"
        title="Choose Supplier"
        hide-footer
        size="lg"
        scrollable
        header-bg-variant="primary"
        header-text-variant="light"
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
        <div class="row">
          <div class="col-md-12">
            <item-in-edit :itemIn="itemIn" @onEdited="onEditedItemIn" />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-12">
            <b-button variant="danger" @click="onDeleteItemIn(itemIn)">
              {{ itemIn.is_init ? 'Discard' : 'Remove' }}
            </b-button>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
// import { debounce } from 'debounce'
import HelperError from '@/helpers/HelperError'

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
      await this.setSearchStockIn(search)
      await this.stockInAll()
    },
    async onPaginateStockIn (page) {
      this.setPageStockIn(page)
      this.onAllStockIn()
    },
    async onNewStockIn () {
      await this.stockInNew()
      await this.resetItemIns()
      await this.resetSupplier()
      await this._onEditModalStockIn(true)
      await this.onAllStockIn()
    },
    async onSelectedStockIn (stockIn) {
      await this.stockInGet(stockIn.id)
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
      await this.stockInAll()
    },
    async _onEditModalStockIn (show) {
      if (show) {
        await this.$refs['edit-modal-stockIn'].show()
      } else {
        await this.$refs['edit-modal-stockIn'].hide()
      }
    },
    async onCalculateStockIn (stockIn) {
      try {
        await this.stockInCalculate(stockIn.id)
      } catch (error) {
        HelperError(error)
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
    async chooseSupplier (supplier) {
      await this.stockInEdit(this.stockIn.id, 'supplier', supplier.id)
      await this.stockInAll()
      await this.supplierGet(supplier.id)
      await this._onChoiceModalSupplier(false)
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
      if (this.stockIn.is_calculate) {
        // alert('This action is not permitted')
        return
      }
      this.itemIn = itemIn
      await this._onChoiceModalItemIn(true)
    },
    async onEditedItemIn (id, field, value) {
      await this.itemInEdit(id, field, value)
      await this.onAllItemIn(this.stockIn.id)
    },
    async onDeleteItemIn (itemIn) {
      await this._onChoiceModalItemIn(false)
      await this.itemInDelete(itemIn.id)
      await this.itemInAll()
    }
  },
  async mounted () {
    await this.onAllStockIn()
  }
}
</script>

<style>

</style>

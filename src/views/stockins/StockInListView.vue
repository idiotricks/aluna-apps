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
            <search-template
              @onSearch="onSearchStockIn"
              @onSearchPublish="onSearchPublishStockIn"
            />
          </b-card>
        </div>
        <div class="col-md-9">
          <b-modal
            ref="edit-modal-stockIn"
            :title="stockIn ? `${stockIn.numcode} / ${stockIn.date}` : ''"
            hide-footer
            no-close-on-backdrop
            no-close-on-esc
            no-fade
          >
            <stock-in-edit
              :stockIn="stockIn"
              @onEdited="onEditedStockIn"
            />
            <b-button-group v-if="stockIn">
              <b-button
                v-if="stockIn.is_publish"
                @click="onDraftStockIn(stockIn.id)"
              >
                Draft Mode
              </b-button>
              <b-button
                v-if="!stockIn.is_publish"
                @click="onPublishStockIn(stockIn.id)"
              >
                Publish
              </b-button>
              <b-button
                @click="onDeletedStockIn(stockIn.id)"
              >
                Remove
              </b-button>
              <b-button
                @click="_onChoiceModalSupplier(true)"
              >
                Choice Supplier
              </b-button>
            </b-button-group>
          </b-modal>
          <b-card header="StockIns">
            <stock-in-list
              :stockIns="stockIns"
              @onSelected="onSelectedStockIn"
            />
            <pagination-template
              @onPaginate="onPaginateStockIn"
              :currentPage="stockInParams.page"
              :count="stockInCount"
            />
          </b-card>
        </div>
      </div>
    </div>
    <div class="popup">
      <b-modal
        ref="choice-modal-supplier"
        title="Choice Supplier"
        hide-footer
        no-close-on-backdrop
        no-close-on-esc
        no-fade
        size="lg"
      >
        <supplier-choice />
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
    'supplier-choice': SupplierChoice
  },
  mixins: [
    StockInMixin
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
    async onSearchPublishStockIn (value) {
      this.setPublishStockIn(value)
      this.onAllStockIn()
    },
    async onPaginateStockIn (page) {
      this.setPageStockIn(page)
      this.onAllStockIn()
    },
    async onNewStockIn () {
      await this.stockInNew()
      await this.onAllStockIn()
    },
    async onSelectedStockIn (stockIn) {
      this.stockIn = stockIn
      this._onEditModalStockIn(true)
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
    async onPublishStockIn (id) {
      await this.stockInPublish(id)
      await this.onAllStockIn()
    },
    async onDraftStockIn (id) {
      await this.stockInDraft(id)
      await this.onAllStockIn()
    },
    _onEditModalStockIn (show) {
      if (show) {
        this.$refs['edit-modal-stockIn'].show()
      } else {
        this.$refs['edit-modal-stockIn'].hide()
      }
    },
    _onChoiceModalSupplier (show) {
      if (show) {
        this.$refs['choice-modal-supplier'].show()
      } else {
        this.$refs['choice-modal-supplier'].hide()
      }
    }
  },
  async mounted () {
    await this.onAllStockIn()
  }
}
</script>

<style>

</style>

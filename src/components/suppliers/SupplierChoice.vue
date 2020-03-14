<template>
  <div v-if="init">
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-12">
          <button
            class="btn btn-secondary"
            @click="onNewSupplier()"
          >
            New Supplier
          </button>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-12">
          <b-card header="Search Supplier">
            <search-template
              @onSearch="onSearchSupplier"
              @onSearchPublish="onSearchPublishSupplier"
            />
          </b-card>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-12">
          <b-modal
            ref="edit-modal-supplier"
            :title="supplier ? supplier.name : ''"
            hide-footer
          >
            <supplier-edit
              :supplier="supplier"
              @onEdited="onEditedSupplier"
            />
            <b-button-group v-if="supplier">
              <b-button
                v-if="!supplier.is_init"
                @click="chooseSupplier(supplier)"
              >
                Choose
              </b-button>
              <b-button
                @click="onDeleteSupplier(supplier)"
              >
                {{ supplier.is_init ? 'Discard' : 'Remove' }}
              </b-button>
            </b-button-group>
          </b-modal>
          <b-card header="Suppliers">
            <supplier-list
              :suppliers="suppliers"
              @onSelected="onSelectedSupplier"
            />
            <pagination-template
              @onPaginate="onPaginateSupplier"
              :currentPage="supplierParams.page"
              :count="supplierCount"
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

import SupplierList from '@/components/suppliers/SupplierList'
import SupplierDetail from '@/components/suppliers/SupplierDetail'
import SupplierEdit from '@/components/suppliers/SupplierEdit'
import SupplierMixin from '@/components/suppliers/SupplierMixin'

export default {
  name: 'supplier-choice',
  data () {
    return {
      init: false
    }
  },
  components: {
    'search-template': SearchTemplate,
    'pagination-template': PaginationTemplate,
    'supplier-list': SupplierList,
    'supplier-detail': SupplierDetail,
    'supplier-edit': SupplierEdit
  },
  mixins: [
    SupplierMixin
  ],
  methods: {
    async onAllSupplier () {
      await this.supplierAll()
      this.init = true
    },
    async onSearchSupplier (search) {
      this.setSearchSupplier(search)
      this.onAllSupplier()
    },
    async onSearchPublishSupplier (value) {
      this.setPublishSupplier(value)
      this.onAllSupplier()
    },
    async onPaginateSupplier (page) {
      this.setPageSupplier(page)
      this.onAllSupplier()
    },
    async onNewSupplier () {
      await this.supplierNew()
      await this.onAllSupplier()
      await this._onEditModalSupplier(true)
    },
    async onSelectedSupplier (supplier) {
      this.$emit('chooseSupplier', supplier)
    },
    async onEditedSupplier (id, field, value) {
      await this.supplierEdit(id, field, value)
      await this.onAllSupplier()
    },
    async onDeleteSupplier (supplier) {
      await this._onEditModalSupplier(false)
      await this.supplierDelete(supplier.id)
      await this.supplierAll()
    },
    _onEditModalSupplier (show) {
      if (show) {
        this.$refs['edit-modal-supplier'].show()
      } else {
        this.$refs['edit-modal-supplier'].hide()
      }
    },
    chooseSupplier (supplier) {
      this.$emit('chooseSupplier', supplier)
    }
  },
  async mounted () {
    await this.onAllSupplier()
  }
}
</script>

<style>

</style>

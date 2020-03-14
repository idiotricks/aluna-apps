<template>
  <div v-if="init">
    <navbar-template app="Supplier Manager">
      <b-nav-item-dropdown text="Actions" right>
        <b-dropdown-item @click="onNewSupplier" href="#">New Supplier</b-dropdown-item>
      </b-nav-item-dropdown>
    </navbar-template>
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-3">
          <b-card header="Search Supplier">
            <search-template
              @onSearch="onSearchSupplier"
              @onSearchPublish="onSearchPublishSupplier"
            />
          </b-card>
        </div>
        <div class="col-md-9">
          <b-modal
            ref="edit-modal-supplier"
            :title="supplier ? supplier.name : ''"
            hide-footer
            hide-header-close
          >
            <supplier-edit
              :supplier="supplier"
              @onEdited="onEditedSupplier"
            />
            <b-button-group v-if="supplier">
              <b-button @click="onDeletedSupplier(supplier.id)">
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
import NavbarTemplate from '@/templates/NavbarTemplate'
import SearchTemplate from '@/templates/SearchTemplate'
import PaginationTemplate from '@/templates/PaginationTemplate'

import SupplierList from '@/components/suppliers/SupplierList'
import SupplierDetail from '@/components/suppliers/SupplierDetail'
import SupplierEdit from '@/components/suppliers/SupplierEdit'
import SupplierMixin from '@/components/suppliers/SupplierMixin'

export default {
  name: 'supplier-list-view',
  data () {
    return {
      init: false
    }
  },
  components: {
    'navbar-template': NavbarTemplate,
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
      await this.setPublishSupplier(value)
      await this.onAllSupplier()
    },
    async onPaginateSupplier (page) {
      this.setPageSupplier(page)
      this.onAllSupplier()
    },
    async onNewSupplier () {
      await this.supplierNew()
      await this._onEditModalSupplier(true)
    },
    async onSelectedSupplier (supplier) {
      this.supplier = supplier
      await this._onEditModalSupplier(true)
    },
    async onDeletedSupplier (id) {
      const confirm = window.confirm('Are you sure ?')
      if (confirm) {
        this._onEditModalSupplier(false)
        await this.supplierDelete(id)
        await this.onAllSupplier()
      }
    },
    async onEditedSupplier (id, field, value) {
      await this.supplierEdit(id, field, value)
      await this.onAllSupplier()
    },
    async onPublishSupplier (id) {
      await this.supplierPublish(id)
      await this.onAllSupplier()
    },
    async onDraftSupplier (id) {
      await this.supplierDraft(id)
      await this.onAllSupplier()
    },
    _onEditModalSupplier (show) {
      if (show) {
        this.$refs['edit-modal-supplier'].show()
      } else {
        this.$refs['edit-modal-supplier'].hide()
      }
    }
  },
  async mounted () {
    await this.onAllSupplier()
  }
}
</script>

<style>

</style>

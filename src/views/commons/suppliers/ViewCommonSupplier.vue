<template>
  <div>
    <ui-common-header app="Supplier Manager">
      <b-nav-item-dropdown text="Actions" right>
        <b-dropdown-item v-if="segmentA" @click="onCreateSupplier()" href="#">
          New Supplier
        </b-dropdown-item>
        <b-dropdown-item
          v-if="segmentB"
          @click="onResetSupplier"
          href="#"
        >
          Back
        </b-dropdown-item>
        <b-dropdown-item
          v-if="segmentB"
          @click="onDeleteSupplier(supplier)"
          href="#"
        >
          {{ supplier.is_init ? 'Discard ' : 'Delete ' }}
          {{ supplier.name }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </ui-common-header>
    <!-- SEGMENT-A -->
    <div v-if="segmentA" class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-3">
          <b-card header="Search Supplier">
            <ui-common-search @search="onSearchSupplier" />
          </b-card>
          <b-card class="mt-4" header="Filter Supplier by Date">
            <ui-common-date-filter @filter="onFilterDateSupplier" />
          </b-card>
        </div>
        <div class="col-md-9">
          <b-card header="Suppliers">
            <supplier-list
              :objs="suppliers"
              :fields="[
                'numcode',
                'name',
                'phone',
                'created'
              ]"
              @take="onTakeSupplier"
            />
            <ui-common-pagination
              class="mt-3"
              :totalRows="totalSupplier"
              :currentPage="querySupplier.page"
              @paginate="onPaginateSupplier"
            />
          </b-card>
        </div>
      </div>
    </div>
    <!-- SEGMENT-B -->
    <div v-if="segmentB" class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-6">
          <b-card :header="supplier.name">
            <supplier-edit
              :obj="supplier"
              @edit="onEditSupplier"
            />
          </b-card>
        </div>
        <div class="col-md-6">
          <b-card header="Supplier Preview">
            <supplier-detail
              :obj="supplier"
              :fields="[
                'numcode',
                'name',
                'phone',
                'address',
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

import SupplierMixin from '@/components/suppliers/SupplierMixin'
import SupplierList from '@/components/suppliers/SupplierList'
import SupplierEdit from '@/components/suppliers/SupplierEdit'
import SupplierDetail from '@/components/suppliers/SupplierDetail'

export default {
  name: 'view-common-supplier',
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
    'supplier-list': SupplierList,
    'supplier-edit': SupplierEdit,
    'supplier-detail': SupplierDetail
  },
  mixins: [
    SupplierMixin
  ],
  methods: {
    async onAllSupplier () {
      try {
        await this.allSupplier()
      } catch (error) {
        console.log(error)
      }
    },
    async onTakeSupplier (supplier) {
      try {
        await this.getSupplier(supplier.id)
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
      }
    },
    async onCreateSupplier () {
      try {
        await this.createSupplier()
        await this.allSupplier()
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
      }
    },
    async onEditSupplier (id, field, value) {
      try {
        await this.editSupplier(id, field, value)
        await this.allSupplier()
      } catch (error) {
        console.log(error)
      }
    },
    onResetSupplier () {
      try {
        this.resetSupplier()
        this.segmentA = true
        this.segmentB = false
      } catch (error) {
        console.log(error)
      }
    },
    async onDeleteSupplier (supplier) {
      try {
        const confirm = await this.$bvModal.msgBoxConfirm(
          `Are you sure to delete "${supplier.name}"`,
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
          await this.deleteSupplier(supplier.id)
          await this.resetSupplier()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async onSearchSupplier (search) {
      try {
        this.setQuerySearchSupplier(search)
        await this.allSupplier()
      } catch (error) {
        console.log(error)
      }
    },
    async onPaginateSupplier (page) {
      try {
        this.setQueryPageSupplier(page)
        this.allSupplier()
      } catch (error) {
        console.log(error)
      }
    },
    async onFilterDateSupplier (startDate, endDate) {
      try {
        this.setQueryDateRangeSupplier(startDate, endDate)
        await this.allSupplier()
      } catch (error) {
        console.log(error)
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

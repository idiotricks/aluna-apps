<template>
  <div>
    <ui-common-header app="Supplier Manager" />
    <ui-common-action>
      <b-button-group size="sm" v-if="segmentA">
        <b-button @click="onExportCSVSupplier()">
          Export CSV
        </b-button>
        <b-button @click="onExportPDFSupplier()">
          Export PDF
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentA">
        <b-button variant="primary" @click="onCreateSupplier()">
          New Supplier
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button variant="outline-secondary" @click="onDeleteSupplier(supplier)">
          {{ supplier.is_init ? 'Discard ' : 'Delete Supplier' }}
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button @click="onResetSupplier">
          Back
        </b-button>
      </b-button-group>
    </ui-common-action>
    <b-container class="mb-4" :fluid="true">
      <b-row>
        <b-col>
          <b-card no-body>
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
          </b-card>
          <ui-common-pagination
            class="mt-4"
            :totalRows="totalSupplier"
            :currentPage="querySupplier.page"
            @paginate="onPaginateSupplier"
          />
        </b-col>
         <b-col v-if="segmentA" cols="3">
          <b-card header="Search Supplier">
            <ui-common-search @search="onSearchSupplier" />
          </b-card>
          <b-card class="mt-4" header="Filter Supplier by Date">
            <ui-common-date-filter @filter="onFilterDateSupplier" />
          </b-card>
        </b-col>
        <b-col v-if="segmentB" cols="6">
          <b-card header="Edit Supplier">
            <supplier-edit
              :obj="supplier"
              @edit="onEditSupplier"
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
    'ui-common-action': UICommonAction,
    'ui-common-pagination': UICommonPagination,
    'ui-common-search': UICommonSearch,
    'ui-common-date-filter': UICommonDateFilter,
    'supplier-list': SupplierList,
    'supplier-edit': SupplierEdit,
    'supplier-detail': SupplierDetail
  },
  mixins: [
    HelperAlert,
    SupplierMixin
  ],
  methods: {
    async onAllSupplier () {
      try {
        await this.allSupplier()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onTakeSupplier (supplier) {
      try {
        await this.getSupplier(supplier.id)
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
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
    onResetSupplier () {
      try {
        this.resetSupplier()
        this.segmentA = true
        this.segmentB = false
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
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
        this.errorHandler(error)
      }
    },
    async onExportCSVSupplier () {
      try {
        const data = await this.exportCSVSupplier()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-suppliers-${date.toLocaleDateString()}.csv`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onExportPDFSupplier () {
      try {
        const data = await this.exportPDFSupplier()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-suppliers-${date.toLocaleDateString()}.pdf`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onSearchSupplier (search) {
      try {
        this.setQuerySearchSupplier(search)
        await this.allSupplier()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onPaginateSupplier (page) {
      try {
        this.setQueryPageSupplier(page)
        this.allSupplier()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onFilterDateSupplier (startDate, endDate) {
      try {
        this.setQueryDateRangeSupplier(startDate, endDate)
        await this.allSupplier()
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
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

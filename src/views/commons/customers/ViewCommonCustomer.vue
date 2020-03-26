<template>
  <div>
    <ui-common-header app="Customer Manager" />
    <ui-common-action>
      <b-button-group size="sm" v-if="segmentA">
        <b-button @click="onExportCSVCustomer()">
          Export CSV
        </b-button>
        <b-button @click="onExportPDFCustomer()">
          Export PDF
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentA">
        <b-button variant="primary" @click="onCreateCustomer()">
          New Customer
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button variant="outline-secondary" @click="onDeleteCustomer(customer)">
          {{ customer.is_init ? 'Discard ' : 'Delete ' }} Customer
        </b-button>
      </b-button-group>
      <b-button-group size="sm" v-if="segmentB">
        <b-button @click="onResetCustomer">
          Close
        </b-button>
      </b-button-group>
    </ui-common-action>
    <b-container :fluid="true">
      <b-row class="mt-4">
        <b-col>
          <b-card no-body>
            <customer-list
              :objs="customers"
              :fields="[
                'numcode',
                'name',
                'phone',
                'created',
              ]"
              @take="onTakeCustomer"
            />
          </b-card>
          <ui-common-pagination
            class="mt-4"
            :totalRows="totalCustomer"
            :currentPage="queryCustomer.page"
            @paginate="onPaginateCustomer"
          />
        </b-col>
        <b-col v-if="segmentA" cols="3">
          <b-card header="Search Customer">
            <ui-common-search @search="onSearchCustomer" />
          </b-card>
          <b-card class="mt-4" header="Filter Customer by Date">
            <ui-common-date-filter @filter="onFilterDateCustomer" />
          </b-card>
        </b-col>
        <b-col v-if="segmentB" cols="6">
          <b-card header="Edit Customer">
            <customer-edit
              :obj="customer"
              @edit="onEditCustomer"
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

import CustomerMixin from '@/components/customers/CustomerMixin'
import CustomerList from '@/components/customers/CustomerList'
import CustomerEdit from '@/components/customers/CustomerEdit'
import CustomerDetail from '@/components/customers/CustomerDetail'

export default {
  name: 'view-common-customer',
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
    'customer-list': CustomerList,
    'customer-edit': CustomerEdit,
    'customer-detail': CustomerDetail
  },
  mixins: [
    CustomerMixin
  ],
  methods: {
    async onAllCustomer () {
      try {
        await this.allCustomer()
      } catch (error) {
        console.log(error)
      }
    },
    async onTakeCustomer (customer) {
      try {
        await this.getCustomer(customer.id)
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
      }
    },
    async onCreateCustomer () {
      try {
        await this.createCustomer()
        await this.allCustomer()
        this.segmentA = false
        this.segmentB = true
      } catch (error) {
        console.log(error)
      }
    },
    async onEditCustomer (id, field, value) {
      try {
        await this.editCustomer(id, field, value)
        await this.allCustomer()
      } catch (error) {
        console.log(error)
      }
    },
    onResetCustomer () {
      try {
        this.resetCustomer()
        this.segmentA = true
        this.segmentB = false
      } catch (error) {
        console.log(error)
      }
    },
    async onDeleteCustomer (customer) {
      try {
        const confirm = await this.$bvModal.msgBoxConfirm(
          `Are you sure to delete "${customer.name}"`,
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
          await this.deleteCustomer(customer.id)
          await this.resetCustomer()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async onSearchCustomer (search) {
      try {
        this.setQuerySearchCustomer(search)
        await this.allCustomer()
      } catch (error) {
        console.log(error)
      }
    },
    async onPaginateCustomer (page) {
      try {
        this.setQueryPageCustomer(page)
        this.allCustomer()
      } catch (error) {
        console.log(error)
      }
    },
    async onFilterDateCustomer (startDate, endDate) {
      try {
        this.setQueryDateRangeCustomer(startDate, endDate)
        await this.allCustomer()
      } catch (error) {
        console.log(error)
      }
    },
    async onExportCSVCustomer () {
      try {
        const data = await this.exportCSVCustomer()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-customer-${date.toLocaleDateString()}.csv`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
      }
    },
    async onExportPDFCustomer () {
      try {
        const data = await this.exportPDFCustomer()
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        const date = new Date()
        link.href = url
        link.setAttribute(
          'download',
          `report-customers-${date.toLocaleDateString()}.pdf`
        )
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted () {
    await this.onAllCustomer()
  }
}
</script>

<style>

</style>

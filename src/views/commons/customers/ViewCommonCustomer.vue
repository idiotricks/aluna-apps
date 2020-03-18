<template>
  <div>
    <ui-common-header app="Customer Manager">
      <b-nav-item-dropdown text="Actions" right>
        <b-dropdown-item v-if="segmentA" @click="onCreateCustomer()" href="#">
          New Customer
        </b-dropdown-item>
        <b-dropdown-item
          v-if="segmentB"
          @click="onResetCustomer"
          href="#"
        >
          Back
        </b-dropdown-item>
        <b-dropdown-item
          v-if="segmentB"
          @click="onDeleteCustomer(customer)"
          href="#"
        >
          {{ customer.is_init ? 'Discard ' : 'Delete ' }}
          {{ customer.name }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </ui-common-header>
    <!-- SEGMENT-A -->
    <div v-if="segmentA" class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-3">
          <b-card header="Search Customer">
            <ui-common-search @search="onSearchCustomer" />
          </b-card>
          <b-card class="mt-4" header="Filter Customer by Date">
            <ui-common-date-filter @filter="onFilterDateCustomer" />
          </b-card>
        </div>
        <div class="col-md-9">
          <b-card header="Customers">
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
            <ui-common-pagination
              class="mt-3"
              :totalRows="totalCustomer"
              :currentPage="queryCustomer.page"
              @paginate="onPaginateCustomer"
            />
          </b-card>
        </div>
      </div>
    </div>
    <!-- SEGMENT-B -->
    <div v-if="segmentB" class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-6">
          <b-card :header="customer.name">
            <customer-edit
              :obj="customer"
              @edit="onEditCustomer"
            />
          </b-card>
        </div>
        <div class="col-md-6">
          <b-card header="Preview Customer">
            <customer-detail
              :obj="customer"
              :fields="[
                'numcode',
                'name',
                'phone',
                'address'
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
    }
  },
  async mounted () {
    await this.onAllCustomer()
  }
}
</script>

<style>

</style>

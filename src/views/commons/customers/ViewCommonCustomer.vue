<template>
  <div>
    <ui-common-header app="Customer Manager">
      <b-nav-item-dropdown v-if="segmentA" text="Actions" right>
        <b-dropdown-item @click="onCreateCustomer()" href="#">
          New Customer
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown v-if="segmentB" text="Actions" right>
        <b-dropdown-item
          @click="() => {
            this.segmentA = true
            this.segmentB = false
            this.resetCustomer()
          }" href="#">
          Back
        </b-dropdown-item>
        <b-dropdown-item
          v-if="customer.is_init"
          @click="onDeleteCustomer(customer)"
          href="#"
        >
          Discard {{ customer.name }}
        </b-dropdown-item>
        <b-dropdown-item
          v-if="!customer.is_init"
          @click="onDeleteCustomer(customer)"
          href="#"
        >
          Delete {{ customer.name }}
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
        </div>
        <div class="col-md-9">
          <b-card header="Customers">
            <customer-list
              :objs="customers"
              :fields="['numcode', 'name', 'phone']"
              @take="onTakeCustomer"
            />
            <ui-common-pagination
              class="mt-3"
              :totalRows="totalCustomer"
              :currentPage="queryCustomer.page"
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
            <customer-edit :obj="customer" @edit="onEditCustomer" />
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
    async onDeleteCustomer (customer) {
      try {
        const confirm = window.confirm('Are you sure?')
        if (confirm) {
          this.segmentA = true
          this.segmentB = false
          await this.deleteCustomer(customer.id)
          await this.allCustomer()
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
    }
  },
  async mounted () {
    await this.onAllCustomer()
  }
}
</script>

<style>

</style>

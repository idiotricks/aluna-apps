<template>
  <div v-if="init">
    <navbar-template app="Customer Manager">
      <b-nav-item-dropdown text="Actions" right>
        <b-dropdown-item @click="onNewCustomer" href="#">New Customer</b-dropdown-item>
      </b-nav-item-dropdown>
    </navbar-template>
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-3">
          <b-card header="Search Customer">
            <search-template @onSearch="onSearchCustomer" />
          </b-card>
          <b-card class="mt-4" header="Search Customer">
            <ui-common-filter-date @filter="filterDateCustomer" />
          </b-card>
        </div>
        <div class="col-md-9">
          <b-modal
            ref="edit-modal-customer"
            :title="customer ? customer.name : ''"
            hide-footer
            no-close-on-backdrop
            no-close-on-esc
            no-fade
          >
            <customer-edit
              :customer="customer"
              @onEdited="onEditedCustomer"
            />
            <b-button-group v-if="customer">
              <b-button
                @click="onDeletedCustomer(customer.id)"
              >
                Remove
              </b-button>
            </b-button-group>
          </b-modal>
          <b-card header="Customers">
            <customer-list
              :customers="customers"
              @onSelected="onSelectedCustomer"
            />
            <pagination-template
              @onPaginate="onPaginateCustomer"
              :currentPage="customerParams.page"
              :count="customerCount"
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
import UICommonFilterDate from '@/templates/UICommonFilterDate'

import CustomerList from '@/components/customers/CustomerList'
import CustomerDetail from '@/components/customers/CustomerDetail'
import CustomerEdit from '@/components/customers/CustomerEdit'
import CustomerMixin from '@/components/customers/CustomerMixin'

export default {
  name: 'customer-list-view',
  data () {
    return {
      init: false
    }
  },
  components: {
    'navbar-template': NavbarTemplate,
    'search-template': SearchTemplate,
    'pagination-template': PaginationTemplate,
    'ui-common-filter-date': UICommonFilterDate,
    'customer-list': CustomerList,
    'customer-detail': CustomerDetail,
    'customer-edit': CustomerEdit
  },
  mixins: [
    CustomerMixin
  ],
  methods: {
    async onAllCustomer () {
      await this.customerAll()
      this.init = true
    },
    async onSearchCustomer (search) {
      this.setSearchCustomer(search)
      this.onAllCustomer()
    },
    async onPaginateCustomer (page) {
      this.setPageCustomer(page)
      this.onAllCustomer()
    },
    async onNewCustomer () {
      this.customerNew()
      this._onEditModalCustomer(true)
    },
    async onSelectedCustomer (customer) {
      this.customer = customer
      this._onEditModalCustomer(true)
    },
    async onDeletedCustomer (id) {
      const confirm = window.confirm('Are you sure ?')
      if (confirm) {
        this._onEditModalCustomer(false)
        await this.customerDelete(id)
        await this.onAllCustomer()
      }
    },
    async onEditedCustomer (id, field, value) {
      await this.customerEdit(id, field, value)
      await this.onAllCustomer()
    },
    _onEditModalCustomer (show) {
      if (show) {
        this.$refs['edit-modal-customer'].show()
      } else {
        this.$refs['edit-modal-customer'].hide()
      }
    },
    filterDateCustomer (startDate, endDate) {
      console.log(startDate, endDate)
    }
  },
  async mounted () {
    await this.onAllCustomer()
  }
}
</script>

<style>

</style>

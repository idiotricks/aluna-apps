<template>
  <div v-if="init">
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-md-12">
          <button
            class="btn btn-secondary"
            @click="onNewCustomer()"
          >
            New Customer
          </button>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-12">
          <b-card header="Search Customer">
            <search-template @onSearch="onSearchCustomer"/>
          </b-card>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-12">
          <b-modal
            ref="edit-modal-customer"
            :title="customer ? customer.name : ''"
            hide-footer
          >
            <customer-edit
              :customer="customer"
              @onEdited="onEditedCustomer"
            />
            <b-button-group v-if="customer">
              <b-button
                v-if="!customer.is_init"
                @click="chooseCustomer(customer)"
              >
                Choose
              </b-button>
              <b-button
                @click="onDeleteCustomer(customer)"
              >
                {{ customer.is_init ? 'Discard' : 'Remove' }}
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
import SearchTemplate from '@/templates/SearchTemplate'
import PaginationTemplate from '@/templates/PaginationTemplate'

import CustomerList from '@/components/customers/CustomerList'
import CustomerDetail from '@/components/customers/CustomerDetail'
import CustomerEdit from '@/components/customers/CustomerEdit'
import CustomerMixin from '@/components/customers/CustomerMixin'

export default {
  name: 'customer-choice',
  data () {
    return {
      init: false
    }
  },
  components: {
    'search-template': SearchTemplate,
    'pagination-template': PaginationTemplate,
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
      await this.customerNew()
      await this.onAllCustomer()
      await this._onEditModalCustomer(true)
    },
    async onSelectedCustomer (customer) {
      this.$emit('chooseCustomer', customer)
    },
    async onEditedCustomer (id, field, value) {
      await this.customerEdit(id, field, value)
      await this.onAllCustomer()
    },
    async onDeleteCustomer (customer) {
      await this._onEditModalCustomer(false)
      await this.customerDelete(customer.id)
      await this.customerAll()
    },
    _onEditModalCustomer (show) {
      if (show) {
        this.$refs['edit-modal-customer'].show()
      } else {
        this.$refs['edit-modal-customer'].hide()
      }
    },
    chooseCustomer (customer) {
      this.$emit('chooseCustomer', customer)
    }
  },
  async mounted () {
    await this.onAllCustomer()
  }
}
</script>

<style>

</style>

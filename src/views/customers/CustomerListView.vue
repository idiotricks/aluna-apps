<template>
  <div>
    <navbar-template app="Customer Manager">
      <b-nav-item-dropdown text="Actions" right>
        <b-dropdown-item @click="onNewCustomer" href="#">New Customer</b-dropdown-item>
      </b-nav-item-dropdown>
    </navbar-template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 mt-4">
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
                v-if="customer.is_publish"
                @click="onDraftCustomer(customer.id)"
              >
                Draft Mode
              </b-button>
              <b-button
                v-if="!customer.is_publish"
                @click="onPublishCustomer(customer.id)"
              >
                Publish
              </b-button>
              <b-button
                @click="onDeletedCustomer(customer.id)"
              >
                Remove
              </b-button>
            </b-button-group>
          </b-modal>
          <b-card title="Customers">
            <customer-list
              :customers="customers"
              @onSelected="onSelectedCustomer"
            />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarTemplate from '@/templates/NavbarTemplate'

import CustomerList from '@/components/customers/CustomerList'
import CustomerDetail from '@/components/customers/CustomerDetail'
import CustomerEdit from '@/components/customers/CustomerEdit'
import CustomerMixin from '@/components/customers/CustomerMixin'

export default {
  name: 'customer-list-view',
  data () {
    return {
      customers: [],
      customer: null,
      settings: {
        showCustomerList: false,
        showCustomerDetail: false,
        showCustomerEdit: false
      }
    }
  },
  components: {
    'navbar-template': NavbarTemplate,
    'customer-list': CustomerList,
    'customer-detail': CustomerDetail,
    'customer-edit': CustomerEdit
  },
  mixins: [
    CustomerMixin
  ],
  methods: {
    async onAllCustomer () {
      const { results } = await this.customerAll()
      this.customers = results
    },
    async onNewCustomer () {
      await this.customerNew()
      this.onAllCustomer()
    },
    async onSelectedCustomer (customer) {
      this.customer = await customer
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
      this.customerEdit(id, field, value)
    },
    async onPublishCustomer (id) {
      this.customer = await this.customerPublish(id)
      this.onAllCustomer()
    },
    async onDraftCustomer (id) {
      this.customer = await this.customerDraft(id)
      this.onAllCustomer()
    },
    _onEditModalCustomer (show) {
      if (show) {
        this.$refs['edit-modal-customer'].show()
      } else {
        this.$refs['edit-modal-customer'].hide()
      }
    }
  },
  async mounted () {
    this.onAllCustomer()
  }
}
</script>

<style>

</style>

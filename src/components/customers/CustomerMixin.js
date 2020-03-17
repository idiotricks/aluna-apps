export default {
  data () {
    return {
      customer: {},
      customers: [],
      totalCustomer: 0,
      queryCustomer: {
        page: 1,
        search: '',
        is_init: false
      }
    }
  },
  methods: {
    async allCustomer () {},
    async createCustomer (payload) {},
    async getCustomer (id) {},
    async editCustomer (id, field, value) {},
    async deleteCustomer (id) {},
    setQueryPageCustomer (page) {},
    setQuerySearchCustomer (search) {},
    resetCustomer () {}
  }
}

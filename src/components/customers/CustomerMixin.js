export default {
  data () {
    return {
      customer: {},
      customers: [],
      customerCount: 0,
      customerParams: {
        page: 1,
        search: '',
        is_init: false
      }
    }
  },
  methods: {
    async customerAll () {
      let url = `${process.env.BASE_URL}/customers/`
      const config = {
        params: this.customerParams,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }

      const { data } = await this.$http.get(url, config)
      this.customers = data.results
      this.customerCount = data.count
    },
    async customerNew () {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/customers/`
      const { data } = await this.$http.post(url, null, config)
      this.customer = data
    },
    async customerGet (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/customers/${id}/`
      const { data } = await this.$http.get(url, config)
      this.customer = data
    },
    async customerEdit (id, field, value) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const payload = {
        [field]: value,
        is_init: false
      }
      const url = `${process.env.BASE_URL}/customers/${id}/`
      const { data } = await this.$http.patch(url, payload, config)
      this.customer = data
    },
    async customerDelete (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/customers/${id}/`
      await this.$http.delete(url, config)
      this.customer = null
    },
    async customerPublish (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/customers/${id}/publish/`
      const { data } = await this.$http.post(url, null, config)
      this.customer = data
    },
    async customerDraft (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/customers/${id}/draft/`
      const { data } = await this.$http.post(url, null, config)
      this.customer = data
    },
    setPageCustomer (page) {
      this.customerParams.page = page
    },
    setSearchCustomer (search) {
      this.customerParams.search = search
      this.customerParams.page = 1
    }
  }
}

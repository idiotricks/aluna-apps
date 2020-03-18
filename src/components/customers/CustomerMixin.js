export default {
  data () {
    return {
      customer: {},
      customers: [],
      totalCustomer: 0,
      queryCustomer: {
        page: 1,
        search: null,
        is_init: false,
        start_date: null,
        end_date: null
      }
    }
  },
  methods: {
    buildTargetCustomer (args) {
      if (args) {
        let target = args.join('/')
        return `${process.env.BASE_URL}/customers/${target}/`
      }
      return `${process.env.BASE_URL}/customers/`
    },
    buildHeaderCustomer (headers) {
      const contentType = {
        'Content-Type': 'application/json'
      }
      if (headers) {
        return {...headers, ...contentType}
      }

      return contentType
    },
    buildConfigCustomer (headers, useParams) {
      return {
        params: useParams ? this.queryCustomer : null,
        headers: this.buildHeaderCustomer(headers)
      }
    },
    async allCustomer () {
      const { data } = await this.$http.get(
        this.buildTargetCustomer(),
        this.buildConfigCustomer({
          'Authorization': localStorage.getItem('token')
        }, true)
      )
      this.customers = data.results
      this.totalCustomer = data.count
    },
    async createCustomer (payload) {
      const { data } = await this.$http.post(
        this.buildTargetCustomer(),
        payload,
        this.buildConfigCustomer({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.customer = data
    },
    async getCustomer (id) {
      const { data } = await this.$http.get(
        this.buildTargetCustomer([id]),
        this.buildConfigCustomer({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.customer = data
    },
    async editCustomer (id, field, value) {
      const payload = {
        [field]: value,
        is_init: false
      }

      const { data } = await this.$http.patch(
        this.buildTargetCustomer([id]),
        payload,
        this.buildConfigCustomer({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.customer = data
    },
    async deleteCustomer (id) {
      await this.$http.delete(
        this.buildTargetCustomer([id]),
        this.buildConfigCustomer({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.customer = {}
    },
    setQueryPageCustomer (page) {
      this.queryCustomer.page = page
    },
    setQuerySearchCustomer (search) {
      this.queryCustomer.search = search
      this.queryCustomer.page = 1
    },
    setQueryDateRangeCustomer (startDate, endDate) {
      this.queryCustomer.start_date = startDate
      this.queryCustomer.end_date = endDate
      this.queryCustomer.page = 1
    },
    resetCustomer () {
      this.customer = {}
      this.totalCustomer = 0
      this.queryCustomer.page = 1
      this.queryCustomer.search = null
      this.queryCustomer.start_date = null
      this.queryCustomer.end_date = null
      this.allCustomer()
    }
  }
}

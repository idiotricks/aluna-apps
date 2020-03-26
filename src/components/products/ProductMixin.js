export default {
  data () {
    return {
      product: null,
      products: [],
      totalProduct: 0,
      queryProduct: {
        page: 1,
        search: null,
        is_init: false,
        start_date: null,
        end_date: null
      }
    }
  },
  methods: {
    buildTargetProduct (args) {
      if (args) {
        let target = args.join('/')
        return `${process.env.BASE_URL}/products/${target}/`
      }
      return `${process.env.BASE_URL}/products/`
    },
    buildHeaderProduct (headers) {
      const contentType = {
        'Content-Type': 'application/json'
      }
      if (headers) {
        return {...headers, ...contentType}
      }

      return contentType
    },
    buildConfigProduct (headers, useParams) {
      return {
        params: useParams ? this.queryProduct : null,
        headers: this.buildHeaderProduct(headers)
      }
    },
    async allProduct () {
      const { data } = await this.$http.get(
        this.buildTargetProduct(),
        this.buildConfigProduct({
          'Authorization': localStorage.getItem('token')
        }, true)
      )
      this.products = data.results
      this.totalProduct = data.count
    },
    async createProduct (payload) {
      const { data } = await this.$http.post(
        this.buildTargetProduct(),
        payload,
        this.buildConfigProduct({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.product = data
    },
    async getProduct (id) {
      if (!id) {
        this.product = id
        return
      }
      const { data } = await this.$http.get(
        this.buildTargetProduct([id]),
        this.buildConfigProduct({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.product = data
    },
    async editProduct (id, field, value) {
      const payload = {
        [field]: value,
        is_init: false
      }

      const { data } = await this.$http.patch(
        this.buildTargetProduct([id]),
        payload,
        this.buildConfigProduct({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.product = data
    },
    async deleteProduct (id) {
      await this.$http.delete(
        this.buildTargetProduct([id]),
        this.buildConfigProduct({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.product = null
    },
    async exportCSVProduct () {
      const { data } = await this.$http.get(
        this.buildTargetProduct(['export_csv']),
        this.buildConfigProduct({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/csv'
        }, true)
      )
      return data
    },
    async exportPDFProduct () {
      const { data } = await this.$http.get(
        this.buildTargetProduct(['export_pdf']),
        this.buildConfigProduct({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/pdf'
        }, true)
      )
      return data
    },
    setQueryPageProduct (page) {
      this.queryProduct.page = page
    },
    setQuerySearchProduct (search) {
      this.queryProduct.search = search
      this.queryProduct.page = 1
    },
    setQueryDateRangeProduct (startDate, endDate) {
      this.queryProduct.start_date = startDate
      this.queryProduct.end_date = endDate
      this.queryProduct.page = 1
    },
    resetProduct () {
      this.product = {}
      this.totalProduct = 0
      this.queryProduct.page = 1
      this.queryProduct.search = null
      this.queryProduct.start_date = null
      this.queryProduct.end_date = null
      this.allProduct()
    }
  }
}

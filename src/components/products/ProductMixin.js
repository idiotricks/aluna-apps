export default {
  data () {
    return {
      product: {},
      products: [],
      productCount: 0,
      productParams: {
        page: 1,
        search: ''
      }
    }
  },
  methods: {
    async productAll () {
      let url = `${process.env.BASE_URL}/products/`
      const config = {
        params: this.productParams,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }

      const { data } = await this.$http.get(url, config)
      this.products = data.results
      this.productCount = data.count
    },
    async productNew () {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      console.log(config)
      const url = `${process.env.BASE_URL}/products/`
      const { data } = await this.$http.post(url, null, config)
      this.product = data
    },
    async productGet (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/products/${id}/`
      const { data } = await this.$http.get(url, config)
      this.product = data
    },
    async productEdit (id, field, value) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const payload = {
        [field]: value
      }
      const url = `${process.env.BASE_URL}/products/${id}/`
      const { data } = await this.$http.patch(url, payload, config)
      this.product = data
    },
    async productDelete (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/products/${id}/`
      await this.$http.delete(url, config)
      this.product = null
    },
    async productPublish (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/products/${id}/publish/`
      const { data } = await this.$http.post(url, null, config)
      this.product = data
    },
    async productDraft (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/products/${id}/draft/`
      const { data } = await this.$http.post(url, null, config)
      this.product = data
    },
    setPageProduct (page) {
      this.productParams.page = page
    },
    setSearchProduct (search) {
      this.productParams.search = search
      this.productParams.page = 1
    }
  }
}

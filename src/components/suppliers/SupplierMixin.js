export default {
  data () {
    return {
      supplier: {},
      suppliers: [],
      supplierCount: 0,
      supplierParams: {
        page: 1,
        search: '',
        is_publish: null
      }
    }
  },
  methods: {
    async supplierAll () {
      let url = `${process.env.BASE_URL}/suppliers/`
      const config = {
        params: this.supplierParams,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }

      const { data } = await this.$http.get(url, config)
      this.suppliers = data.results
      this.supplierCount = data.count
    },
    async supplierNew () {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      console.log(config)
      const url = `${process.env.BASE_URL}/suppliers/`
      const { data } = await this.$http.post(url, null, config)
      this.supplier = data
    },
    async supplierGet (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/suppliers/${id}/`
      const { data } = await this.$http.get(url, config)
      this.supplier = data
    },
    async supplierEdit (id, field, value) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const payload = {
        [field]: value
      }
      const url = `${process.env.BASE_URL}/suppliers/${id}/`
      const { data } = await this.$http.patch(url, payload, config)
      this.supplier = data
    },
    async supplierDelete (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/suppliers/${id}/`
      await this.$http.delete(url, config)
      this.supplier = null
    },
    setSearchSupplier (search) {
      this.supplierParams.search = search
      this.supplierParams.page = 1
    },
    setPageSupplier (page) {
      this.supplierParams.page = page
    },
    resetSupplier () {
      // TODO: menambahkan reset
      this.supplier = {}
    }
  }
}

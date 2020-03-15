export default {
  data () {
    return {
      stockOut: {},
      stockOuts: [],
      stockOutCount: 0,
      stockOutParams: {
        page: 1,
        search: '',
        is_init: false
      }
    }
  },
  methods: {
    async stockOutAll () {
      let url = `${process.env.BASE_URL}/stock-out/`
      const config = {
        params: this.stockOutParams,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }

      const { data } = await this.$http.get(url, config)
      this.stockOuts = data.results
      this.stockOutCount = data.count
    },
    async stockOutNew () {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/stock-out/`
      const { data } = await this.$http.post(url, null, config)
      this.stockOut = data
    },
    async stockOutGet (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/stock-out/${id}/`
      const { data } = await this.$http.get(url, config)
      this.stockOut = data
    },
    async stockOutEdit (id, field, value) {
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
      const url = `${process.env.BASE_URL}/stock-out/${id}/`
      const { data } = await this.$http.patch(url, payload, config)
      this.stockOut = data
    },
    async stockOutDelete (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/stock-out/${id}/`
      await this.$http.delete(url, config)
      this.stockOut = null
    },
    setPageStockOut (page) {
      this.stockOutParams.page = page
    },
    setSearchStockOut (search) {
      this.stockOutParams.search = search
      this.stockOutParams.page = 1
    },
    async stockOutCalculate (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/stock-out/${id}/calculate/`
      const { data } = await this.$http.post(url, null, config)
      this.stockOut = data
    }
  }
}

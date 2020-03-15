export default {
  data () {
    return {
      itemOut: {},
      itemOuts: [],
      itemOutCount: 0,
      itemOutParams: {
        page: 1,
        search: '',
        product: null,
        stockout: null,
        is_init: false
      }
    }
  },
  methods: {
    async itemOutAll () {
      let url = `${process.env.BASE_URL}/item-out/`
      const config = {
        params: this.itemOutParams,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }

      const { data } = await this.$http.get(url, config)
      this.itemOuts = data.results
      this.itemOutCount = data.count
    },
    async itemOutNew (payload) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/item-out/`
      const { data } = await this.$http.post(url, payload, config)
      this.itemOut = data
    },
    async itemOutGet (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/item-out/${id}/`
      const { data } = await this.$http.get(url, config)
      this.itemOut = data
    },
    async itemOutEdit (id, field, value) {
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
      const url = `${process.env.BASE_URL}/item-out/${id}/`
      const { data } = await this.$http.patch(url, payload, config)
      this.itemOut = data
    },
    async itemOutDelete (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/item-out/${id}/`
      await this.$http.delete(url, config)
      this.itemOut = {}
    },
    setPageItemOut (page) {
      this.itemOutParams.page = page
    },
    setSearchItemOut (search) {
      this.itemOutParams.search = search
      this.itemOutParams.page = 1
    },
    setFilterProductItemOut (product) {
      this.itemOutParams.product = product
      this.itemOutParams.page = 1
    },
    setFilterStockInItemOut (stockIn) {
      this.itemOutParams.stockin = stockIn
      this.itemOutParams.page = 1
    },
    resetItemOuts () {
      this.itemOuts = []
    }
  }
}

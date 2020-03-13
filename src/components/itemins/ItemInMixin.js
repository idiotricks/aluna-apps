export default {
  data () {
    return {
      itemIn: {},
      itemIns: [],
      itemInCount: 0,
      itemInParams: {
        page: 1,
        search: '',
        product: null,
        stockin: null
      }
    }
  },
  methods: {
    async itemInAll () {
      let url = `${process.env.BASE_URL}/item-in/`
      const config = {
        params: this.itemInParams,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }

      const { data } = await this.$http.get(url, config)
      this.itemIns = data.results
      this.itemInCount = data.count
    },
    async itemInNew (payload) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/item-in/`
      const { data } = await this.$http.post(url, payload, config)
      this.itemIn = data
    },
    async itemInGet (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/item-in/${id}/`
      const { data } = await this.$http.get(url, config)
      this.itemIn = data
    },
    async itemInEdit (id, field, value) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const payload = {
        [field]: value
      }
      const url = `${process.env.BASE_URL}/item-in/${id}/`
      const { data } = await this.$http.patch(url, payload, config)
      this.itemIn = data
    },
    async itemInDelete (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/item-in/${id}/`
      await this.$http.delete(url, config)
      this.itemIn = null
    },
    setPageItemIn (page) {
      this.itemInParams.page = page
    },
    setSearchItemIn (search) {
      this.itemInParams.search = search
      this.itemInParams.page = 1
    },
    setFilterProductItemIn (product) {
      this.itemInParams.product = product
      this.itemInParams.page = 1
    },
    setFilterStockInItemIn (stockIn) {
      this.itemInParams.stockin = stockIn
      this.itemInParams.page = 1
    },
    resetItemIns () {
      this.itemIns = []
    }
  }
}

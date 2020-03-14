export default {
  data () {
    return {
      stockIn: {},
      stockIns: [],
      stockInCount: 0,
      stockInParams: {
        page: 1,
        search: '',
        is_init: false
      }
    }
  },
  methods: {
    async stockInAll () {
      let url = `${process.env.BASE_URL}/stock-in/`
      const config = {
        params: this.stockInParams,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }

      const { data } = await this.$http.get(url, config)
      this.stockIns = data.results
      this.stockInCount = data.count
    },
    async stockInNew () {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/stock-in/`
      const { data } = await this.$http.post(url, null, config)
      this.stockIn = data
    },
    async stockInGet (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/stock-in/${id}/`
      const { data } = await this.$http.get(url, config)
      this.stockIn = data
    },
    async stockInEdit (id, field, value) {
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
      const url = `${process.env.BASE_URL}/stock-in/${id}/`
      const { data } = await this.$http.patch(url, payload, config)
      this.stockIn = data
    },
    async stockInDelete (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/stock-in/${id}/`
      await this.$http.delete(url, config)
      this.stockIn = null
    },
    async stockInPublish (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/stock-in/${id}/publish/`
      const { data } = await this.$http.post(url, null, config)
      this.stockIn = data
    },
    async stockInDraft (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/stock-in/${id}/draft/`
      const { data } = await this.$http.post(url, null, config)
      this.stockIn = data
    },
    setPageStockIn (page) {
      this.stockInParams.page = page
    },
    setSearchStockIn (search) {
      this.stockInParams.search = search
      this.stockInParams.page = 1
    },
    async stockInCalculate (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/stock-in/${id}/calculate/`
      const { data } = await this.$http.post(url, null, config)
      this.stockIn = data
    }
  }
}

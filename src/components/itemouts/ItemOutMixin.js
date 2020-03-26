export default {
  data () {
    return {
      itemOut: null,
      itemOuts: [],
      totalItemOut: 0,
      queryItemOut: {
        page: 1,
        search: null,
        is_init: false,
        start_date: null,
        end_date: null,
        product: null,
        stockout: null
      }
    }
  },
  methods: {
    buildTargetItemOut (args) {
      if (args) {
        let target = args.join('/')
        return `${process.env.BASE_URL}/item-out/${target}/`
      }
      return `${process.env.BASE_URL}/item-out/`
    },
    buildHeaderItemOut (headers) {
      const contentType = {
        'Content-Type': 'application/json'
      }
      if (headers) {
        return {...headers, ...contentType}
      }

      return contentType
    },
    buildConfigItemOut (headers, useParams) {
      return {
        params: useParams ? this.queryItemOut : null,
        headers: this.buildHeaderItemOut(headers)
      }
    },
    async allItemOut () {
      const { data } = await this.$http.get(
        this.buildTargetItemOut(),
        this.buildConfigItemOut({
          'Authorization': localStorage.getItem('token')
        }, true)
      )
      this.itemOuts = data.results
      this.totalItemOut = data.count
    },
    async createItemOut (payload) {
      const { data } = await this.$http.post(
        this.buildTargetItemOut(),
        payload,
        this.buildConfigItemOut({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.itemOut = data
    },
    async getItemOut (id) {
      if (!id) {
        this.itemOut = id
        return
      }
      const { data } = await this.$http.get(
        this.buildTargetItemOut([id]),
        this.buildConfigItemOut({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.itemOut = data
    },
    async editItemOut (id, field, value) {
      const payload = {
        [field]: value,
        is_init: false
      }

      const { data } = await this.$http.patch(
        this.buildTargetItemOut([id]),
        payload,
        this.buildConfigItemOut({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.itemOut = data
    },
    async deleteItemOut (id) {
      await this.$http.delete(
        this.buildTargetItemOut([id]),
        this.buildConfigItemOut({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.itemOut = null
    },
    setQueryPageItemOut (page) {
      this.queryItemOut.page = page
    },
    setQuerySearchItemOut (search) {
      this.queryItemOut.search = search
      this.queryItemOut.page = 1
    },
    setQueryDateRangeItemOut (startDate, endDate) {
      this.queryItemOut.start_date = startDate
      this.queryItemOut.end_date = endDate
      this.queryItemOut.page = 1
    },
    setQueryProductItemOut (product) {
      this.queryItemOut.product = product
    },
    setQueryStockOutItemOut (stockOut) {
      this.queryItemOut.stockout = stockOut
    },
    resetItemOut () {
      this.itemOut = {}
      this.totalItemOut = 0
      this.queryItemOut.page = 1
      this.queryItemOut.search = null
      this.queryItemOut.start_date = null
      this.queryItemOut.end_date = null
      this.allItemOut()
    }
  }
}

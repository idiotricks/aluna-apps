export default {
  data () {
    return {
      itemIn: null,
      itemIns: [],
      totalItemIn: 0,
      queryItemIn: {
        page: 1,
        search: null,
        is_init: false,
        start_date: null,
        end_date: null,
        product: null,
        stockin: null
      }
    }
  },
  methods: {
    buildTargetItemIn (args) {
      if (args) {
        let target = args.join('/')
        return `${process.env.BASE_URL}/item-in/${target}/`
      }
      return `${process.env.BASE_URL}/item-in/`
    },
    buildHeaderItemIn (headers) {
      const contentType = {
        'Content-Type': 'application/json'
      }
      if (headers) {
        return {...headers, ...contentType}
      }

      return contentType
    },
    buildConfigItemIn (headers, useParams) {
      return {
        params: useParams ? this.queryItemIn : null,
        headers: this.buildHeaderItemIn(headers)
      }
    },
    async allItemIn () {
      const { data } = await this.$http.get(
        this.buildTargetItemIn(),
        this.buildConfigItemIn({
          'Authorization': localStorage.getItem('token')
        }, true)
      )
      this.itemIns = data.results
      this.totalItemIn = data.count
    },
    async createItemIn (payload) {
      const { data } = await this.$http.post(
        this.buildTargetItemIn(),
        payload,
        this.buildConfigItemIn({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.itemIn = data
    },
    async getItemIn (id) {
      if (!id) {
        this.itemIn = id
        return
      }
      const { data } = await this.$http.get(
        this.buildTargetItemIn([id]),
        this.buildConfigItemIn({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.itemIn = data
    },
    async editItemIn (id, field, value) {
      const payload = {
        [field]: value,
        is_init: false
      }

      const { data } = await this.$http.patch(
        this.buildTargetItemIn([id]),
        payload,
        this.buildConfigItemIn({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.itemIn = data
    },
    async deleteItemIn (id) {
      await this.$http.delete(
        this.buildTargetItemIn([id]),
        this.buildConfigItemIn({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.itemIn = null
    },
    setQueryPageItemIn (page) {
      this.queryItemIn.page = page
    },
    setQuerySearchItemIn (search) {
      this.queryItemIn.search = search
      this.queryItemIn.page = 1
    },
    setQueryDateRangeItemIn (startDate, endDate) {
      this.queryItemIn.start_date = startDate
      this.queryItemIn.end_date = endDate
      this.queryItemIn.page = 1
    },
    setQueryProductItemIn (product) {
      this.queryItemIn.product = product
    },
    setQueryStockInItemIn (stockIn) {
      this.queryItemIn.stockin = stockIn
    },
    resetItemIn () {
      this.itemIn = {}
      this.totalItemIn = 0
      this.queryItemIn.page = 1
      this.queryItemIn.search = null
      this.queryItemIn.start_date = null
      this.queryItemIn.end_date = null
      this.allItemIn()
    }
  }
}

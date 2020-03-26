export default {
  data () {
    return {
      stockOut: null,
      stockOuts: [],
      totalStockOut: 0,
      queryStockOut: {
        page: 1,
        search: null,
        is_init: false,
        start_date: null,
        end_date: null
      }
    }
  },
  methods: {
    buildTargetStockOut (args) {
      if (args) {
        let target = args.join('/')
        return `${process.env.BASE_URL}/stock-out/${target}/`
      }
      return `${process.env.BASE_URL}/stock-out/`
    },
    buildHeaderStockOut (headers) {
      const contentType = {
        'Content-Type': 'application/json'
      }
      if (headers) {
        return {...headers, ...contentType}
      }

      return contentType
    },
    buildConfigStockOut (headers, useParams) {
      return {
        params: useParams ? this.queryStockOut : null,
        headers: this.buildHeaderStockOut(headers)
      }
    },
    async allStockOut () {
      const { data } = await this.$http.get(
        this.buildTargetStockOut(),
        this.buildConfigStockOut({
          'Authorization': localStorage.getItem('token')
        }, true)
      )
      this.stockOuts = data.results
      this.totalStockOut = data.count
    },
    async createStockOut (payload) {
      const { data } = await this.$http.post(
        this.buildTargetStockOut(),
        payload,
        this.buildConfigStockOut({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockOut = data
    },
    async getStockOut (id) {
      if (!id) {
        this.stockOut = id
        return
      }
      const { data } = await this.$http.get(
        this.buildTargetStockOut([id]),
        this.buildConfigStockOut({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockOut = data
    },
    async editStockOut (id, field, value) {
      const payload = {
        [field]: value,
        is_init: false
      }

      const { data } = await this.$http.patch(
        this.buildTargetStockOut([id]),
        payload,
        this.buildConfigStockOut({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockOut = data
    },
    async deleteStockOut (id) {
      await this.$http.delete(
        this.buildTargetStockOut([id]),
        this.buildConfigStockOut({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockOut = null
    },
    async calculateStockOut (id) {
      const { data } = await this.$http.post(
        this.buildTargetStockOut([id, 'calculate']),
        null,
        this.buildConfigStockOut({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockOut = data
    },
    async exportCSVStockOut () {
      const { data } = await this.$http.get(
        this.buildTargetStockOut(['export_csv']),
        this.buildConfigStockOut({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/csv'
        }, true)
      )
      return data
    },
    async exportPDFStockOut () {
      const { data } = await this.$http.get(
        this.buildTargetStockOut(['export_pdf']),
        this.buildConfigStockOut({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/pdf'
        }, true)
      )
      return data
    },
    async printPDFStockOut (id) {
      const { data } = await this.$http.get(
        this.buildTargetStockOut([id, 'print_pdf']),
        this.buildConfigStockOut({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/pdf'
        }, true)
      )
      return data
    },
    setQueryPageStockOut (page) {
      this.queryStockOut.page = page
    },
    setQuerySearchStockOut (search) {
      this.queryStockOut.search = search
      this.queryStockOut.page = 1
    },
    setQueryDateRangeStockOut (startDate, endDate) {
      this.queryStockOut.start_date = startDate
      this.queryStockOut.end_date = endDate
      this.queryStockOut.page = 1
    },
    resetStockOut () {
      this.stockOut = {}
      this.totalStockOut = 0
      this.queryStockOut.page = 1
      this.queryStockOut.search = null
      this.queryStockOut.start_date = null
      this.queryStockOut.end_date = null
      this.allStockOut()
    }
  }
}

export default {
  data () {
    return {
      stockIn: null,
      stockIns: [],
      totalStockIn: 0,
      queryStockIn: {
        page: 1,
        search: null,
        is_init: false,
        start_date: null,
        end_date: null
      }
    }
  },
  methods: {
    buildTargetStockIn (args) {
      if (args) {
        let target = args.join('/')
        return `${process.env.BASE_URL}/stock-in/${target}/`
      }
      return `${process.env.BASE_URL}/stock-in/`
    },
    buildHeaderStockIn (headers) {
      const contentType = {
        'Content-Type': 'application/json'
      }
      if (headers) {
        return {...headers, ...contentType}
      }

      return contentType
    },
    buildConfigStockIn (headers, useParams) {
      return {
        params: useParams ? this.queryStockIn : null,
        headers: this.buildHeaderStockIn(headers)
      }
    },
    async allStockIn () {
      const { data } = await this.$http.get(
        this.buildTargetStockIn(),
        this.buildConfigStockIn({
          'Authorization': localStorage.getItem('token')
        }, true)
      )
      this.stockIns = data.results
      this.totalStockIn = data.count
    },
    async createStockIn (payload) {
      const { data } = await this.$http.post(
        this.buildTargetStockIn(),
        payload,
        this.buildConfigStockIn({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockIn = data
    },
    async getStockIn (id) {
      if (!id) {
        this.stockIn = id
        return
      }
      const { data } = await this.$http.get(
        this.buildTargetStockIn([id]),
        this.buildConfigStockIn({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockIn = data
    },
    async editStockIn (id, field, value) {
      const payload = {
        [field]: value,
        is_init: false
      }

      const { data } = await this.$http.patch(
        this.buildTargetStockIn([id]),
        payload,
        this.buildConfigStockIn({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockIn = data
    },
    async deleteStockIn (id) {
      await this.$http.delete(
        this.buildTargetStockIn([id]),
        this.buildConfigStockIn({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockIn = null
    },
    async calculateStockIn (id) {
      const { data } = await this.$http.post(
        this.buildTargetStockIn([id, 'calculate']),
        null,
        this.buildConfigStockIn({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockIn = data
    },
    async exportCSVStockIn () {
      const { data } = await this.$http.get(
        this.buildTargetStockIn(['export_csv']),
        this.buildConfigStockIn({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/csv'
        }, true)
      )
      return data
    },
    async exportPDFStockIn () {
      const { data } = await this.$http.get(
        this.buildTargetStockIn(['export_pdf']),
        this.buildConfigStockIn({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/pdf'
        }, true)
      )
      return data
    },
    async printPDFStockIn (id) {
      const { data } = await this.$http.get(
        this.buildTargetStockIn([id, 'print_pdf']),
        this.buildConfigStockIn({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/pdf'
        }, true)
      )
      return data
    },
    setQueryPageStockIn (page) {
      this.queryStockIn.page = page
    },
    setQuerySearchStockIn (search) {
      this.queryStockIn.search = search
      this.queryStockIn.page = 1
    },
    setQueryDateRangeStockIn (startDate, endDate) {
      this.queryStockIn.start_date = startDate
      this.queryStockIn.end_date = endDate
      this.queryStockIn.page = 1
    },
    resetStockIn () {
      this.stockIn = {}
      this.totalStockIn = 0
      this.queryStockIn.page = 1
      this.queryStockIn.search = null
      this.queryStockIn.start_date = null
      this.queryStockIn.end_date = null
      this.allStockIn()
    }
  }
}

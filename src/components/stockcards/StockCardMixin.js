export default {
  data () {
    return {
      stockCard: null,
      stockCards: [],
      totalStockCard: 0,
      queryStockCard: {
        page: 1,
        search: null,
        is_init: false,
        start_date: null,
        end_date: null
      }
    }
  },
  methods: {
    buildTargetStockCard (args) {
      if (args) {
        let target = args.join('/')
        return `${process.env.BASE_URL}/stock-cards/${target}/`
      }
      return `${process.env.BASE_URL}/stock-cards/`
    },
    buildHeaderStockCard (headers) {
      const contentType = {
        'Content-Type': 'application/json'
      }
      if (headers) {
        return {...headers, ...contentType}
      }

      return contentType
    },
    buildConfigStockCard (headers, useParams) {
      return {
        params: useParams ? this.queryStockCard : null,
        headers: this.buildHeaderStockCard(headers)
      }
    },
    async allStockCard () {
      const { data } = await this.$http.get(
        this.buildTargetStockCard(),
        this.buildConfigStockCard({
          'Authorization': localStorage.getItem('token')
        }, true)
      )
      this.stockCards = data.results
      this.totalStockCard = data.count
    },
    async createStockCard (payload) {
      const { data } = await this.$http.post(
        this.buildTargetStockCard(),
        payload,
        this.buildConfigStockCard({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockCard = data
    },
    async getStockCard (id) {
      if (!id) {
        this.stockCard = id
        return
      }
      const { data } = await this.$http.get(
        this.buildTargetStockCard([id]),
        this.buildConfigStockCard({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockCard = data
    },
    async editStockCard (id, field, value) {
      const payload = {
        [field]: value,
        is_init: false
      }

      const { data } = await this.$http.patch(
        this.buildTargetStockCard([id]),
        payload,
        this.buildConfigStockCard({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockCard = data
    },
    async deleteStockCard (id) {
      await this.$http.delete(
        this.buildTargetStockCard([id]),
        this.buildConfigStockCard({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.stockCard = null
    },
    async exportCSVStockCard () {
      const { data } = await this.$http.get(
        this.buildTargetStockCard(['export_csv']),
        this.buildConfigStockCard({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/csv'
        }, true)
      )
      return data
    },
    async exportPDFStockCard () {
      const { data } = await this.$http.get(
        this.buildTargetStockCard(['export_pdf']),
        this.buildConfigStockCard({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/pdf'
        }, true)
      )
      return data
    },
    setQueryPageStockCard (page) {
      this.queryStockCard.page = page
    },
    setQuerySearchStockCard (search) {
      this.queryStockCard.search = search
      this.queryStockCard.page = 1
    },
    setQueryDateRangeStockCard (startDate, endDate) {
      this.queryStockCard.start_date = startDate
      this.queryStockCard.end_date = endDate
      this.queryStockCard.page = 1
    },
    resetStockCard () {
      this.stockCard = {}
      this.totalStockCard = 0
      this.queryStockCard.page = 1
      this.queryStockCard.search = null
      this.queryStockCard.start_date = null
      this.queryStockCard.end_date = null
      this.allStockCard()
    }
  }
}

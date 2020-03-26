export default {
  data () {
    return {
      supplier: null,
      suppliers: [],
      totalSupplier: 0,
      querySupplier: {
        page: 1,
        search: null,
        is_init: false,
        start_date: null,
        end_date: null
      }
    }
  },
  methods: {
    buildTargetSupplier (args) {
      if (args) {
        let target = args.join('/')
        return `${process.env.BASE_URL}/suppliers/${target}/`
      }
      return `${process.env.BASE_URL}/suppliers/`
    },
    buildHeaderSupplier (headers) {
      const contentType = {
        'Content-Type': 'application/json'
      }
      if (headers) {
        return {...headers, ...contentType}
      }

      return contentType
    },
    buildConfigSupplier (headers, useParams) {
      return {
        params: useParams ? this.querySupplier : null,
        headers: this.buildHeaderSupplier(headers)
      }
    },
    async allSupplier () {
      const { data } = await this.$http.get(
        this.buildTargetSupplier(),
        this.buildConfigSupplier({
          'Authorization': localStorage.getItem('token')
        }, true)
      )
      this.suppliers = data.results
      this.totalSupplier = data.count
    },
    async createSupplier (payload) {
      const { data } = await this.$http.post(
        this.buildTargetSupplier(),
        payload,
        this.buildConfigSupplier({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.supplier = data
    },
    async getSupplier (id) {
      if (!id) {
        this.supplier = id
        return
      }
      const { data } = await this.$http.get(
        this.buildTargetSupplier([id]),
        this.buildConfigSupplier({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.supplier = data
    },
    async editSupplier (id, field, value) {
      const payload = {
        [field]: value,
        is_init: false
      }

      const { data } = await this.$http.patch(
        this.buildTargetSupplier([id]),
        payload,
        this.buildConfigSupplier({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.supplier = data
    },
    async deleteSupplier (id) {
      await this.$http.delete(
        this.buildTargetSupplier([id]),
        this.buildConfigSupplier({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.supplier = null
    },
    async exportCSVSupplier () {
      const { data } = await this.$http.get(
        this.buildTargetSupplier(['export_csv']),
        this.buildConfigSupplier({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/csv'
        }, true)
      )
      return data
    },
    async exportPDFSupplier () {
      const { data } = await this.$http.get(
        this.buildTargetSupplier(['export_pdf']),
        this.buildConfigSupplier({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/pdf'
        }, true)
      )
      return data
    },
    setQueryPageSupplier (page) {
      this.querySupplier.page = page
    },
    setQuerySearchSupplier (search) {
      this.querySupplier.search = search
      this.querySupplier.page = 1
    },
    setQueryDateRangeSupplier (startDate, endDate) {
      this.querySupplier.start_date = startDate
      this.querySupplier.end_date = endDate
      this.querySupplier.page = 1
    },
    resetSupplier () {
      this.supplier = {}
      this.totalSupplier = 0
      this.querySupplier.page = 1
      this.querySupplier.search = null
      this.querySupplier.start_date = null
      this.querySupplier.end_date = null
      this.allSupplier()
    }
  }
}

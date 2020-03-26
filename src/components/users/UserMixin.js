export default {
  data () {
    return {
      user: null,
      users: [],
      totalUser: 0,
      queryUser: {
        page: 1,
        search: null,
        is_init: false,
        start_date: null,
        end_date: null
      }
    }
  },
  methods: {
    buildTargetUser (args) {
      if (args) {
        let target = args.join('/')
        return `${process.env.BASE_URL}/users/${target}/`
      }
      return `${process.env.BASE_URL}/users/`
    },
    buildHeaderUser (headers) {
      const contentType = {
        'Content-Type': 'application/json'
      }
      if (headers) {
        return {...headers, ...contentType}
      }

      return contentType
    },
    buildConfigUser (headers, useParams) {
      return {
        params: useParams ? this.queryUser : null,
        headers: this.buildHeaderUser(headers)
      }
    },
    async allUser () {
      const { data } = await this.$http.get(
        this.buildTargetUser(),
        this.buildConfigUser({
          'Authorization': localStorage.getItem('token')
        }, true)
      )
      this.users = data.results
      this.totalUser = data.count
    },
    async createUser (payload) {
      const { data } = await this.$http.post(
        this.buildTargetUser(),
        payload,
        this.buildConfigUser({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.user = data
    },
    async getUser (id) {
      if (!id) {
        this.user = id
        return
      }
      const { data } = await this.$http.get(
        this.buildTargetUser([id]),
        this.buildConfigUser({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.user = data
    },
    async editUser (id, field, value) {
      const payload = {
        [field]: value
      }

      const { data } = await this.$http.patch(
        this.buildTargetUser([id]),
        payload,
        this.buildConfigUser({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.user = data
    },
    async deleteUser (id) {
      await this.$http.delete(
        this.buildTargetUser([id]),
        this.buildConfigUser({
          'Authorization': localStorage.getItem('token')
        }, false)
      )
      this.user = null
    },
    async signInUser (payload) {
      const { data } = await this.$http.post(
        this.buildTargetUser(['signin']),
        payload,
        this.buildConfigUser()
      )
      localStorage.setItem('token', data.token)
      localStorage.setItem('user_id', data.user_id)
      localStorage.setItem('username', data.username)
      localStorage.setItem('email', data.email)
    },
    async exportCSVUser () {
      const { data } = await this.$http.get(
        this.buildTargetUser(['export_csv']),
        this.buildConfigUser({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/csv'
        }, true)
      )
      return data
    },
    async exportPDFUser () {
      const { data } = await this.$http.get(
        this.buildTargetUser(['export_pdf']),
        this.buildConfigUser({
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/pdf'
        }, true)
      )
      return data
    },
    setQueryPageUser (page) {
      this.queryUser.page = page
    },
    setQuerySearchUser (search) {
      this.queryUser.search = search
      this.queryUser.page = 1
    },
    setQueryDateRangeUser (startDate, endDate) {
      this.queryUser.start_date = startDate
      this.queryUser.end_date = endDate
      this.queryUser.page = 1
    },
    resetUser () {
      this.user = {}
      this.totalUser = 0
      this.queryUser.page = 1
      this.queryUser.search = null
      this.queryUser.start_date = null
      this.queryUser.end_date = null
      this.allUser()
    }
  }
}

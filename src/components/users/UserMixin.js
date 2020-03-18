export default {
  data () {
    return {
      user: {},
      users: [],
      totalUser: 0,
      queryUser: {
        page: 1,
        search: '',
        is_init: false
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
    buildConfigUser (headers) {
      return {
        params: this.queryUser,
        headers: this.buildHeaderUser(headers)
      }
    },
    async allUser () {},
    async createUser (payload) {},
    async getUser (id) {},
    async editUser (id, field, value) {},
    async deleteUser (id) {},
    async signInUser (payload) {
      const { data } = await this.$http.post(
        this.buildTargetUser(['signin']),
        payload,
        this.buildConfigUser()
      )
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      localStorage.setItem('email', data.email)
    },
    setQueryPageUser (page) {},
    setQuerySearchUser (search) {},
    resetUser () {}
  }
}

export default {
  methods: {
    async authLogin (username, password) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const payload = {username, password}
      const { data } = await this.$http.post(`${process.env.BASE_URL}/auth/login/`, payload, config)
      return data
    },
    async authStore (userId, email, token) {
      localStorage.setItem('userId', userId)
      localStorage.setItem('email', email)
      localStorage.setItem('token', `Token ${token}`)
    }
  }
}

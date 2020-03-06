export default {
  methods: {
    async customerAll () {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      console.log(config)
      const url = `${process.env.BASE_URL}/customers/`
      const { data } = await this.$http.get(url, config)
      return data
    },
    async customerNew () {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      console.log(config)
      const url = `${process.env.BASE_URL}/customers/`
      const { data } = await this.$http.post(url, null, config)
      return data
    },
    async customerGet (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/customers/${id}/`
      const { data } = await this.$http.get(url, config)
      return data
    },
    async customerEdit (id, field, value) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const payload = {
        [field]: value
      }
      const url = `${process.env.BASE_URL}/customers/${id}/`
      const { data } = await this.$http.patch(url, payload, config)
      return data
    },
    async customerDelete (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/customers/${id}/`
      const { data } = await this.$http.delete(url, config)
      return data
    },
    async customerPublish (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/customers/${id}/publish/`
      const { data } = await this.$http.post(url, null, config)
      return data
    },
    async customerDraft (id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = `${process.env.BASE_URL}/customers/${id}/draft/`
      const { data } = await this.$http.post(url, null, config)
      return data
    }
  }
}

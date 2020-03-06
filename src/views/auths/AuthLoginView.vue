<template>
  <auth-login @onLogin="onLoginAuth" />
</template>

<script>
import AuthLoginVue from '../../components/auths/AuthLogin'
import AuthMixin from '../../components/auths/AuthMixin'

export default {
  name: 'auth-login-view',
  components: {
    'auth-login': AuthLoginVue
  },
  mixins: [
    AuthMixin
  ],
  methods: {
    async onLoginAuth (payload) {
      try {
        const data = await this.authLogin(payload.username, payload.password)
        this.authStore(data.user_id, data.email, data.token)
        this.$router.push({name: 'dashboard-main-view'})
      } catch (error) {
        this.$bvToast.toast(error.message, {
          title: 'Ups!',
          autoHideDelay: 3000,
          appendToast: false
        })
      }
    }
  }
}
</script>

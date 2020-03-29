<template>
  <div class="container mt-4 mb-4">
    <div class="row mt-4 mb-3 d-flex justify-content-center">
      <div class="col-md-5 mt-4">
        <h1 class="text-center text-primary">Aluna</h1>
        <p class="text-center text-secondary">stock management software</p>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-5">
        <b-card
          header-bg-variant="secondary"
          header-text-variant="light"
          border-variant="secondary"
          header="Login Aplikasi Aluna"
        >
          <user-signin @signIn="onSignInUser" />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import UserMixin from '@/components/users/UserMixin'
import UserSignin from '@/components/users/UserSignin'

import HelperAlert from '@/helpers/HelperAlert'

export default {
  name: 'view-common-user-login',
  components: {
    'user-signin': UserSignin
  },
  mixins: [
    HelperAlert,
    UserMixin
  ],
  methods: {
    async onSignInUser (username, password) {
      try {
        await this.signInUser({username, password})
        this.$router.push({name: 'view-common-user'})
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    }
  }
}
</script>

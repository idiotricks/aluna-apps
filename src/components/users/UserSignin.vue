<template>
  <div>
    <div class="form-group">
      <label>Username</label>
      <input placeholder="Input your username" type="text" class="form-control" v-model="username" />
    </div>
    <div class="form-group">
      <label>Password</label>
      <input placeholder="Input your password" type="password" class="form-control" v-model="password" />
    </div>
    <b-button @click="signIn" block variant="primary">Login</b-button>
    <!-- <b-button @click="signIn" block variant="outline-primary">Buat Akun</b-button> -->
  </div>
</template>

<script>
export default {
  name: 'user-signin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      this.$emit('signIn', this.username, this.password)
    }
  }
}
</script>

<style>

</style>

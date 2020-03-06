<template>
  <div>
    <div class="form-group">
      <label>Username</label>
      <input type="text" class="form-control" v-model="username" />
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" v-model="password" />
    </div>
    <button @click="onLogin" class="btn btn-primary">Login</button>
  </div>
</template>

<script>
export default {
  name: 'auth-login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onLogin () {
      this.$emit('onLogin', {username: this.username, password: this.password})
    }
  }
}
</script>

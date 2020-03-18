<template>
  <div>
    <FlashMessage></FlashMessage>
    <b-navbar toggleabble="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">
        <b-spinner
          :variant="variant"
          style="position: absolute; left: 50px; bottom: 18px"
          v-if="show"
          type="grow"
        >
        </b-spinner> Aluna
        <small
          class="text-light"
          v-if="app"
        >
          / {{ ` ${app}` }}
        </small>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav class="container-fluid">
        <b-navbar-nav>
          <b-nav-item-dropdown text="Master">
            <b-dropdown-item to="customers">Customer</b-dropdown-item>
            <b-dropdown-item to="suppliers">Supplier</b-dropdown-item>
            <b-dropdown-item to="products">Product</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav class="ml-auto">
        <slot></slot>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'ui-common-header',
  props: ['app'],
  data () {
    return {
      show: false,
      variant: 'light'
    }
  },
  methods: {
    stopShow () {
      return new Promise((resolve, reject) => {
        setTimeout(() => { this.show = false }, 1000)
      })
    }
  },
  created () {
    this.flashMessage.setStrategy('single')
    this.$http.interceptors.request.use((config) => {
      // trigger 'loading=true' event here
      this.variant = 'light'
      this.show = true
      return config
    }, (error) => {
      // trigger 'loading=false' event here
      this.variant = 'danger'
      // this.stopShow()
      return Promise.reject(error)
    })

    this.$http.interceptors.response.use((response) => {
      // trigger 'loading=false' event here
      this.stopShow()
      return response
    }, (error) => {
      // trigger 'loading=false' event here
      this.variant = 'danger'
      this.stopShow()
      this.flashMessage.show({
        status: 'warning',
        title: 'Ups!',
        time: 1000,
        message: 'something when wrong'
      })
      return Promise.reject(error)
    })
  }
}
</script>

<style>

</style>

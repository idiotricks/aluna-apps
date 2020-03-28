<template>
    <b-navbar style="z-index: 9999" toggleabble="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">
        <strong>Aluna</strong>
        <small
          class="text-light"
          v-if="app"
        >
          / {{ show ? `${app} loading....`: app }}
        </small>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav class="container-fluid">
        <b-navbar-nav>
          <b-nav-item-dropdown text="Master">
            <b-dropdown-item to="customers">Pelanggan</b-dropdown-item>
            <b-dropdown-item to="suppliers">Pemasok</b-dropdown-item>
            <b-dropdown-item to="products">Produk</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Transaksi">
            <b-dropdown-item to="stock-ins">Transaksi Produk Masuk</b-dropdown-item>
            <b-dropdown-item to="stock-outs">Transaksi Produk Keluar</b-dropdown-item>
            <b-dropdown-item to="stock-cards">Kartu Stok Produk</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Pengaturan">
            <b-dropdown-item to="user">Pengguna</b-dropdown-item>
            <b-dropdown-item @click="onLogout">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav class="ml-auto">
        <slot></slot>
      </b-navbar-nav>
    </b-navbar>
</template>

<script>
import HelperAlert from '@/helpers/HelperAlert'

export default {
  name: 'ui-common-header',
  props: ['app'],
  data () {
    return {
      show: false,
      variant: 'dark'
    }
  },
  mixins: [
    HelperAlert
  ],
  methods: {
    stopShow () {
      return new Promise((resolve, reject) => {
        setTimeout(() => { this.show = false }, 1000)
      })
    },
    async onLogout () {
      const confirm = await this.logoutConfirm()
      if (confirm) {
        localStorage.clear()
        this.$router.push({name: 'view-common-user-signin'})
      }
    }
  },
  created () {
    this.$http.interceptors.request.use((config) => {
      // trigger 'loading=true' event here
      this.show = true
      return config
    }, (error) => {
      // trigger 'loading=false' event here
      this.show = false
      // this.stopShow()
      return Promise.reject(error)
    })

    this.$http.interceptors.response.use((response) => {
      // trigger 'loading=false' event here
      this.show = false
      this.stopShow()
      return response
    }, (error) => {
      // trigger 'loading=false' event here
      this.show = false
      return Promise.reject(error)
    })
  }
}
</script>

<style>

</style>

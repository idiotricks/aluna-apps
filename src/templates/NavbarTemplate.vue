<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">Aluna <small class="text-light" v-if="app"> / {{ ` ${app} ` }}</small></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="container-fluid">
        <b-navbar-nav>
          <b-nav-item-dropdown text="Master">
            <b-dropdown-item to="customers">Customer</b-dropdown-item>
            <b-dropdown-item to="suppliers">Supplier</b-dropdown-item>
            <b-dropdown-item to="products">Product</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Stock">
            <b-dropdown-item to="stockins">Stock In</b-dropdown-item>
            <b-dropdown-item href="#">Stock Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Reporting">
            <b-dropdown-item href="#">Report Stock</b-dropdown-item>
            <b-dropdown-item href="#">Report Stock In</b-dropdown-item>
            <b-dropdown-item href="#">Report Stock Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Settings">
            <b-dropdown-item href="#">User</b-dropdown-item>
            <b-dropdown-item href="#">Log Out</b-dropdown-item>
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
  name: 'navbar-template',
  props: ['app']
}
</script>

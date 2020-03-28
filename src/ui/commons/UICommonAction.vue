<template>
  <b-navbar
    :sticky="true"
    class="mb-4 d-flex justify-content-center"
    variant="dark"
    type="dark"
  >
    <b-navbar-nav right>
      <b-nav-item href="#">
        <slot></slot>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'ui-common-action'
}
</script>

<style>

</style>

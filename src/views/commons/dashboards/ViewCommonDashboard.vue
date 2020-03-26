<template>
  <div>
    <ui-common-header></ui-common-header>
    <b-container class="mt-4" :fluid="true">
      <b-row>
        <b-col>
          <h3 class="text-secondary">Selamat Datang, {{ username }}</h3>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="mt-4" :fluid="true">
      <b-row>
        <b-col>
        </b-col>
        <b-col>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UICommonHeader from '@/ui/commons/UICommonHeader'

export default {
  name: 'view-common-dashboard',
  components: {
    'ui-common-header': UICommonHeader
  },
  computed: {
    username () {
      return localStorage.getItem('username')
    }
  }
}
</script>

<style>

</style>

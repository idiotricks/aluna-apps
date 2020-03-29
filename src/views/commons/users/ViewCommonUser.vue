<template>
  <div>
    <ui-common-header app="User Manager" />
    <b-container class="mb-4" :fluid="true">
      <b-row v-if="user" class="d-flex justify-content-center mt-4">
        <b-col cols="4">
          <b-card
            header-bg-variant="secondary"
            header-text-variant="light"
            border-variant="secondary"
            header="Ubah Data Pengguna"
          >
            <user-edit :obj="user" @edit="onEditUser" />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UICommonHeader from '@/ui/commons/UICommonHeader'

import HelperAlert from '@/helpers/HelperAlert'

import UserMixin from '@/components/users/UserMixin'
import UserEdit from '@/components/users/UserEdit'

export default {
  name: 'view-common-user',
  components: {
    'ui-common-header': UICommonHeader,
    'user-edit': UserEdit
  },
  mixins: [
    HelperAlert,
    UserMixin
  ],
  methods: {
    async onGetUser () {
      try {
        const id = await localStorage.getItem('user_id')
        await this.getUser(id)
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    },
    async onEditUser (id, field, value) {
      try {
        await this.editUser(id, field, value)
        await this.getUser(localStorage.getItem('user_id'))
      } catch (error) {
        console.log(error)
        this.errorHandler(error)
      }
    }
  },
  async mounted () {
    await this.onGetUser()
  }
}
</script>

<style>

</style>

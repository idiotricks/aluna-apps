export default {
  methods: {
    async deleteConfirm (data) {
      return this.$bvModal.msgBoxConfirm(
        `Are you sure you want to discard ${data} ?`,
        {
          title: 'Discard Confirmation',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          centered: true
        }
      )
    },
    async deleteSuccess () {
      return this.$bvModal.msgBoxOk('Data successfully removed', {
        title: 'Success',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      })
    },
    async discardConfirm () {
      return this.$bvModal.msgBoxConfirm(
        `Are you sure you want to discard, your data might be lost or not saved ?`,
        {
          title: 'Discard Confirmation',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          centered: true
        }
      )
    },
    async reportSuccess () {
      return this.$bvModal.msgBoxOk('Report successfully created', {
        title: 'Success',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      })
    },
    async logoutConfirm () {
      return this.$bvModal.msgBoxConfirm(
        `Are you sure you want to exit the application ?`,
        {
          title: 'Log Out Confirmation',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          centered: true
        }
      )
    }
  }
}

export default {
  methods: {
    async deleteConfirm (data) {
      return this.$bvModal.msgBoxConfirm(
        `Anda yakin ingin membuang ${data} ?`,
        {
          title: 'Konfirmasi Buang',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          centered: true
        }
      )
    },
    async deleteSuccess () {
      return this.$bvModal.msgBoxOk('Berhasil membuang', {
        title: 'Berhasil',
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
    },
    async messageError (message) {
      return this.$bvModal.msgBoxConfirm(message,
        {
          title: 'Ups!',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          centered: true
        }
      )
    },
    async messageWarning (message) {
      return this.$bvModal.msgBoxConfirm(message,
        {
          title: 'Peringatan!',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'warning',
          centered: true
        }
      )
    },
    async messageSuccess (message) {
      return this.$bvModal.msgBoxConfirm(message,
        {
          title: 'Berhasil!',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'warning',
          centered: true
        }
      )
    },
    async errorHandler (error) {
      const response = error.response

      if (response) {
        if (response.status !== 500) {
          this.messageError(
            error.response.data.fallback_message
          )
        } else {
          console.dir(error.message)
          this.messageError(error.message)
        }
      } else {
        this.messageError(error.message || 'Something when wrong!')
      }
    }
  }
}

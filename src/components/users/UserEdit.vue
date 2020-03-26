<template>
  <div>
    <div v-if="lodat">
      <div class="form-group">
        <label>Nama Pengguna</label>
        <input
          class="form-control"
          type="text"
          disabled
          :value="lodat.username"
        />
      </div>
      <div class="form-group">
        <label>Nama Depan</label>
        <b-form-input
          v-model="lodat.first_name"
          type="text"
          @change="edit(lodat.id, 'first_name', lodat.first_name)"
        />
      </div>
      <div class="form-group">
        <label>Nama Belakang</label>
        <b-form-input
          v-model="lodat.last_name"
          type="text"
          @change="edit(lodat.id, 'last_name', lodat.last_name)"
        />
      </div>
      <div class="form-group">
        <label>Email</label>
        <b-form-input
          v-model="lodat.email"
          type="email"
          @change="edit(lodat.id, 'email', lodat.email)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-edit',
  props: ['obj'],
  data () {
    return {
      lodat: this.obj
    }
  },
  methods: {
    edit (id, field, value) {
      this.$emit('edit', id, field, value)
    }
  },
  watch: {
    obj: {
      handler (n, o) {
        this.lodat = JSON.parse(JSON.stringify(n))
      },
      deep: true
    }
  }
}
</script>

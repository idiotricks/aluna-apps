export default {
  data () {
    return {
      supplier: {},
      suppliers: [],
      totalSupplier: 0,
      querySupplier: {
        page: 1,
        search: '',
        is_init: false
      }
    }
  },
  methods: {
    async allSupplier () {},
    async createSupplier (payload) {},
    async getSupplier (id) {},
    async editSupplier (id, field, value) {},
    async deleteSupplier (id) {},
    setQueryPageSupplier (page) {},
    setQuerySearchSupplier (search) {},
    resetSupplier () {}
  }
}

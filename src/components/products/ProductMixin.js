export default {
  data () {
    return {
      product: {},
      products: [],
      totalProduct: 0,
      queryProduct: {
        page: 1,
        search: '',
        is_init: false
      }
    }
  },
  methods: {
    async allProduct () {},
    async createProduct (payload) {},
    async getProduct (id) {},
    async editProduct (id, field, value) {},
    async deleteProduct (id) {},
    setQueryPageProduct (page) {},
    setQuerySearchProduct (search) {},
    resetProduct () {}
  }
}

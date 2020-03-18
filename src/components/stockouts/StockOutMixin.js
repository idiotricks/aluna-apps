export default {
  data () {
    return {
      stockOut: {},
      stockOuts: [],
      totalStockOut: 0,
      queryStockOut: {
        page: 1,
        search: '',
        is_init: false
      }
    }
  },
  methods: {
    async allStockOut () {},
    async createStockOut (payload) {},
    async getStockOut (id) {},
    async editStockOut (id, field, value) {},
    async deleteStockOut (id) {},
    setQueryPageStockOut (page) {},
    setQuerySearchStockOut (search) {},
    resetStockOut () {}
  }
}

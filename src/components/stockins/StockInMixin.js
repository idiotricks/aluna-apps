export default {
  data () {
    return {
      stockIn: {},
      stockIns: [],
      totalStockIn: 0,
      queryStockIn: {
        page: 1,
        search: '',
        is_init: false
      }
    }
  },
  methods: {
    async allStockIn () {},
    async createStockIn (payload) {},
    async getStockIn (id) {},
    async editStockIn (id, field, value) {},
    async deleteStockIn (id) {},
    setQueryPageStockIn (page) {},
    setQuerySearchStockIn (search) {},
    resetStockIn () {}
  }
}

export default {
  data () {
    return {
      itemOut: {},
      itemOuts: [],
      totalItemOut: 0,
      queryItemOut: {
        page: 1,
        search: '',
        is_init: false
      }
    }
  },
  methods: {
    async allItemOut () {},
    async createItemOut (payload) {},
    async getItemOut (id) {},
    async editItemOut (id, field, value) {},
    async deleteItemOut (id) {},
    setQueryPageItemOut (page) {},
    setQuerySearchItemOut (search) {},
    resetItemOut () {}
  }
}

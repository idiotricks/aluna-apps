export default {
  data () {
    return {
      itemIn: {},
      itemIns: [],
      totalItemIn: 0,
      queryItemIn: {
        page: 1,
        search: '',
        is_init: false
      }
    }
  },
  methods: {
    async allItemIn () {},
    async createItemIn (payload) {},
    async getItemIn (id) {},
    async editItemIn (id, field, value) {},
    async deleteItemIn (id) {},
    setQueryPageItemIn (page) {},
    setQuerySearchItemIn (search) {},
    resetItemIn () {}
  }
}

export default {
  data () {
    return {
      store: null,
      stores: [],
      totalStore: 0,
      queryStore: {
        page: 1,
        search: null,
        is_init: false
      }
    }
  },
  methods: {
    async allStore () {},
    async createStore (payload) {},
    async getStore (id) {},
    async editStore (id, field, value) {},
    async deleteStore (id) {},
    setQueryPageStore (page) {},
    setQuerySearchStore (search) {},
    resetStore () {}
  }
}

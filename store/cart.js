export const state = () => ({
  total: {count: 0, sum: 0},
  items: []
});

export const mutations = {

  setTotal(state, payload) {
    state.total = payload;
  },
  setItems(state, payload) {
    state.items = payload;
  },
};

export const actions = {

  async getTotal({commit}) {
    const {result} = await this.$axios.$get('/api2/Basket/getTotal');
    commit('setTotal', result);
  },
  async getItems({commit}) {

    const {result} = await this.$axios.$get('/api2/Basket/getBasketProducts');
    commit('setItems', result[0]);
  },

};

export const getters = {
  total: s => s.total,
  items: s => s.items,
};

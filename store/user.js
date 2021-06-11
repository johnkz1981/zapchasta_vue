export const state = () => ({
  info: {},
  isAuth: false,
});

export const mutations = {

  setIsAuth(state, payload) {
    state.isAuth = payload;
  },
  setInfo(state, payload) {
    state.info = payload;
  },
};

export const actions = {

  async getIsAuth({commit}) {
    const {result} = await this.$axios.$get('/api2/Auth/isAuth');
    commit('setIsAuth', result);
  },
  async getInfo({commit}) {
    const {result} = await this.$axios.$get('/api2/Auth/info');
    commit('setInfo', result);
  },
};

export const getters = {
  info: s => s.info,
  isAuth: s => s.isAuth,
};
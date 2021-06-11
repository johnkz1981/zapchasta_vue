export const state = () => ({
  dataDetail: {},
  dataArticle: {},
  isBusy: false
});

export const mutations = {

  setDataDetail(state, payload) {
    state.dataDetail = Object.assign({}, payload);
  },
  setDataArticle(state, payload) {
    state.dataArticle = Object.assign({}, payload);
  },
  setBusy(state, payload) {
    state.isBusy = payload;
  },
};

export const actions = {

  async getDataDetail({commit}, payload){

    this.commit('error/set', '');
    commit('setBusy', true);
    const {q, brand} = payload;
    // const data = await fetch(`https://ugautodetal.ru/api2/mock/zapchasta`).then(res => res.json());
    let result = {parts: []};

    try {
      result = await this.$axios.$get(`/auto/api/?q=${q}&brand_title=${brand}`);
    } catch (e) {

      this.commit('error/set', e.message)
    }

    commit('setDataDetail', result.parts);
    commit('setBusy', false);
  },
  async getDataArticle({commit}, payload){

    this.commit('error/set', '');
    commit('setBusy', true);
    const {q} = payload;
    let result = {catalogs: []};
    // const data = await fetch(`https://ugautodetal.ru/api2/mock/zapchasta`).then(res => res.json());

    try {
      result = await this.$axios.$get(`/auto/api/?q=${q}`);
    } catch (e) {

      this.commit('error/set', e.message)
    }


    console.log(result);
    commit('setDataArticle', result.catalogs);
    commit('setBusy', false);
  },
};

export const getters = {
  dataDetail: s => s.dataDetail,
  dataArticle: s => s.dataArticle,
  isBusy: s => s.isBusy,
};

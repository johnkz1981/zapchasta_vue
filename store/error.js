export const state = () => ({
  mess: ''
});

export const mutations = {

  set(state, payload) {
    state.mess = payload;
  },
};

export const getters = {
  mess: s => s.mess,
};

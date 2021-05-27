export const state = () => ({
  all: [],
});

export const getters = {
  getAll(aState) {
    return aState.all;
  },
};

export const actions = {
  setArticles({ commit }, articles) {
    commit('setAll', articles);
  },
};

export const mutations = {
  setAll(aState, articles) {
    aState.all = articles;
  },
};

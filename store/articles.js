export const state = () => ({
  all: [],
});

const noArticleFound = (article) => article.length === 0;

export const getters = {
  getAll(aState) {
    return aState.all;
  },
  getArticle(aState, id) {
    const article = aState.all.filter((elem) => elem.id === id);
    if (noArticleFound(article)) {
      return undefined;
    }
    return article[0];
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

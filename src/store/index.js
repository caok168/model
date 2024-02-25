import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapse: false,
    isCommit: null,
  },
  mutations: {
    changeCollapse(state, data) {
      if (data) state.collapse = false;
      else state.collapse = !state.collapse;
    },
    changeIsCommit(state, data) {
      state.isCommit = data;
    },
  },
  actions: {
    actionChange({ commit }) {
      commit('changeCollapse');
    },
    actionChangeIsCommit({ commit }, data) {
      commit('changeIsCommit', data);
    },
    actionReset({ commit }) {
      commit('changeIsCommit', null);
      commit('changeCollapse', 'false');
    },
  },
  modules: {
  },
});

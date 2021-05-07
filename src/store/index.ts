import Vue from 'vue';
import Vuex from 'vuex';
import Chain from './modules/chain'
// import Ws from './modules/ws'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    Chain,
    // Ws
  },
});

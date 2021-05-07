import {
    KLINE_SET,
    KLINE_COMMIT,
    KLINE_GET
} from './types'

import { ActionTree, GetterTree, MutationTree } from 'vuex';


const state = {
    klineData: null
};

const getters: GetterTree<any, any> = {
    [KLINE_GET](state) {
        return state.klineData;
    }
};

const actions: ActionTree<any, any>  = {
    [KLINE_SET]({state, commit },data) {
        commit(KLINE_COMMIT, data);
    }
};

const mutations: MutationTree<any> = {
    [KLINE_COMMIT](state, data) {

        state.klineData = data

        console.log('state.klineData', state.klineData)
    },
};

export default {state, actions, mutations, getters}

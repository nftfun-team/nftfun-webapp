import {
    A_channel_price_list,
    M_channel_price_list,
    G_channel_price_list,

    A_method_list,
    M_method_list,
    G_method_list,

    A_quotation_method_list,
    M_quotation_method_list,
    G_quotation_method_list
} from './types'

import { ActionTree, GetterTree, MutationTree } from 'vuex';
import serviceApi from 'utils/serviceApi'
import store from "@/store";

const state = {
    channelPriceList: [],
    methodList: [],
    quotationMethodList: []
};
let price_list_time:any;
const getters: GetterTree<any, any> = {
    [G_channel_price_list](state) {
        return state.channelPriceList;
    },
    [G_method_list](state) {
        if(state.channelPriceList.length === 0){
            store.dispatch(A_method_list);
            return
        }

        return state.methodList;
    },
    [G_quotation_method_list](state) {
        if(state.channelPriceList.length === 0) {
            store.dispatch(A_quotation_method_list);
            return
        }
        return state.quotationMethodList;
    }
};

const actions: ActionTree<any, any>  = {
    [A_channel_price_list]({state, commit }) {
        serviceApi.channel_price_type().then( (response: any) => {
            commit(M_channel_price_list, response);
        }).catch((error: any) => {})
    },
    [A_method_list]({state, commit }, data) {
        serviceApi.settlement_method_type().then( (response: any) => {
            commit(M_method_list, response);
        }).catch((error: any) => {})
    },
    [A_quotation_method_list]({state, commit}, data) {
        serviceApi.quotation_method_type().then( (response: any) => {
            commit(M_quotation_method_list, response);
        }).catch((error: any) => {})
    }
};

const mutations: MutationTree<any> = {
    [M_channel_price_list](state, data) {
        state.channelPriceList = data
    },
    [M_method_list](state, data) {
        state.methodList = data;
    },
    [M_quotation_method_list](state, data) {
        state.quotationMethodList = data;
    }
};

export default {state, actions, mutations, getters}

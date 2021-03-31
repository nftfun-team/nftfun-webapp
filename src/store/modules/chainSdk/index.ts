import {
    A_GET_WALLETADDRESS,

    M_GET_WALLETADDRESS,

    G_GET_WALLETADDRESS,
} from './types'

import { ActionTree, GetterTree, MutationTree } from 'vuex';
import serviceApi from 'utils/serviceApi'

const state = {
    walletAddress: '',
};

const getters: GetterTree<any, any> = {
    [G_GET_WALLETADDRESS](state) {
        return state.walletAddress;
    },
};

const actions: ActionTree<any, any>  = {
    // [A_GET_MENU]({state, commit }) {
    //     return new Promise((resolve, reject) => {
    //         serviceApi.menuList().then( (response: any) => {
    //             const menuData = response.result.menu;
    //             const authData = response.result.auth;
    //             const allAuthData = response.result.allAuth;
    //             if (menuData && menuData.length > 0) {
    //                 commit(M_GET_MENU, menuData)
    //             } else {
    //                 reject('getPermissionList: permissions must be a non-null array !')
    //             }
    //             resolve(response)
    //         }).catch((error: any) => {
    //             reject(error)
    //         })
    //     })
    // },
    [A_GET_WALLETADDRESS]({state, commit }, data) {
        return new Promise((resolve, reject) => {
            commit(M_GET_WALLETADDRESS, data);
            resolve()
        })
    },
};

const mutations: MutationTree<any> = {
    [M_GET_WALLETADDRESS](state, data) {
        state.walletAddress = data
    },
};

export default {state, actions, mutations, getters}

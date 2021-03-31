import {
    A_GET_MENU,
    A_SET_MENU,
    A_SET_HISTORY,
    A_DELETE_HISTORY,

    M_GET_MENU,
    M_SET_MENU,
    M_SET_HISTORY,
    M_DELETE_HISTORY,

    G_GET_LIST,
    G_MENU_LIST,
    G_GET_HISTORY
} from './types'

import { History } from 'interface/menu'
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import serviceApi from 'utils/serviceApi'

const state = {
    menuList: [],
    routersList: [],
    historyList: [
        {title: "首页", path: '/home'}
    ]
};

const getters: GetterTree<any, any> = {
    [G_GET_LIST](state) {
        return state.menuList;
    },
    [G_MENU_LIST](state) {
        return state.routersList;
    },
    [G_GET_HISTORY](state) {
        return state.historyList;
    }

};

const actions: ActionTree<any, any>  = {
    [A_GET_MENU]({state, commit }) {
        return new Promise((resolve, reject) => {
            serviceApi.menuList().then( (response: any) => {
                const menuData = response.result.menu;
                const authData = response.result.auth;
                const allAuthData = response.result.allAuth;
                if (menuData && menuData.length > 0) {
                    commit(M_GET_MENU, menuData)
                } else {
                    reject('getPermissionList: permissions must be a non-null array !')
                }
                resolve(response)
            }).catch((error: any) => {
                reject(error)
            })
        })
    },
    [A_SET_MENU]({state, commit }, data) {
        return new Promise((resolve, reject) => {
            commit(M_SET_MENU, data);
            resolve()
        })
    },
    [A_SET_HISTORY]({state, commit}, data) {
        return new Promise((resolve, reject) => {
            let _data:Array<History> = [];

            if(data.type === "add") {
                const res = new Map();
                _data = [...state.historyList, data.data].filter((ele: History) =>{ return !res.has(ele.path) && res.set(ele.path, 1)});
            }
            else _data = state.historyList.filter((ele: History) => { return ele.path !== data.data.path });
            commit(M_SET_HISTORY, _data);
            resolve(_data)
        })
    }
};

const mutations: MutationTree<any> = {
    [M_GET_MENU](state, data) {
        state.menuList = data
    },
    [M_SET_MENU](state, data) {
        state.routersList = data;
    },
    [M_SET_HISTORY](state, data) {
        state.historyList = data;
    }
};

export default {state, actions, mutations, getters}
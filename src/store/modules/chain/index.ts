import {
    A_CHAIN_COONNECT,

    M_CHAIN_WALLETADDRESS,
    M_CHAIN_CHAINID,
    M_CHAIN_CONNECTED,
    M_HASH_CACHE,
    M_HASH_CLEANCACHE,
    M_HASH_ADDCACHE,

    G_CHAIN_WALLETADDRESS,
    G_CHAIN_CONNECTED,
    G_CHAIN_CHAINID,
    G_HASH_CACHE
} from './types'

import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { Storage } from 'utils/storage'
import ChainApi from '@/assets/sdk/ChainApi.js'
import User from 'utils/user'

const state = {
    walletAddress: Storage.getItem('walletAddress') || '',
    chainId: Storage.getItem('chainId') || '',
    connected: Storage.getItem('connected') || true,
    actionCache: Storage.getObject('RecordList'),
};

const getters: GetterTree<any, any> = {
    [G_CHAIN_WALLETADDRESS](state) {
        return state.walletAddress;
    },
    [G_CHAIN_CHAINID](state) {
        return state.chainId;
    },
    [G_CHAIN_CONNECTED](state) {
        return (state.connected == 'true' || state.connected == true) ? true : false;
    },
    [G_HASH_CACHE](state) {
        return Object.values(state.actionCache).sort((a:any, b:any) => {
            return b.timestamp - a.timestamp;
        })
    },
};

const actions: ActionTree<any, any>  = {
    [A_CHAIN_COONNECT]({state, commit },data) {
        return ChainApi.connect(data).then(acc => {
            let is = acc && acc.length > 0;
            let account = is ? acc[0] : '';
            let isConnect = ChainApi.isConnected();
            // commit(M_CHAIN_WALLETADDRESS, account);
            // commit(M_CHAIN_CONNECTED, isConnect);
            User.login(account, isConnect)
            return isConnect;
        });
    }
};

const mutations: MutationTree<any> = {
    [M_CHAIN_WALLETADDRESS](state, data) {
        Storage.setItem('walletAddress', data)
        state.walletAddress = data
    },
    [M_CHAIN_CONNECTED](state, data) {
        Storage.setItem('connected', data)
        state.connected = data;
    },
    [M_CHAIN_CHAINID](state, data) {
        Storage.setItem('chainId', data)
        state.chainId = data;
    },
    [M_HASH_CACHE](state, data) {
        Storage.setItem('RecordList', data)
        state.actionCache = data;
    },
    [M_HASH_CLEANCACHE](state) {
        Storage.setObject('RecordList', {})
        state.actionCache = {};
    },
    [M_HASH_ADDCACHE](state, data) {
        Object.keys(state.actionCache).forEach(d => {
            if (state.actionCache[d].result === data.result) {
                delete state.actionCache[d];
            }
        });
        state.actionCache = {
            ...state.actionCache,
            [data.key]: data
        };
        Storage.setObject('RecordList', state.actionCache);
    },
};

export default {state, actions, mutations, getters}

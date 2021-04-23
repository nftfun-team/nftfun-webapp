import store from '../store'
import {M_CHAIN_CONNECTED, M_CHAIN_WALLETADDRESS, M_CHAIN_CHAINID} from 'store/modules/chain/types'

const User = {
    login: (walletAddress, isConnect, ) => {
        store.commit(M_CHAIN_WALLETADDRESS, walletAddress)
        store.commit(M_CHAIN_CONNECTED, isConnect)
    },
    logout: () =>{
        store.commit(M_CHAIN_WALLETADDRESS, '')
        store.commit(M_CHAIN_CHAINID, '')
        store.commit(M_CHAIN_CONNECTED, false)
    }
};

export default User

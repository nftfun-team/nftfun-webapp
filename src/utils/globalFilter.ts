import Vue from 'vue'
import ChinaApi from "@/assets/sdk/ChainApi"

const filters:any = {
    convert: (val:any) => {
        return (Number(val || 0) as any).formatMoney(2)
    },
    getDate: (val:any, format:string = 'yyyy-MM-dd') => {
        if(!val) return ''
        return (new Date(val) as any).format(format)
    },

    blockToTimes: async (block:string | number) => {
        const _currentBlock = await ChinaApi.getBlockNumber();
        return ChinaApi.getBlockToTimes(_currentBlock, block)
    },

    hash: (txHash:any, length: number = 4) => {
        if (!txHash) {
            return '--';
        }
        return (
            txHash.substring(0, length) +
            '...' +
            txHash.substring(txHash.length - length, txHash.length)
        );
    },
    shiftedBy: (data:any, decimals:any) => {
        return window.BigNumber(data).shiftedBy(-decimals).toFixed()
    },
    filterStatus: (status:string | number, statusList: Record<string | number, any>) => {
        return statusList[status]
    }
};

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});




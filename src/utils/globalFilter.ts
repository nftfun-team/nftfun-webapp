import Vue from 'vue'

const filters:any = {
    convert: (val:any) => {
        return (Number(val || 0) as any).formatMoney(2)
    },
    getDate: (val:any, format:string = 'yyyy-MM-dd') => {
        if(!val) return ''
        return (new Date(val) as any).format(format)
    },

    toFixed: (value, decimal = 0, shiftBy = false, fixed = 4) => {
        if (value === '' || value === undefined || isNaN(value)) {
            return '--';
        }
        let res = shiftBy
            ? window.BigNumber(value).shiftedBy(-decimal).toFixed(fixed)
            : window.BigNumber(value).toFixed(decimal, 1);
        let min = window.BigNumber(1).shiftedBy(-fixed).toFixed();
        if (Number(value) > 0 && res < min) {
            res = '< ' + min;
        }
        return res;
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




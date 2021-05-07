import axiosService from '../axios';
let service: any = {};

service.klines = () => {
    let config = {
        url: `/api/v3/klines`,
        params: {
            symbol: 'BNBUSDT',
            interval: '1m',
            // startTime: '',
            // endTime: '',
            // limit: 500
        },
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.avgPrice = () => {
    let config = {
        url: `/api/v3/avgPrice`,
        params: {
            symbol: 'BNBUSDT',
        },
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

export default service

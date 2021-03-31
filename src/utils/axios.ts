import axios from 'axios'
import User from "utils/user";
import { Loadings }  from './loadings/loadings'
let load = new Loadings();

let axiosIns:any = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: process.env.VUE_APP_BASE_API,
  // // 超时
  // timeout: 1000000,
});
axios.defaults.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

axiosIns.defaults.responseType = 'json';

axiosIns.defaults.validateStatus =  (status:number) => {
  return true;
};
axiosIns.interceptors.request.use( (config:any) => {
  config.headers['X-Access-Token'] = User.token();
  return config;
});

axiosIns.interceptors.response.use( (response:any) => {
  let data = response.data;
  let status = response.status;
  if (data && status === 200) {
    if(data.code === 510) {
      User.logout();
      return
    }
    return Promise.resolve(response);
  }else {
    load.hide();
    load.tipErrorShow('Network Error');
    return Promise.reject(response);
  }
});

let ajaxMethod = ['get', 'post', 'put', 'delete'];
let api:any = {};
let timeout = {
  timeout: 120000,
};

ajaxMethod.forEach((method)=> {
  api[method] = (uri:string,data: object,config:object) => {
    return new Promise(function (resolve, reject) {

      axiosIns[method](uri,data,config).then((response:any)=> {
        if (response.status) {
          resolve(response);
        } else {
          resolve(response);
        }
      }).catch((response:any)=> {
        reject(response)
      })
    })
  }
});

let axiosService = (params:any) => {
  if(params.method === 'get'){
    return new Promise((resolve, reject) => {
      api.get(params.url,{params: params.params},timeout).then( (res:any) => {
        resolve(res)
      })
    })
  }else if(params.method === 'delete'){
    return new Promise((resolve, reject) => {
      api.delete(params.url,{},timeout).then( (res:any) => {
        resolve(res)
      })
    })
  }else if(params.method === 'put'){
    return new Promise((resolve, reject) => {
      api.put(params.url,params.data,timeout).then( (res:any) => {
        resolve(res)
      })
    })
  }else{
    return new Promise((resolve, reject) => {
      api.post(params.url,params.data,timeout).then( (res:any) => {
        resolve(res)
      })
    })
  }
};

export default axiosService;


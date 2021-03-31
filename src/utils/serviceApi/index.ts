import axiosService from '../axios';
import axios from 'axios'
var qs = require('qs');
import User from "utils/user";
let service: any = {};
const baseWxappUrl = process.env.VUE_APP_WXAPP_URL;
const mete = {
    system: '/enterprise/sys',
    dict: '/enterprise/sys/dict',
    channel: '/enterprise/channel',
    base: '/enterprise/entdepart',
    order: '/enterprise/orderInfo',
    enterprise: '/enterprise/enterprise',
    flow: '/enterprise/flow',
    user: '/enterprise/entuser',
    entuserlevel: '/enterprise/entuserlevel',
    standard: '/enterprise/standard',
    home: '/enterprise/home',
    enterpriseBalance: '/enterprise/enterpriseBalance',
    lc: '/enterprise/lchtrip',
    config: '/enterprise/config',
    wxapp: '/wxapp/chauffeur',
    bill: '/enterprise/bill',
    enterpriseUserBindRecord: '/enterprise/enterpriseUserBindRecord',
};

service.menuList = () => {
    let config = {
        // url: `/mock.json`,
        url: `${mete.system}/permission/getUserPermissionByToken`,
        params: {
            token: User.token()
        },
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


const filterDict = (data:Array<any>) => {
    for(let item of data){
        item.name = item.title;
    }
    return data
};

/**
 * Dict类 API
 * Dict类 API
 * Dict类 API
 */
service.special_request_type = async () => {
    let config = {
        url: `${mete.dict}/getDictItems/special_request_type`,
        method: 'get',
    };
    let data:any = await axiosService(config);
    return filterDict(data.data.result)
};

service.channel_price_type = async () => {
    let config = {
        url: `${mete.dict}/getDictItems/channel_price_type`,
        method: 'get',
    };
    let data:any = await axiosService(config);
    return filterDict(data.data.result)
};

service.quotation_method_type = async () => {
    let config = {
        url: `${mete.dict}/getDictItems/quotation_method_type`,
        method: 'get',
    };
    let data:any = await axiosService(config);
    return filterDict(data.data.result)
};

service.settlement_method_type = async () => {
    let config = {
        url: `${mete.dict}/getDictItems/settlement_method_type`,
        method: 'get',
    };
    let data:any = await axiosService(config);
    return filterDict(data.data.result)
};

service.order_status_type = async () => {
    let config = {
        url: `${mete.dict}/getDictItems/order_status_type`,
        method: 'get',
    };
    let data:any = await axiosService(config);
    return filterDict(data.data.result)
};

service.dict = async (dict:string) => {
    let config = {
        url: `${mete.dict}/getDictItems/${dict}`,
        method: 'get',
    };
    let data:any = await axiosService(config);
    return filterDict(data.data.result)
};



service.dictCheck = (params: object = {}) => {
    let config = {
        url: `${mete.system}/duplicate/check`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.dictAdd = (data: object = {}) => {
    let config = {
        url: `${mete.dict}/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.dictDelete = (data: object = {}) => {
    let config = {
        url: `${mete.dict}/delete?${qs.stringify(data)}`,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.dictEdit = (data: object = {}) => {
    let config = {
        url: `${mete.dict}/edit`,
        data,
        method: 'put',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.dictList = (params: object = {}) => {
    let config = {
        url: `${mete.dict}/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


service.dictItemAdd = (data: object = {}) => {
    let config = {
        url: `${mete.system}/dictItem/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.dictItemDelete = (data: object = {}) => {
    let config = {
        url: `${mete.system}/dictItem/delete?${qs.stringify(data)}`,
        data,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.dictItemEdit = (data: object = {}) => {
    let config = {
        url: `${mete.system}/dictItem/edit`,
        data,
        method: 'put',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.dictItemList = (params: object = {}) => {
    let config = {
        url: `${mete.system}/dictItem/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};
/**
 * Common类 API
 * Common类 API
 * Common类 API
 */
service.channelList = (params: object = {}) => {
    let config = {
        url: `${mete.channel}/channelInfo/dropDownlist`,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 系统类 API
 * 系统类 API
 * 系统类 API
 */

service.getCheckCode = (params: object = {}) => {
    let config = {
        url: `${mete.system}/getCheckCode`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.login = (data: object = {}) => {
    let config = {
        url: `${mete.system}/login`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};
service.logout = () => {
    let config = {
        url: `${mete.system}/logout`,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.permissionList = (params: object = {}) => {
    let config = {
        url: `${mete.system}/permission/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.queryTreeList = (params: object = {}) => {
    let config = {
        url: `${mete.system}/role/queryTreeList`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.queryRolePermission = (params: object = {}) => {
    let config = {
        url: `${mete.system}/permission/queryRolePermission`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};



service.saveRolePermission = (data: object = {}) => {
    let config = {
        url: `${mete.system}/permission/saveRolePermission`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};



/**
 * 定时任务 API
 * 定时任务 API
 * 定时任务 API
 */

service.quartzJobList = (params: object = {}) => {
    let config = {
        url: `${mete.system}/quartzJob/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


service.quartzJobPause = (params: object = {}) => {
    let config = {
        url: `${mete.system}/quartzJob/pause`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


service.quartzJobResume = (params: object = {}) => {
    let config = {
        url: `${mete.system}/quartzJob/resume`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.quartzJobEdit = (data: object = {}) => {
    let config = {
        url: `${mete.system}/quartzJob/edit`,
        data,
        method: 'put',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.quartzJobDelete = (data: object = {}) => {
    let config = {
        url: `${mete.system}/quartzJob/delete?${qs.stringify(data)}`,
        data,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};



service.quartzJobAdd = (data: object = {}) => {
    let config = {
        url: `${mete.system}/quartzJob/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};



/**
 * 菜单管理 API
 * 菜单管理 API
 * 菜单管理 API
 * */
service.permissionAdd = (data: object = {}) => {
    let config = {
        url: `${mete.system}/permission/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.permissionEdit = (data: object = {}) => {
    let config = {
        url: `${mete.system}/permission/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.permissionDelete = (data: object = {}) => {
    let config = {
        url: `${mete.system}/permission/delete?${qs.stringify(data)}`,
        // data,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/***用户管理***/
service.userList = (params: object = {}) => {
    let config = {
        url: `${mete.system}/user/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.userEdit = (data: object = {}) => {
    let config = {
        url: `${mete.system}/user/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.userAdd = (data: object = {}) => {
    let config = {
        url: `${mete.system}/user/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.passwordChange = (data: object = {}) => {
    let config = {
        url: `${mete.system}/user/changPassword`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.frozenBatch = (data: object = {}) => {
    let config = {
        url: `${mete.system}/user/frozenBatch`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

/***角色维护***/
service.roleList = (params: object = {}) => {
    let config = {
        url: `${mete.system}/role/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.addRole = (data: object = {}) => {
    let config = {
        url: `${mete.system}/role/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.editRole = (data: object = {}) => {
    let config = {
        url: `${mete.system}/role/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.deleteRole = (data: object = {}) => {
    let config = {
        url: `${mete.system}/role/delete?${qs.stringify(data)}`,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};



/**
 * 企业部门配置模块 API
 * 企业部门配置模块 API
 * 企业部门配置模块 API
 */

service.enterpriseDepartList = (params: object = {}) => {
    let config = {
        url: `${mete.base}/enterpriseDepart/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.enterpriseDepartSelectDepart = (params: object = {}) => {
    let config = {
        url: `${mete.base}/enterpriseDepart/selectDepart`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getDepartUser = (params: object = {}) => {
    let config = {
        url: `${mete.base}/enterpriseDepart/getDepartUser`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.enterpriseDepartAdd = (data: object = {}) => {
    let config = {
        url: `${mete.base}/enterpriseDepart/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.enterpriseDepartEdit = (data: object = {}) => {
    let config = {
        url: `${mete.base}/enterpriseDepart/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getDepartList = (params: object = {}) => {
    let config = {
        url: `${mete.base}/enterpriseDepart/getDepartTree`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.departDelete = (data: object = {}) => {
    let config = {
        url: `${mete.base}/enterpriseDepart/delete?${qs.stringify(data)}`,
        data,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.departDownload = () => {
    return axios({
        url: `${mete.base}/enterpriseDepart/departDownload`,
        method:'get' ,
        responseType: 'blob'
    })
};

service.importExcel = (data: object = {}) => {
    let config = {
        url: `${mete.base}/enterpriseDepart/importExcel`,
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};





/**
 * BASE类 API
 * BASE类 API
 * BASE类 API
 */

service.getOpenBusinessType = (params: object = {}) => {
    let config = {
        url: `${mete.order}/getOpenBusinessType`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getCitylist = (params: object = {}) => {
    let config = {
        url: `${mete.order}/getCitylist`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


service.getCarModelGroupList = (params: object = {}) => {
    let config = {
        url: `${mete.order}/getCarModelGroupList`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getAreaCity = (params: object = {}) => {
    let config = {
        url: `${mete.order}/getAreaCity`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getAreaCity = (params: object = {}) => {
    let config = {
        url: `${mete.order}/getAreaCity`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getEnterpriseBillingDetail = (params: object = {}) => {
    let config = {
        url: `${mete.bill}/getBillDetailsPage`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getEnterpriseBillingAmount = (params: object = {}) => {
    let config = {
        url: `${mete.bill}/getBillDetailsAmountOfMoney`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.exportOrderDetail = (params: object = {}) => {
    return axios({
        headers: {
            'X-Access-Token': localStorage.getItem('token')
        },
        url: `${mete.order}/exportOrderDetail`,
        method:'get' ,
        params,
        responseType: 'blob'
    })
};


/**
 * ORDER类 API
 * ORDER类 API
 * ORDER类 API
 */

service.getOrderCalc = (data: object = {}) => {
    let config = {
        url: `${mete.order}/calc`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getOrderPreMileageTime = (data: object = {}) => {
    let config = {
        url: `${mete.order}/getOrderPreMileageTime`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getOrderadd = (data: object = {}) => {
    let config = {
        url: `${mete.order}/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.cancelOrder = (data: object = {}) => {
    let config = {
        url: `${mete.order}/cancelOrder`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


service.getOrderList = (params: object = {}) => {
    let config = {
        url: `${mete.order}/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getOrderInfo = (params: object = {}) => {
    let config = {
        url: `${mete.order}/queryByOrderId`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 企业用车人类 API
 * 企业用车人类 API
 * 企业用车人类 API
 */
service.getUserList = (params: object = {}) => {
    let config = {
        url: `${mete.user}/enterpriseUser/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getUserByDepartOrLevelId = (params: object = {}) => {
    let config = {
        url: `${mete.user}/enterpriseUser/getUserByDepartOrLevelId`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.addUser = (data: object = {}) => {
    let config = {
        url: `${mete.user}/enterpriseUser/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.editUser = (data: object = {}) => {
    let config = {
        url: `${mete.user}/enterpriseUser/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.userApproval = (params: object = {}) => {
    let config = {
        url: `${mete.user}/enterpriseUser/approval`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.deleteUser = (data: object = {}) => {
    let config = {
        url: `${mete.user}/enterpriseUser/delete?${qs.stringify(data)}`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.queryLeaderList = (params: object = {}) => {
    let config = {
        url: `${mete.user}/enterpriseUser/queryLeaderList`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.excelDownload = () => {
    return axios({
        url: `${mete.user}/enterpriseUser/excelDownload`,
        method:'get' ,
        responseType: 'blob'
    })
};

service.importUserBatch = (data: object = {}) => {
    let config = {
        url: `${mete.user}/enterpriseUser/importUserBatch`,
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.exportEnterprise = (data: object = {}) => {
    return axios({
        headers: {
            'X-Access-Token': localStorage.getItem('token')
        },
        url: `${mete.user}/enterpriseUser/exportEnterprise`,
        method:'get' ,
        responseType: 'blob'
    })
};


/**
 * 审批类 API
 * 审批类 API
 * 审批类 API
 */
service.getApproveList = (params: object = {}) => {
    let config = {
        url: `${mete.enterprise}/enterpriseOrderFlow/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.approval = (params: object = {}) => {
    let config = {
        url: `${mete.enterprise}/enterpriseOrderFlow/approval`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 审批节点类 API`
 * 审批节点类 API
 * 审批节点类 API
 */
service.queryFlowStepPageList = (params: object = {}) => {
    let config = {
        url: `${mete.enterprise}/enterpriseOrderFlowStep/queryFlowStepPageList`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.queryFlowStepList = (params: object = {}) => {
    let config = {
        url: `${mete.enterprise}/enterpriseOrderFlowStep/queryFlowStepList`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 审批流程配置 API`
 * 审批流程配置 API
 * 审批流程配置 API
 */
service.getSetpListById = (params: object = {}) => {
    let config = {
        url: `${mete.flow}/flowInfo/queryById`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getFlowInfoList = (params: object = {}) => {
    let config = {
        url: `${mete.flow}/flowInfo/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.listAllInitiators = (params: object = {}) => {
    let config = {
        url: `${mete.flow}/flowInfoInitiator/listAllInitiators`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.flowInfoAdd = (data: object = {}) => {
    let config = {
        url: `${mete.flow}/flowInfo/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.flowInfoEdit = (data: object = {}) => {
    let config = {
        url: `${mete.flow}/flowInfo/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.flowInfoDelete = (data: object = {}) => {
    let config = {
        url: `${mete.flow}/flowInfo/delete?${qs.stringify(data)}`,
        data,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.flowInfoUpdate = (data: object = {}) => {
    let config = {
        url: `${mete.flow}/flowInfo/update`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 企业发票信息 API`
 * 企业发票信息 API`
 * 企业发票信息 API`
 */

service.invoiceList = (params: object = {}) => {
    let config = {
        url: `${mete.enterprise}/enterpriseInvoice/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.invoiceAdd = (data: object = {}) => {
    let config = {
        url: `${mete.enterprise}/enterpriseInvoice/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.invoiceEdit = (data: object = {}) => {
    let config = {
        url: `${mete.enterprise}/enterpriseInvoice/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.invoiceDelete = (params: object = {}) => {
    let config = {
        url: `${mete.enterprise}/enterpriseInvoice/delete`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.invoiceQueryById = (params: object = {}) => {
    let config = {
        url: `${mete.enterprise}/enterpriseInvoice/queryById`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 用车人模块 API`
 * 用车人模块 API`
 * 用车人模块 API`
 */

service.employeeChecklist = (params: object = {}) => {
    let config = {
        url: `${mete.enterpriseUserBindRecord}/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.employeeCheckapproval = (params: object = {}) => {
    let config = {
        url: `${mete.enterpriseUserBindRecord}/approval`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};



/**
 * 职级模块 API`
 * 职级模块 API`
 * 职级模块 API`
 */

service.selectEntUserLevel = (params: object = {}) => {
    let config = {
        url: `${mete.entuserlevel}/enterpriseUserLevel/selectEntUserLevel`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.entUserLevelAdd = (data: object = {}) => {
    let config = {
        url: `${mete.entuserlevel}/enterpriseUserLevel/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.entUserLevelEdit = (data: object = {}) => {
    let config = {
        url: `${mete.entuserlevel}/enterpriseUserLevel/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.entUserLevelDelete = (data: object = {}) => {
    let config = {
        url: `${mete.entuserlevel}/enterpriseUserLevel/delete?${qs.stringify(data)}`,
        data,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 差旅标准超标 API`
 * 差旅标准超标 API`
 * 差旅标准超标 API`
 */
service.getReasonList = (params: object = {}) => {
    let config = {
        url: `${mete.standard}/overStandardReasonCode/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.reasonCodeAdd = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseExceptedOverStandardReasonCode/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.reasonCodeQueryById = (params: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseExceptedOverStandardReasonCode/queryByProductType`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};



/**
 * 机票差旅标准 API`
 * 机票差旅标准 API`
 * 机票差旅标准 API`
 */

service.selectFlightStandardList = (params: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseFlightStandard/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.selectFlightStandardAdd = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseFlightStandard/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.selectFlightStandardDelete = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseFlightStandard/delete?${qs.stringify(data)}`,
        data,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.selectFlightStandardEdit = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseFlightStandard/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.selectFlightStandardQueryById = (params: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseFlightStandard/queryById`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};




/**
 * 酒店差旅城市标准 API`
 * 酒店差旅城市标准 API`
 * 酒店差旅城市标准 API`
 */

service.selectHotelCityStandardAdd = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseHotelCityGroup/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.selectHotelCityStandardDelete = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseHotelCityGroup/delete?${qs.stringify(data)}`,
        data,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.selectHotelCityStandardEdit = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseHotelCityGroup/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.selectHotelCityStandardList = (params: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseHotelCityGroup/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.selectHotelCityStandardQueryById = (params: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseHotelCityGroup/queryById`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};



/**
 * 酒店差旅标准 API`
 * 酒店差旅标准 API`
 * 酒店差旅标准 API`
 */

service.selectHotelStandardAdd = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseHotelStandard/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.selectHotelStandardDelete = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseHotelStandard/delete?${qs.stringify(data)}`,
        data,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.selectHotelStandardEdit = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseHotelStandard/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.selectHotelStandardList = (params: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseHotelStandard/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.selectHotelStandardQueryById = (params: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseHotelStandard/queryById`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 火车票差旅标准 API`
 * 火车票差旅标准 API`
 * 火车票差旅标准 API`
 */

service.trainStandardAdd = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseTrainStandard/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.trainStandardDelete = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseTrainStandard/delete?${qs.stringify(data)}`,
        data,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.trainStandardEdit = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseTrainStandard/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.trainStandardList = (params: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseTrainStandard/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.trainStandardQueryById = (params: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseTrainStandard/queryById`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

/**
 * 用车差旅标准 API`
 * 用车差旅标准 API`
 * 用车差旅标准 API`
 */

service.chauffeurStandardAdd = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseChauffeurStandard/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.chauffeurStandardDelete = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseChauffeurStandard/delete?${qs.stringify(data)}`,
        data,
        method: 'delete',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.chauffeurStandardEdit = (data: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseChauffeurStandard/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.chauffeurStandardList = (params: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseChauffeurStandard/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.chauffeurStandardQueryById = (params: object = {}) => {
    let config = {
        url: `${mete.standard}/enterpriseChauffeurStandard/queryById`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 企业账户余额 API
 * 企业账户余额 API
 * 企业账户余额 API
 */

service.reconciliationList = (params: object = {}) => {
    let config = {
        url: `${mete.enterpriseBalance}/reconciliationList`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getInvoiceType = (params: object = {}) => {
    let config = {
        url: `${mete.enterpriseBalance}/getInvoiceType`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getInvoiceEdit = (data: object = {}) => {
    let config = {
        url: `${mete.enterpriseBalance}/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 力程相关接口类 API
 * 力程相关接口类 API
 * 力程相关接口类 API
 */
service.getLchtripCity = (params: object = {}) => {
    let config = {
        url: `${mete.lc}/getLchtripCity`,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.listFlight = (params: object = {}) => {
    let config = {
        url: `${mete.lc}/listFlight`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.listHotel = (params: object = {}) => {
    let config = {
        url: `${mete.lc}/listHotel`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.listTrain = (params: object = {}) => {
    let config = {
        url: `${mete.lc}/listTrain`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.queryOrderDetailByProductId = (params: object = {}) => {
    let config = {
        url: `${mete.order}/queryOrderDetailByProductId`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 首页相关接口类 API
 * 首页相关接口类 API
 * 首页相关接口类 API
 */
service.basicInfo = (params: object = {}) => {
    let config = {
        url: `${mete.home}/basicInfo`,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.consumptionOfProducts = (params: object = {}) => {
    let config = {
        url: `${mete.home}/consumptionOfProducts`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.getBillDateAround = (params: object = {}) => {
    let config = {
        url: `${mete.home}/getBillDateAround`,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.monthlyConsumptionReport = (params: object = {}) => {
    let config = {
        url: `${mete.home}/monthlyConsumptionReport`,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 企业成本中心管理 API
 * 企业成本中心管理 API
 * 企业成本中心管理 API
 */
service.configCostAdd = (data: object = {}) => {
    let config = {
        url: `${mete.config}/enterpriseConfigCost/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.configCostDelete = (params: object = {}) => {
    let config = {
        url: `${mete.config}/enterpriseConfigCost/delete`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


service.configCostEdit = (data: object = {}) => {
    let config = {
        url: `${mete.config}/enterpriseConfigCost/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


service.configCostList = (params: object = {}) => {
    let config = {
        url: `${mete.config}/enterpriseConfigCost/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

/**
 * 企业成本中心规则 API
 * 企业成本中心规则 API
 * 企业成本中心规则 API
 */
service.configCostRuleAdd = (data: object = {}) => {
    let config = {
        url: `${mete.config}/enterpriseConfigCostRule/add`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.configCostRuleDelete = (params: object = {}) => {
    let config = {
        url: `${mete.config}/enterpriseConfigCostRule/delete`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


service.configCostRuleEdit = (data: object = {}) => {
    let config = {
        url: `${mete.config}/enterpriseConfigCostRule/edit`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


service.configCostRuleList = (params: object = {}) => {
    let config = {
        url: `${mete.config}/enterpriseConfigCostRule/list`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.configCostRuleQuery = (params: object = {}) => {
    let config = {
        url: `${mete.config}/enterpriseConfigCostRule/queryById`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * OA单号填写规则 API
 * OA单号填写规则 API
 * OA单号填写规则 API
 */
service.queryOaRule = (params: object = {}) => {
    let config = {
        url: `${mete.config}/enterpriseConfigOaRule/queryOaRule`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};

service.updateOaRule = (data: object = {}) => {
    let config = {
        url: `${mete.config}/enterpriseConfigOaRule/updateOaRuleScope`,
        data,
        method: 'post',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


/**
 * 力程 API
 * 力程 API
 * 力程 API
 */
service.checkTravelIndividual = (params: object = {}) => {
    let config = {
        url: `${baseWxappUrl}${mete.wxapp}/oauth/checkTravelIndividual`,
        params,
        method: 'get',
    };
    return new Promise((resolve,reject)=>{ axiosService(config).then( (data:any) => { resolve(data.data) }).catch() })
};


export default service

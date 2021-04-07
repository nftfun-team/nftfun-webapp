import VueRouter, {Route} from 'vue-router';
import BigNumber from "bignumber.js";

type Api<T> = { [key: string]: T }


interface Operating {
    visible: boolean,
    modelWidth?: string,
    modelHeight?: string,
    option:{
        head?: string,
        conter: string,
        onOk: Function,
    }
}

interface Load {
    loadingShow: () => {},
    tipShow: (tip: string) => {},
    tipSuccessShow: (value: string, time?: number) => {},
    tipWarningShow: (value: string) => {},
    tipErrorShow: (value: string, time?: number) => {},
    successFrame: (value: string, value2: string) => {},
    txid: (value: string) => {},
    hide: () => {},
    hideLoading: () => {},
}

declare module 'vue/types/vue' {
    interface Vue {
        $serviceApi: Api<Function>,
        $popTip: () => {},
        $sleep: (time?:number) => {},
        // $event: any,
        $load: Load,
        $modelOperating: (data: Operating) => {},
        $router: VueRouter
        $route: Route,
        $ChainApi: any,
        $BigNumber: any
    }
}


declare global {
    interface Window {
        downFlies: (data:any, filesName:string) => {}
        BigNumber: any,
        copy: Function
    }
}

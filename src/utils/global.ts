import Vue from 'vue';
import ChainApi from "@/assets/sdk/ChainApi.js";
(window as any).Vue = Vue;

// @ts-ignore
import service from "utils/serviceApi";
import {Loadings} from "utils/loadings/loadings";
import BigNumber from "bignumber.js";

import ComingSoon from 'components/comingSoon/index.vue'
import Loading from 'components/loading/index.vue'

const components: { [propsName: string]: any } = {
    ComingSoon,
    Loading
};



const install = function(Vue:any, opts = {}) {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });

    // Object.keys(metFn).forEach((key) => {
    //     Vue.prototype[key] = metFn[key];
    // });

    Vue.prototype.$serviceApi = service;
    Vue.prototype.$load = new Loadings();
    Vue.prototype.$ChainApi = ChainApi;
    Vue.prototype.$comparedTo = (x: number | string, y: number | string) => {};
    Vue.prototype.$BigNumber = (number: number | string) =>  new BigNumber(number);

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue || Vue);
}

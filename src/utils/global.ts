import Vue from 'vue';
(window as any).Vue = Vue;

// @ts-ignore
import service from "utils/serviceApi";
import {Loadings} from "utils/loadings/loadings";

const components: { [propsName: string]: any } = {

};


const install = function(Vue:any, opts = {}) {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });

    Vue.prototype.$serviceApi = service;
    Vue.prototype.$event = new Vue();
    Vue.prototype.$load = new Loadings();
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue || Vue);
}

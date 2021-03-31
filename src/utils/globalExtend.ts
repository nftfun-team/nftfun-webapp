import { Vue } from "vue-property-decorator";
import ModelOperating from "components/model/operating.vue";
function modelOperating(options:any) {
    const Operating = Vue.extend(ModelOperating); // 返回一个vue子类
    //创建实例并且挂载
    const app:any = new Operating().$mount(document.createElement('div'));
    //初始化参数
    for (let key in options) {
        app[key] = options[key];
    }

    // console.log('app', app)
    //将元素插入body中
    document.body.appendChild(app.$el);
}
Vue.prototype.$modelOperating = modelOperating; //将方法放在原型上。
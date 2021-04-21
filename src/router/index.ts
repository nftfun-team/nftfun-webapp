import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { BaseRouter } from 'config/router.config'

Vue.use(VueRouter);

const originalPush:any = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  mode: process.env.NODE_ENV === 'ipfsview' ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: BaseRouter,
});
export default router;

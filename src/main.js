// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/font/font.css'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import moment from "moment";
import VueResource from "vue-resource";
import './assets/js/toNative';
import pubFunc from './assets/js/pubFunc';
import VueTouchKeyboard from "vue-touch-keyboard";
import style from "vue-touch-keyboard/dist/vue-touch-keyboard.css";
Vue.use(VueTouchKeyboard);
//区分是否开发模式，采用不同的请求路径
const IS_DEV = true;
const baseURL = IS_DEV ? "" : "http://119.29.198.174:8765";
global.baseURL = baseURL;
//导入路由
Vue.use(VueResource);
//样式导入
Vue.use(Mint);
//导入全局方法
Vue.use(pubFunc);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


Vue.http.options.emulateJSON = true;

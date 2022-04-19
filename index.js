// 引入配置文件
import config from "@/static/config.json"
// 公共函数
import common from "./libs/common/common.js"
// 调试函数
import debug from "./libs/common/debug.js"
import Vue from "vue";
// vuex数据管理中心
import store from './store'
Vue.prototype.$store = store;

// 初始化全局变量
store.commit("setESAUserInfo",uni.getStorageSync("ESA_USER"));

// 引入url
import url from "./libs/url/url.js"
// 引入request
import request from "./libs/request/request.js"
// 引入user
import user from "./libs/user/user.js"

const $esa = {
	store: store,
	config: config,
	common: common,
	debug: debug,
	url:url,
	request: request,
	user: user
}

// $esa挂载到uni对象上
uni.$esa = $esa
import store from '../../store';
const login = (callback)=>{
	let storeUserInfo = store.state.userInfo;
	// 定义公共回调函数
	uni.$esa.user.login_callback = callback;
	if (!storeUserInfo.userId){ // nvue页面读取不到vuex里面数据，将取缓存
	    storeUserInfo = uni.getStorageSync('userInfo')
	}
	if (!storeUserInfo.token) {
	    // #ifdef MP
	    store.commit('setLoginPopupShow', true);
	    // #endif
	    // #ifdef APP-PLUS
	    uni.$showModal({
	        title: "登录提示",
	        confirmVal:'去登录',
	        cancelVal:'再逛会',
	        content:'此时此刻需要您登录喔~',
	    }).then(res=>{
	        uni.navigateTo({
	            url: "/pages/user/login"
	        });
	    }).catch(res=>{})
	    // #endif
	    // #ifdef H5
	    h5Login();
	    // #endif
	}else{
	    callback()
	}
}

const silenceLogin = (callback)=>{
	// #ifdef MP
	uni.login({
		success:function(res){
			uni.$esa.debug("开始静默登录");
			uni.$esa.user.getEsaUser(function(userInfo){
				callback && callback.call(this,userInfo);
			},res.code);
		},
		fail:function(err){
			esa.debug(err)
		}
	})
	// #endif
	// #ifndef MP
	uni.$esa.user.login(callback);
	// #endif
}

const getEsaUser = (callback,code)=>{
	// #ifdef MP-WEIXIN
	uni.$esa.debug("微信小程序：根据code获取用户openid")
	uni.$esa.request({
		url		: "/api/wxapp/code2user",
		data	: {code:code},
		loading	: false,
	},function(d){
		uni.$esa.debug("code2user获取用户信息结果",d);
		// uni.$esa.store.commit("setESAUserLogin",d.login);
		uni.$esa.store.commit("setESAUserInfo",d);
		// uni.$esa.store.commit("setESAToken",d.token);
		callback && callback.call(this,d);
		return false;
	})
	// #endif
	
}

const checkToken = (success,error)=>{
	esa.debug("校验TOKEN")
	uni.$esa.request({
		url		: "/api/wxapp/checkToken",
		method	: "POST",
		loading	: false,
	},function(d){
		success.call(this,d);
		return false;
	},function(e){
		error.call(this,e);
		return false;
	})
}

const upgradeUser = (wxappUserInfo,callback)=>{
	let userInfo = store.state.ESA_USER;
	uni.$esa.debug("upgradeUser",userInfo);
	if(!wxappUserInfo){
		return typeof callback == "function" && callback.call(this,userInfo);
	}
	userInfo.wxappUserInfo = wxappUserInfo;
	uni.$esa.request({
		url		: "/api/wxapp/upgradeUser",
		method	: "POST",
		data	: userInfo,
	},function(d){
		uni.$esa.store.commit("setESAUserInfo",d);
		typeof callback == "function" && callback.call(this,d);
		return false;
	})
}

// 微信/支付宝小程序---通用授权个人信息登录
const getUserInfo = (successCallback,errorCallback) => {
    uni.showLoading({
        title: '正在申请授权',
    });
    // #ifdef MP-WEIXIN
    uni.getUserProfile({
        desc: '完善会员资料',
        success: function(res) {
            uni.hideLoading()
            var offUserInfo = res.userInfo
            successCallback && successCallback(offUserInfo)
        },fail: (res) => {
            uni.hideLoading()
            errorCallback && errorCallback(res)
        }
    })
    // #endif
    // #ifdef MP-ALIPAY
    uni.getOpenUserInfo({
        success: (res) => {
            uni.hideLoading()
            var offUserInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
            offUserInfo.avatarUrl = offUserInfo.avatar
            successCallback && successCallback(offUserInfo)
        },fail: (res) => {
            uni.hideLoading()
            console.log(res, "失败")
            errorCallback && errorCallback(res)
        }
    })                    
    // #endif
}

export default {
	silenceLogin	: silenceLogin,
	login			: login,
	upgradeUser		: upgradeUser,
	checkToken		: checkToken,
	getEsaUser		: getEsaUser,
	getUserInfo		: getUserInfo
}
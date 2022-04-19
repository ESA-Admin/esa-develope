export default function(options,success,error,status,userInfo){
		uni.$esa.debug(">>>>>>>>>>>>>>>>>> ESA request开始请求");
		options = typeof options === "string" ? {url:options} : options;
		options.url = uni.$esa.url(options.url);
		var index;
		if(typeof options.loading === "undefined" || options.loading){
			uni.showLoading({title:'加载中'})
		}
		const param = Object.assign({
			type		: "POST",
			dataType	: "json",
			success		: function(res){
				uni.$esa.debug("请求成功：",res);
				uni.hideLoading();
				res = res.data;
				try{
					res = typeof res === "object" ? res : JSON.parse(res);
					if(typeof res !== "object") success.call(this,res,res);
				}catch(e){
					res = {code:99999,msg:"ajax请求错误",data:[]}
				}
				var data = typeof res.data !== "undefined" ? res.data : null;
				var msg = typeof res.msg !== "undefined" && res.msg ? res.msg : "";
				if (res.code === 101001){
					// 需要登录
					if(status){
						uni.$esa.debug("重复登录，检查系统代码问题！");
						return ;
					}
					console.log(uni.getStorageSync("ESA_LOGIN"));
					if(!uni.getStorageSync("ESA_LOGIN")){
						uni.$esa.user.silenceLogin(()=>{
							uni.$esa.debug("二次静默登录");
							uni.$esa.request(options,success,error,true)
						});
					}
					// esa.login(function(){},uni.getStorageSync("wxappUserInfo"));
				} else if (res.code === 0) {
					if (typeof success === 'function') {
						var result = success.call(this, data, res, userInfo);
						if (result === false)
							return;
					}
					if(msg !== ""){
						uni.showToast({
							'title':msg
						})
					}
				} else {
					if (typeof error === 'function') {
						var result = error.call(this, data, res);
						if (result === false)
							return;
					}
					if(msg !== ""){
						uni.showToast({
							'title'	: msg,
							'icon'	: "none"
						})
					}
				}
				uni.$esa.debug("<<<<<<<<<<<<<<<<<< ESA request请求结束");
			},
			fail		: function(error){
				uni.$esa.debug("请求失败(fail)：",error);
				uni.$esa.debug("<<<<<<<<<<<<<<<<<< ESA request请求结束");
				uni.hideLoading();
			}
		},options);
		console.log("############33",uni.$esa.store.state.ESA_USER.token);
		param.header = typeof param.header === "undefined" ? {'token':uni.$esa.store.state.ESA_USER.token} : Object.assign({'token':uni.$esa.store.state.ESA_USER.token},param.header);
		uni.$esa.debug("请求参数：",param);
		return uni.request(param);
	}
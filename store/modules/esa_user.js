export const state = {
    //用户数据
    ESA_USER: {},
	//ESA_LOGIN: false,
	//__TOKEN__: ""
};
export const mutations = {
	// setESAToken(state, token){
	// 	state.__TOKEN__ = token;
	// 	// #ifdef H5
	// 	window.sessionStorage.setItem('__TOKEN__', JSON.stringify(state.__TOKEN__));
	// 	// #endif
	// 	// #ifndef H5
	// 	uni.setStorageSync('__TOKEN__', state.__TOKEN__);
	// 	// #endif
	// },
	// setESAUserLogin(state, status){
	// 	state.ESA_LOGIN = status;
	// 	// #ifdef H5
	// 	window.sessionStorage.setItem('ESA_LOGIN', JSON.stringify(state.ESA_LOGIN));
	// 	// #endif
	// 	// #ifndef H5
	// 	uni.setStorageSync('ESA_LOGIN', state.ESA_LOGIN);
	// 	// #endif
	// },
    //储存ESA用户信息
    setESAUserInfo(state, data) {
        if (data) {
            state.ESA_USER =  Object.assign({}, state.ESA_USER,data);
            // #ifdef H5
            window.sessionStorage.setItem('ESA_USER', JSON.stringify(state.ESA_USER));
            // #endif
            // #ifndef H5
            uni.setStorageSync('ESA_USER', state.ESA_USER);
            // #endif
        }
    },
    // 退出APP
    emptyESAUserInfo(state) {
        state.ESA_USER = {};
        // #ifdef H5
        window.sessionStorage.removeItem("ESA_USER");
        // #endif
        // #ifndef H5
        uni.removeStorageSync("ESA_USER");
        // #endif
    },
};
export const actions = {

};

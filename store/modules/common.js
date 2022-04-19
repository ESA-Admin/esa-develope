export const state = {
    loginPopupShow:false,//控制是否打开登录弹窗
    loadingShow:false,//加载动画
    chatScenesInfo:{},//扫码参数
    locateInformation:{},//定位信息
};
//缓存浏览器的数据名称
const cacheNameList = ["userInfo"];
let clearTime;
export const mutations = {
    //取出缓存数据（打开APP就取出）
    setCacheData(state) {
        for (let name of cacheNameList) {
            let data;
            // #ifndef H5
            data = uni.getStorageSync(name);
            // #endif
            // #ifdef H5
            data = sessionStorage.getItem(name) || localStorage.getItem(name);
            // #endif
            if (data) {
                // #ifdef H5
                try {
                    data = JSON.parse(data);
                } catch (e) {}
                // #endif
                state[name] = data;
            }
        }
    },
    setLoginPopupShow(state, data){
        state.loginPopupShow = data
    },
    setLoadingShow(state, data){
        state.loadingShow = data
    },
    setChatScenesInfo(state, data){
        state.chatScenesInfo = data
    },
    setLocateInformation(state, data){
        state.locateInformation = data
    },
};
export const actions = {
  
};

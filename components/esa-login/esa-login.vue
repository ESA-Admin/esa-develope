<template>
	<view>
		<u-popup :show="loginPopupShow" mode="bottom" :round="10" @close="closeLogin" zIndex="999998">
			<view class="esa_login">
			    <!-- <view class="loginLoading" v-if="isLoading">
			        <u-loadmore status="loading" loadingText="正在登录..."></u-loadmore>
			    </view> -->
			    <view class="esa_logo">
			        <image class="img" src="/static/logo.png"></image>
			    </view>
			    <view class="title">欢迎登录~</view>
			    <view class="text">会员用户登录后消费可享受折扣，享受更好的服务体验</view>
			    <view class="loginButton" v-if="!isPhoneLogin">
			        <!-- #ifdef MP-WEIXIN -->
			        <button class="button" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber" :style="{background:PrimaryColor}">微信手机号登录</button><!-- 此功能需微信认证 -->
			        <button class="button marginT" @click="onAuthorization" :style="{background:PrimaryColor}">微信授权登录</button>
			        <!-- #endif -->
			        <!-- #ifdef MP-ALIPAY -->
			        <button class="button" open-type="getAuthorize" scope="phoneNumber" @getAuthorize="decryptPhoneNumber" @error="onAuthError" :style="{background:PrimaryColor}">支付宝手机号登录</button><!-- 此功能需申请 -->
			        <button class="button marginT" <o></o>pen-type="getAuthorize" scope="userInfo" @getAuthorize="onAuthorization" :style="{background:PrimaryColor}">支付宝授权登录</button>
			        <!-- #endif -->
			        <button class="button" @click="closeLogin" style="background:#fff;margin-top:24rpx;" :style="{border:'2rpx solid '+PrimaryColor,color:PrimaryColor}">
			            暂不登录
			        </button>
			    </view>
			    <!-- 验证码登录 -->
			    <view class="loginPhone" v-if="isPhoneLogin">
			        <view class="form-row">
			            <input class="input" type="number" v-model="phone" placeholder="请输入手机号码" placeholder-style="font-weight:normal;color:#bbbbbb;"></input>
			        </view>
			        <view class="form-row">
			            <input class="input" type="number" v-model="vCode" placeholder="请输入验证码" placeholder-style="font-weight:normal;color:#bbbbbb;"></input>
			            <view class="getvcode" :class="{forhidden:readonly}" @click="getVcode">{{ codeText }}</view>
			        </view>
			        <button class="submit" size="default" @click="onSubmit" :style="{background:PrimaryColor}">确定</button>
			    </view>
			    <!-- #ifdef MP -->
			    <!-- 快速登录和手机号登录切换 -->
			    <view class="tips">
			        <view @click="isPhoneLogin = !isPhoneLogin" class="goBuy" :style="{color:PrimaryColor}">{{isPhoneLogin?'快速登录':'手机号登录'}}</view>
			    </view>
			    <!-- #endif -->
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		name: 'esa-login',
		computed: {
			...mapState(['loginPopupShow']),
		},
		data() {
			return {
				// #ifndef MP-ALIPAY
				PrimaryColor: '#8dc63f', //主题色
				// #endif
				// #ifdef MP-ALIPAY
				PrimaryColor: '#007AFF',
				// #endif
				// #ifdef APP-PLUS || H5
				isLoading:false,
				isPhoneLogin:true,//是否显示验证码登录
				// #endif
				// #ifndef APP-PLUS || H5
				isLoading:true,
				isPhoneLogin:false,//是否显示验证码登录
				// #endif
				readonly: false,
				codeText: '获取验证码',
				phone: '', //号码
				vCode: '', //验证码
				code: '',  //uni.login获取的code
			}
		},
		methods: {
			onAuthorization(){
				uni.$esa.user.getUserInfo(userInfo=>{
					uni.$esa.store.commit("setUserInfo",userInfo);
					uni.$esa.user.upgradeUser(userInfo,ESA_USER=>{
						this.closeLogin();
					})
				},err=>{
					this.closeLogin();
				})
			},
			closeLogin(){
			    uni.$esa.store.commit('setLoginPopupShow', false);
			    // #ifdef APP-PLUS || H5
			    this.isLoading = false
			    this.isPhoneLogin = true//是否显示验证码登录
			    // #endif
			    // #ifndef APP-PLUS || H5
			    this.isLoading = true
			    this.isPhoneLogin = false//是否显示验证码登录
			    // #endif
				let callback = uni.$esa.user.login_callback;
				console.log(callback);
				callback && callback();
			},
		}
	}
</script>

<style lang="scss" scoped>
.esa_login {
    padding: 48rpx 32rpx;
    border-radius: 18rpx 18rpx 0 0;
    z-index: 99;
    position: relative;
    .loginLoading {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, .95);
        z-index: 999;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .esa_logo {
        width: 90rpx;
        height: 90rpx;
        border-radius: 18rpx;
        overflow: hidden;
        .img {
            width: 90rpx;
            height: 90rpx;
        }
    }
    .title {
        font-size: 40rpx;
        font-weight: bold;
        margin-top: 24rpx;
    }
    .text {
        font-size: 24rpx;
        color: #666;
        margin-top: 16rpx;
    }
    .loginButton {
        margin-top: 56rpx;
        .button {
            color: #fff;
            width: 100%;
            height: 92rpx;
        }
        .marginT{
            margin-top: 24rpx;
        }
    }
    .tips {
        margin-top: 24rpx;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .left {
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-direction: row;
        }
        .goBuy {
            font-size: 24rpx;
            /* margin-left: 16rpx; */
            background: none;
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-direction: row;
            justify-content: flex-start;
            padding: 0;
            margin: 0;
            color: #1fba1a;
        }
    }
}
.loginPhone{
    .form-row {
        position: relative;
        border-bottom: 1rpx solid #e8e8e8;
        line-height: 1;
        margin-top: 24rpx;
        .input{
            font-size: 34rpx;
            line-height: 102rpx;
            height: 94rpx;
            width: 100%;
            box-sizing: border-box;
            font-size: 30rpx;
            padding: 0;
            font-weight: bold;
        }
        .getvcode {
            font-size: 26rpx;
            height: 80rpx;
            color: #333;
            line-height: 80rpx;
            background: #eee;
            min-width: 188rpx;
            text-align: center;
            border-radius: 8rpx;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            z-index: 11;
            &.forhidden {
                background: #eee;
                color: #cccccc;
            }
        }
    }
    .submit{
        margin-top: 60rpx;
        color: #fff;
        width: 100%;
        border: none;
    }
}
</style>


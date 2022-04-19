export default function(path){
	let config = uni.$esa.config
	if(path.indexOf("/") === 0){
		return config.url+path+".html?PLATFORM_ID="+config.pfid;
	}else if(path.indexOf("http://") === 0 || path.indexOf("https://") === 0){
		return path;
	}
	var url = config.url+"/addons/"+config.pfid+"/"+config.addon+"."+path+".html?from=wxapp";
	uni.$esa.debug("请求URL",url);
	return url;
}
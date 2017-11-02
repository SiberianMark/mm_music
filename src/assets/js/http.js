import originJSONP from 'jsonp'

export const jsonp = {
	jsonp:function(url,data,option){
		url = param(url,data);
		return new Promise((resolve,reject)=>{
			originJSONP(url,option,(err,data)=>{
				if(!err){
					resolve(data)
				}else{
					reject(err)
				}
			})
		})
	}
}


function param(url,data){
	let params='';
	for(let i in data){
		let value = data[i] !==undefined ?encodeURIComponent(data[i]):'';
		params += '&' + i + '=' + value;
	}
	if(url.indexOf('?') < 0){
		url += '?' + params;
	}else{
		if(url.substring(url.length-1) === '?'){
			url += params.substring(1);
		}else{
			url += params;
		}
	}
	return url;
}
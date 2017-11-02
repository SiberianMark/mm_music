export function addClass(el,className){
	if(!hasClass(el,className)){
		let classList = el.className.split(' ');
		classList.push(className);
		return classList.join(' ')
	}
};

export function hasClass(el,className){
	let reg = new RegExp('(^|\\s)'+className+'(^|\\s)');
	return reg.test(el.className)
}

export function getData(el,name,val){
	let prefix = "data-";
	name = prefix + name;
	if(el.getAttribute(name)){
		return el.getAttribute(name)
	}else{
		return el.setAttribute(name,val)
	}
}
let elemStyle = document.createElement('div').style

let vendor = (()=>{
	let transformNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		MS:'msTransform',
		standard: 'transform'
	}
	for (let k in transformNames){
		if(elemStyle[transformNames[k]] !== undefined){
			return k
		}
	}
	return false
})()

export function prefixStyle(style){
	if(vendor === false){
		return false
	}
	if(vendor === 'standard'){
		return style
	}
	return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
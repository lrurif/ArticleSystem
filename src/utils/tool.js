export const getTime = (time)=> {
    var currentTime = new Date();
    var articleTime = new Date(time);
    if(currentTime - articleTime < 60*1000) {
        return "刚刚";
    }else if(currentTime-articleTime<60*60*1000) {
        return Math.ceil((currentTime - articleTime)/(1000*60))+"分钟前";
    }else if(currentTime-articleTime<24*60*60*1000) {
    	return Math.ceil((currentTime - articleTime)/(1000*60*60))+"个小时前";
    }else if(currentTime-articleTime<3*24*60*60*1000) {
    	return Math.floor((currentTime - articleTime)/(1000*60*60*24))+"天前";
    }else if(currentTime-articleTime<365*24*60*60*1000) {
    	return `${articleTime.getMonth()+1}月${articleTime.getDate()}日`;
    }else {
    	return `${articleTime.getFullYear()}年${articleTime.getMonth()+1}月${articleTime.getDate()}日`;
    }
}
export const debounce = (func, time) => {
    var timer = null;
    return function() {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(()=> {
            func.call(this);
        }, time);
    }
    
}
export const throttle = (fName, time) => {
    var timer = null;
    return function () {
        if(timer) return;
        timer = setTimeout(()=> {
            this[fName]();
            timer = null;
        }, time)
    }
}
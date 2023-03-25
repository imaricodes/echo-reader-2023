

export const browserDeviceDetection = () => { 
    let isChrome = null;
    navigator.userAgent.indexOf("Chrome") != -1 ? isChrome = true : isChrome = false;
    return isChrome
}


function getOS() {
    var userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return "iOS";
    }
    if (/Macintosh/.test(userAgent)) {
        return "Mac OS";
    }
    if (/Windows/.test(userAgent)) {
        return "Windows";
    }
    if (/Linux/.test(userAgent)) {
        return "Linux";
    }

    return "unknown";
}
function getBrowser() {
    var userAgent = navigator.userAgent;
    var browserName = "unknown";

    if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Mozilla Firefox";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        browserName = "Opera";
    } else if (userAgent.indexOf("Trident") > -1) {
        browserName = "Microsoft Internet Explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
        browserName = "Microsoft Edge";
    } else if (userAgent.indexOf("Chrome") > -1) {
        browserName = "Google Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Safari";
    }

    return browserName;
}
function getDeviceType() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (width <= 767) {
        return "Mobile";
    } else if (width <= 1024) {
        return "Tablet";
    } else {
        return "Desktop";
    }
}
export function getDeviceInfo() {
    return {
        os: getOS(),
        browser: getBrowser(),
        deviceType: getDeviceType()
    };
}


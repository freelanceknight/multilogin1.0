var f = {};
/** @type {Array} */
var g = [];
/** @type {Array} */
var l = [];
m("");
chrome.browserAction.onClicked.addListener(function () {
    n++;
    var option = {};
    option.use = n;
    chrome.storage.sync.set(option);
    chrome.tabs.create({}, function (props) {
        p(props.id, props.id + "_@@@_");
    });
});
var q;
var n;
var r;
var s;
var t;
var u;
chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.sync.get("date", function (o) {
        q = o.date;
        if (!q) {
            /** @type {number} */
            q = (new Date).getTime();
            /** @type {number} */
            o.date = q;
            chrome.storage.sync.set(o);
        }
    });
    chrome.storage.sync.get("use", function (c) {
        n = c.use;
        if (!n) {
            /** @type {number} */
            n = 0;
            /** @type {number} */
            c.use = n;
            chrome.storage.sync.set(c);
        }
    });
    chrome.storage.sync.get("uid", function (s) {
        r = s.uid;
        if (!r) {
            r = w();
            s.uid = r;
            chrome.storage.sync.set(s);
        }
    });
    chrome.storage.local.get("mid", function (m) {
        if (!m.mid) {
            m.mid = w();
            chrome.storage.local.set(m);
        }
        s = m.mid;
        if (!document.cookie) {
            /** @type {string} */
            document.cookie = "cuid=" + s + ";max-age=15552000";
        }
    });
    chrome.storage.local.get("orgVersion", function (data) {
        if (!data.orgVersion) {
            data.orgVersion = chrome.runtime.getManifest().version;
            chrome.storage.local.set(data);
        }
        t = data.orgVersion;
    });
    chrome.storage.local.get("mid", function (m) {
        if (!m.mid) {
            m.mid = w();
            chrome.storage.local.set(m);
        }
        s = m.mid;
        if (!document.cookie) {
            /** @type {string} */
            document.cookie = "cuid=" + s + ";max-age=15552000";
        }
    });
    chrome.storage.local.get("install", function (exports) {
        u = exports.install;
    });
    chrome.storage.sync.get(function () {
        x(details);
    });
});

/**
 * @param {Object} args
 * @return {undefined}
 */
function x(args) {
    if ("update" === args.reason) {
        if (args.previousVersion != chrome.runtime.getManifest().version) {
//            y(args.reason + "&ce_previousVersion=" + args.previousVersion);
        }
    }
    if (!("install" !== args.reason)) {
        if (!(0 != ((new Date).getTime() - q) / 864E5 << 0 || u)) {
            chrome.tabs.query({
                url: "https://chrome.google.com/webstore*"
            }, function (params) {
                if (params && params[0]) {
                    var param = params[0];
                    if (param.openerTabId) {
                        chrome.tabs.get(param.openerTabId, function ($location) {
//                            y("install&ce_url=" + param.url + "&ce_referrer=" + $location.url);
                        });
                    } else {
//                        y("install&ce_url=" + param.url);
                    }
                } else {
//                    y("install");
                }
            });
        }
    }
}

/**
 * @return {?}
 */
function w() {
    return ("000000000000" + (Math.random() * Math.pow(36, 12)).toString(36)).substr(-12);
}

/**
 * @param {string} value
 * @return {undefined}
 */
function m(value) {
    chrome.cookies.getAll({}, function (map) {
        var letter;
        for (letter in map) {
            var m = map[letter];
            var name = m.name;
            if (!(null === value && 0 < name.indexOf("@@@"))) {
                if (!("" === value && -1 == name.indexOf("@@@"))) {
                    if (!(value && name.substring(0, value.length) != value)) {
                        chrome.cookies.remove({
                            url: (m.secure ? "https://" : "http://") + m.domain + m.path,
                            name: name
                        }, function () {
                        });
                    }
                }
            }
        }
    });
}

/**
 * @return {undefined}
 */
function z() {
    chrome.cookies.getAll({}, function (attrs) {
        var key;
        for (key in attrs) {
            var val = attrs[key].name;
            if (!(0 > val.indexOf("_@@@_"))) {
                for (key in val = val.substr(0, val.indexOf("_@@@_")) + "_@@@_", g) {
                    if (g[key] == val) {
                        return;
                    }
                }
            }
        }
    });
}

chrome.tabs.onReplaced.addListener(function (f, n) {
    var c = A(n);
    p(f, c);
    delete g[n];
    B(f, c);
});
chrome.tabs.onRemoved.addListener(function (n) {
    a: {
        var val = A(n);
        if (val) {
            delete g[n];
            var key;
            for (key in g) {
                if (g[key] == val) {
                    break a;
                }
            }
            m(val);
        }
    }
    delete l[n];
});
chrome.tabs.onUpdated.addListener(function (i, dataAndEvents, jqXHR) {
    if ("loading" == jqXHR.status) {
        p(i, A(i));
    }
});
chrome.tabs.onCreated.addListener(function (c) {
    if (c) {
        var i = c.id;
        if (i && !(0 > i)) {
            if (!c.openerTabId) {
                var cl = c.windowId;
                if (C && (D && C != cl)) {
                	
                    cl = A(D);
                    p(i, cl);
                    /** @type {boolean} */
                    l[i] = true;
                    return;
                }
            }
            
            var url = "";
            if (c.pendingUrl)
            	url = c.pendingUrl;
            else
            	url = c.url;
            
            if (c.openerTabId && "chrome" != url.substr(0, 6)) {
                cl = A(c.openerTabId);
                p(i, cl);
                if ("undefined" === typeof l[i]) {
                    l[i] = c.openerTabId;
                }
            } else {
                /** @type {boolean} */
                l[i] = true;
            }
        }
    }
});
var C;
chrome.windows.getCurrent({}, function (ignores) {
    E(ignores.id);
});
chrome.windows.onFocusChanged.addListener(function (deepDataAndEvents) {
    E(deepDataAndEvents);
});

/**
 * @param {number} deepDataAndEvents
 * @return {undefined}
 */
function E(deepDataAndEvents) {
    if (deepDataAndEvents && deepDataAndEvents > -1) {
        chrome.windows.get(deepDataAndEvents, {}, function (row) {
            if (row) {
                if ("normal" == row.type) {
                    /** @type {number} */
                    C = deepDataAndEvents;
                    chrome.tabs.query({
                        active: true,
                        windowId: C
                    }, function (results) {
                        D = results[0].id;
                    });
                }
            }
        });
    }
}

var D;
chrome.tabs.onActiveChanged.addListener(function (dataAndEvents, existingTab) {
    E(existingTab.windowId);
});
chrome.webRequest.onBeforeRequest.addListener(function (r) {
    if ((r = r.tabId) && (!(0 > r) && (z(), "undefined" === typeof l[r]))) {
        /** @type {number} */
        r = 0;
        /** @type {number} */
        var g = (new Date).getTime();
        for (; 500 > r - g; r = (new Date).getTime()) {
        }
    }
}, {
    urls: ["http://*/*", "https://*/*"],
    types: ["main_frame"]
}, ["blocking", "requestBody"]);
chrome.webRequest.onBeforeSendHeaders.addListener(function (data) {
    var key = data.tabId;
    if (key && !(0 > key)) {
        var a = A(key);
        var url = data.url;
        var headers = data.requestHeaders;
        /** @type {string} */
        var c = "";
        if ("https://translate.googleapis.com/translate_static/img/loading.gif" != url.substring(0, 65)) {
            if ("main_frame" == data.type) {
                /** @type {boolean} */
                f[key] = false;
                if (url && 0 == url.indexOf("https://accounts.google.com/")) {
                    var retValue;
                    var i;
                    for (i in headers) {
                        if ("Referer" == headers[i].name) {
                            retValue = headers[i].value;
                            break;
                        }
                    }
                    if (retValue) {
                        if (0 == retValue.indexOf("https://accounts.google.com/")) {
                            if (0 < retValue.indexOf("chrome.google.com")) {
                                /** @type {boolean} */
                                f[key] = true;
                                /** @type {string} */
                                a = "";
                            }
                        }
                    }
                }
                if (url) {
                    if (0 == url.indexOf("https://accounts.google.com/")) {
                        if (0 < url.indexOf("chrome.google.com")) {
                            /** @type {boolean} */
                            f[key] = true;
                            /** @type {string} */
                            a = "";
                        }
                    }
                }
                if (0 == url.indexOf("https://chrome.google.com/webstore")) {
                    /** @type {boolean} */
                    f[key] = true;
                    /** @type {string} */
                    a = "";
                }
            }
            for (i in headers) {
                if ("cookie" === headers[i].name.toLowerCase()) {
                    if (!a && -1 == headers[i].value.indexOf("_@@@_")) {
                        return;
                    }
                    data = headers[i].value.split("; ");
                    var k;
                    for (k in data) {
                        key = data[k].trim();
                        if (a) {
                            if (key.substring(0, a.length) != a) {
                                continue;
                            }
                        } else {
                            if (-1 < key.indexOf("_@@@_")) {
                                continue;
                            }
                        }
                        if (0 < c.length) {
                            c += "; ";
                        }
                        c = a ? c + key.substring(a.length) : c + key;
                    }
                    headers.splice(i, 1);
                }
            }
            if (0 < c.length) {
                headers.push({
                    name: "Cookie",
                    value: c
                });
            }
            return {
                requestHeaders: headers
            };
        }
    }
}, {
    urls: ["http://*/*", "https://*/*"]
}, ["blocking", "requestHeaders", "extraHeaders"]);
chrome.webRequest.onHeadersReceived.addListener(function (data) {
    var key = data.tabId;
    if (key && !(0 > key)) {
        var val = A(key);
        if ("" != val) {
            var url = data.url;
            data = data.responseHeaders;
            if (!f[key] && "https://translate.googleapis.com/translate_static/img/loading.gif" != url.substring(0, 65)) {
                var k;
                for (k in data) {
                    if ("set-cookie" == data[k].name.toLowerCase()) {
                        data[k].value = val + data[k].value;
                    }
                }
                return {
                    responseHeaders: data
                };
            }
        }
    }
}, {
    urls: ["http://*/*", "https://*/*"]
}, ["blocking", "responseHeaders", "extraHeaders"]);
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    var tabId = details.tabId;
    if (tabId && (!(0 > tabId) && A(tabId))) {
        return {
            redirectUrl: details.url.replace("https://mail.google.com/mail/ca/", "https://mail.google.com/mail/")
        };
    }
}, {
    urls: ["https://mail.google.com/mail/ca/*"]
}, ["blocking", "requestBody"]);
chrome.webRequest.onHeadersReceived.addListener(function (details) {
    var tabId = details.tabId;
    if (tabId && !(0 > tabId)) {
        return details.responseHeaders.push({
            name: "6",
            value: A(tabId)
        }), {
            responseHeaders: details.responseHeaders
        };
    }
}, {
    urls: ["https://translate.googleapis.com/translate_static/img/loading.gif"]
}, ["blocking", "responseHeaders", "extraHeaders"]);
chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
    var tabId = details.tabId;
    if (!(!tabId || (0 > tabId || (!A(tabId) || 0 < details.frameId)))) {
        try {
            chrome.tabs.sendMessage(tabId, {
                type: 5
            });
        } catch (c) {
        }
    }
}, {
    urls: ["http://*/*", "https://*/*"]
});
chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (statement) {
        if (3 == statement.type) {
            if (port.sender.tab) {
                port.postMessage({
                    type: 4,
                    profile: A(port.sender.tab.id)
                });
            }
        }
    });
});

/**
 * @param {?} key
 * @return {?}
 */
function A(key) {
    if (!(1 > key)) {
        return f[key] || !g[key] ? "" : g[key];
    }
}

/**
 * @param {number} f
 * @param {string} c
 * @return {undefined}
 */
function p(f, c) {
    if (c) {
        /** @type {string} */
        g[f] = c;
        B(f, c);
    }
}

/**
 * @param {number} a
 * @param {string} x
 * @return {undefined}
 */
function B(a, x) {
    if ("undefined" !== typeof x) {
        var expectedSerialization = {
            text: x.substr(0, x.indexOf("_@@@_")),
            tabId: a
        };
        chrome.browserAction.setBadgeBackgroundColor({
            color: "#006600",
            tabId: a
        });
        chrome.browserAction.setBadgeText(expectedSerialization);
    }
}

/**
 * @param {?} e
 * @return {undefined}
 */
function F(e) {
    var file = e.pageUrl;
    if (e.linkUrl) {
        file = e.linkUrl;
    }
    chrome.tabs.create({
        url: file
    }, function (props) {
        p(props.id, props.id + "_@@@_");
    });
}

chrome.contextMenus.create({
    title: "Duplicate Page in New Identity",
    contexts: ["page", "image"],
    /** @type {function (?): undefined} */
    onclick: F
});
chrome.contextMenus.create({
    title: "Open Link in New Identity",
    contexts: ["link"],
    /** @type {function (?): undefined} */
    onclick: F
});

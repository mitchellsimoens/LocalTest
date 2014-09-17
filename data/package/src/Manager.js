Ext.define('MockData.Manager', {
    singleton : true,

    uses : [
        'MockData.SimXhr',
        'MockData.endpoints.*'
    ],

    urlRegex   : /([^?#]*)(#.*)?$/,
    dateRegex  : /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/,
    intRegex   : /^[+-]?\d+$/,
    floatRegex : /^[+-]?\d+\.\d+$/,

    endpoints : {},

    regexs : {},

    register : function(method, url, fn, scope) {
        var endpoint = this.getEndpoint(method);

        if (method === 'direct') {
            return this.registerDirect(endpoint, url, fn, scope);
        }

        this.doRegister(endpoint, url, fn, scope);
    },

    getEndpoint : function(method) {
        var endpoint = this.endpoints[method];

        if (!endpoint) {
            endpoint = this.endpoints[method] = {};
        }

        return endpoint;
    },

    getUrlConfig : function(method, url) {
        var endpoint = this.getEndpoint(method),
            regexs   = this.regexs,
            config,
            regexUrl, regex;

        if (endpoint) {
            config = endpoint[url];

            if (!config) {
                for (regexUrl in regexs) {
                    regex = regexs[regexUrl];

                    if (regex.matcherRegex.test(url)) {
                        config = endpoint[regexUrl];

                        if (config) {
                            config.regex = regex;

                            break;
                        }
                    }
                }
            }

            if (config) {
                return config;
            } else if (!config && method !== '*') {
                return this.getUrlConfig('*', url);
            }
        }
    },

    registerDirect : function(endpoint, url, fn, scope) {
        var actions = Ext.app.REMOTING_API.actions,
            fnName, obj;

        if (!actions[url]) {
            actions[url] = [];
        }

        for (fnName in fn) {
            obj = fn[fnName];

            if (Ext.isFunction(obj)) {
                obj = {
                    fn : obj
                };
            }

            if (!Ext.isDefined(obj.len)) {
                obj.len = obj.fn.length;
            }

            obj.name = fnName;

            actions[url].push(obj);

            this.doRegister(endpoint, url + '.' + fnName, obj, scope);
        }
    },

    doRegister : function(endpoint, url, fn, scope) {
        var isFnObj = Ext.isObject(fn);

        if (url.indexOf(':') > -1) {
            var paramMatchingRegex = new RegExp(/:([0-9A-Za-z\_]*)/g),
                regex              = this.regexs[url] = {
                    paramMatchingRegex  : paramMatchingRegex,
                    paramsInMatchString : url.match(paramMatchingRegex) || [],
                    conditions          : isFnObj && fn.conditions ? fn.conditions : {},
                    caseInsensitive     : true
                };

            regex.matcherRegex = this.createMatcherRegex(url);
        }

        endpoint[url] = {
            fn    : fn,
            url   : url,
            delay : this.getDelay(fn),
            scope : scope
        };
    },

    getXhr : function(method, url, options, async) {
        var parsedUrl = url.split('?').shift(),
            endpoint  = this.getUrlConfig(method, parsedUrl),
            xhr;

        if (endpoint) {
            xhr = new MockData.SimXhr({
                async    : async,
                endpoint : endpoint,
                url      : parsedUrl,
                method   : method,
                params   : Ext.apply({}, options.params, this.parseQueryString(url))
            });

            return xhr;
        }
    },

    getDirect : function(transaction) {
        var endpoint = this.getEndpoint('direct'),
            action   = transaction.getAction ? transaction.getAction() : transaction.action,
            method   = transaction.getMethod ? transaction.getMethod() : transaction.method;

        return endpoint[action + '.' + method];
    },

    getDelay : function(obj) {
        return obj.delay;
    },

    parseQueryString : function(str) {
        var m   = this.urlRegex.exec(str),
            ret = {},
            pair, parts,
            key, value, i, n;

        if (m && m[1]) {
            parts = m[1].split('&');

            for (i = 0, n = parts.length; i < n; ++i) {
                if ((pair = parts[i].split('='))[0]) {
                    key   = decodeURIComponent(pair.shift());
                    value = this.parseParamValue((pair.length > 1) ? pair.join('=') : pair[0]);

                    if (!(key in ret)) {
                        ret[key] = value;
                    } else if (Ext.isArray(ret[key])) {
                        ret[key].push(value);
                    } else {
                        ret[key] = [ret[key], value];
                    }
                }
            }
        }

        return ret;
    },

    parseParamValue : function(value) {
        var m;

        if (Ext.isDefined(value)) {
            value = decodeURIComponent(value);

            if (this.intRegex.test(value)) {
                value = parseInt(value, 10);
            } else if (this.floatRegex.test(value)) {
                value = parseFloat(value);
            } else if (!!(m = this.dateRegex.test(value))) {
                value = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]));
            }
        }

        return value;
    },

    createMatcherRegex : function(url) {
        var regex               = this.regexs[url],
            paramsInMatchString = regex.paramsInMatchString,
            conditions          = regex.conditions,
            i                   = 0,
            len                 = paramsInMatchString.length,
            modifiers           = regex.caseInsensitive ? 'i' : '',
            params, cond, matcher;

        for (; i < len; i++) {
            params  = paramsInMatchString[i];
            cond    = conditions[params];
            matcher = cond || '([%a-zA-Z0-9\\-\\_\\s,]+)';

            url = url.replace(new RegExp(params), matcher);
        }

        //we want to match the whole string, so include the anchors
        return new RegExp('^' + url + '$', modifiers);
    }
}, function() {
    Ext.app = Ext.app || {};

    Ext.app.REMOTING_API = {
        url     : 'direct/router',
        type    : 'remoting',
        actions : {}
    };
});

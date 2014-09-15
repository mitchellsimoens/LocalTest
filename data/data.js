Ext.define('MockData.endpoints.Grid', {
    extend    : 'MockData.Endpoint',
    singleton : true,

    endpoints : {
        /**
         * This is the method of loading, GET, POST, PUT, etc. Wildcard `*` is accepted. `direct` will be registered
         * as an Ext.Direct api automatically.
         *
         * These can be either a function or an object. An object can specify delay, status, statusText, fn or init.
         *
         * The difference between fn and init is that init is executed when the endpoint is registered. This is a great
         * place to create data upfront for paging/buffering so that the fn method can simply return the page.
         *
         * In a direct endpoint, the len config of the endpoint can be specified or it will be automatically set by
         * number of parameters you specify using `fn.length`.
         */
        '*'    : {
            'data.json'     : {
                delay      : 500,
                status     : 200,
                statusText : 'Ok',
                fn         : function(params, endpoint) {
                    var data = endpoint.data;

                    return {
                        success : true,
                        total   : data.length,
                        data    : data.slice(params.start, params.limit * params.page)
                    };
                },
                init       : function() {
                    var obj    = {
                            firstName : 'Mitchell',
                            lastName  : 'Simoens'
                        },
                        i      = 0,
                        length = 100,
                        data   = [],
                        tmp;

                    for (; i < length; i++) {
                        tmp = Ext.clone(obj);

                        tmp.i = i;

                        data.push(tmp);
                    }

                    this.data = data;
                }
            }
        },
        'direct' : {
            FooAction : {
                getUsers  : {
                    delay : 500,
                    fn    : function(params) {
                        return {
                            success : true,
                            total   : 1,
                            data    : [
                                {
                                    i         : 0,
                                    firstName : 'Mitchell',
                                    lastName  : 'Simoens'
                                }
                            ]
                        };
                    }
                }
            }
        }
    }
});

Ext.define('MockData.endpoints.Grid', {
    extend    : 'MockData.Endpoint',
    singleton : true,

    endpoints : {
        '*' : {
            'data.json'  : {
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
            },
            'buffered.json' : {
                fn   : function(params, endpoint) {
                    var data = endpoint.data;

                    return {
                        success : true,
                        total   : data.length,
                        data    : data.slice(params.start, params.limit * params.page)
                    };
                },
                init : function() {
                    var obj   = {
                            firstName : 'Mitchell',
                            lastName  : 'Simoens'
                        },
                        i      = 0,
                        length = 50000,
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
        'GET' : {
            'users.xml' : {
                fn : function() {
                    return '<?xml version="1.0" encoding="UTF-8"?>' +
                    '<users>' +
                        '<user>' +
                            '<i>1</i>' +
                            '<firstName>Mitchell</firstName>' +
                            '<lastName>Simoens</lastName>' +
                        '</user>' +
                        '<user>' +
                            '<i>2</i>' +
                            '<firstName>Seth</firstName>' +
                            '<lastName>Lemmons</lastName>' +
                        '</user>' +
                    '</users>';
                }
            },
            'users_tpl.xml' : {
                tpl : '<?xml version="1.0" encoding="UTF-8"?>' +
                '<users>' +
                    '<tpl for=".">' +
                        '<user>' +
                            '<i>{i}</i>' +
                            '<firstName>{firstName}</firstName>' +
                            '<lastName>{lastName}</lastName>' +
                        '</user>' +
                    '</tpl>' +
                '</users>',
                fn  : function() {
                    return [
                        {
                            i         : 1,
                            firstName : 'Mitchell',
                            lastName  : 'Simoens'
                        },
                        {
                            i         : 2,
                            firstName : 'Seth',
                            lastName  : 'Lemmons'
                        }
                    ];
                }
            },
            'jsonp_test' : function() {
                return {
                    foo : 'bar'
                };
            }
        },
        'POST' : {
            'post_test' : {
                type : 'string',
                fn   : function() {
                    return 'Just a test!';
                }
            }
        }
    }
});

Ext.define('MockData.endpoints.Direct', {
    extend    : 'MockData.Endpoint',
    singleton : true,

    endpoints : {
        'direct' : {
            FooAction : {
                getUsers2 : function(params) {
                    return {
                        success : true,
                        total   : 1,
                        data    : [
                            {
                                i         : 1,
                                firstName : 'Mitch',
                                lastName  : 'Simoens'
                            }
                        ]
                    };
                },
                getUsers : {
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

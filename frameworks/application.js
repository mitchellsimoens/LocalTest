if (!Ext.application) {
    Ext.application = function(config) {
        Ext.require('Ext.app.*');

        Ext.onReady(function() {
            Ext.application(config);
        });
    };
}

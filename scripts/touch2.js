Ext.Loader.setConfig({
    enabled        : true,
    disableCaching : true,
    paths          : {
        'Ext.ux' : window.demoConfigs.jsHttpPath + 'src/ux'
    }
});

Ext.require([
    'Ext.carousel.Carousel',
    'Ext.Map',
    'Ext.util.*',
    'Ext.tab.*',
    'Ext.data.*',
    'Ext.dataview.*',
    'Ext.field.*',
    'Ext.form.*',
    'Ext.field.*',
    'Ext.MessageBox',
    'Ext.app.*',
    'Ext.plugin.*',
    'Ext.Label',
    'Ext.Img',
    'Ext.Sheet',
    'Ext.util.Geolocation',
    'Ext.SegmentedButton',
    'Ext.navigation.*',
    'Ext.MessageBox',
    //'Ext.Anim',
    //'Ext.chart.*',
    //'Ext.draw.Component',
    'Ext.direct.*',
    //'Ext.Menu',
    'Ext.Audio',
    'Ext.Video'
]);

Ext.application({
    name : 'Fiddle',

    launch : function() {

        Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

        FooAction.getUsers({}, function(data) {
            console.log(data);
        });

        Ext.Ajax.request({
            url : 'data.json'
        });

    }
});

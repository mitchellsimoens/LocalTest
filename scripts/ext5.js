Ext.Loader.setPath({
    'Ext.ux' : window.demoConfigs.jsHttpPath + 'examples/ux/'
});

Ext.require([
    'Ext.tip.*',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    //'Ext.draw.*',
    //'Ext.chart.*',
    'Ext.tree.*',
    'Ext.tab.*',
    'Ext.form.field.*',
    'Ext.form.*',
    //'Ext.state.*',
    //'Ext.ux.BoxReorderer',
    //'Ext.ux.CheckColumn',
    //'Ext.ux.statusbar.StatusBar',
    //'Ext.ux.RowExpander',
    //'Ext.ux.form.MultiSelect',
    //'Ext.ux.form.ItemSelector',
    //'Ext.ux.data.PagingMemoryProxy',
    //'Ext.ux.DataView.Draggable',
    //'Ext.ux.GMapPanel',
    //'Ext.ux.form.MultiSelect',
    //'Ext.ux.ajax.SimManager',
    //'Ext.ux.TreePicker',
    //'Ext.ux.Spotlight',
    //'Ext.ux.IFrame',
    //'Ext.ux.layout.Center',
    //'Ext.ux.TabScrollerMenu',
    //'Ext.ux.PreviewPlugin',
    'Ext.layout.*',
    'Ext.selection.*',
    'Ext.window.*',
    'Ext.direct.*',
    'Ext.container.*'
]);

Ext.define('MyModel', {
    extend : 'Ext.data.Model',

    fields : [
        'firstName',
        'lastName'
    ]
});

Ext.application({
    name : 'Fiddle',

    launch : function() {

        new Ext.grid.Panel({
            plugins : 'viewport',
            title   : 'Grid Test',
            store   : {
                autoLoad : true,
                model    : 'MyModel',
                proxy    : {
                    type   : 'ajax',
                    url    : 'data.json',
                    reader : {
                        type         : 'json',
                        rootProperty : 'data'
                    }
                }
            },
            columns : [
                {
                    text      : 'First Name',
                    dataIndex : 'firstName',
                    flex      : 1
                },
                {
                    text      : 'Last Name',
                    dataIndex : 'lastName',
                    flex      : 1
                }
            ]
        });

    }
});

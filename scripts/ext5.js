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

Ext.application({
    name : 'Fiddle',

    launch : function() {

        var store = new Ext.data.Store({
            autoLoad : true,
            fields   : [
                'i', 'firstName', 'lastName'
            ],
            proxy    : {
                type   : 'ajax',
                url    : 'data.json',
                reader : {
                    type         : 'json',
                    rootProperty : 'data'
                }
            }
        });

        new Ext.grid.Panel({
            plugins : ['viewport'],
            store   : store,
            columns : [
                {
                    text      : 'Idx',
                    dataIndex : 'i',
                    width     : 75
                },
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
            ],
            bbar    : {
                xtype  : 'pagingtoolbar',
                store  : store
            }
        });

        Ext.Ajax.request({
            method : 'GET',
            url    : '/user/1',
            callback : function(options, success, result) {
                console.log(result.responseText);
            }
        });

    }
});

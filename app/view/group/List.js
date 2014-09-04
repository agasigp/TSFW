Ext.define('extjs4.view.group.List' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.grouplist',
    requires: [
        'Ext.toolbar.Paging',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.ux.grid.FiltersFeature'
    ],
    title: 'Group List',
    store: 'group.Groups',
    selType: 'checkboxmodel',
    
    features: {
        ftype: 'filters',
        encode: true
    },
    
    initComponent: function() {
        this.callParent(arguments);
    },

    columns: [
        {xtype: 'rownumberer'},
        {header: 'Name', width: 100, dataIndex: 'name', filterable: true},
        {header: 'Description', width: 150, dataIndex: 'description'},
        {
            xtype:'actioncolumn',  //8
            width:50,
            items: [{
                iconCls: 'icon-delete', 
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex, node, e, record, rowNode) {
                    this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, record, node);
                }
            }]
        }
    ],
    
//    items: {
    tbar: [
        { xtype: 'button', iconCls: 'icon-add', action: 'add'},
        { xtype: 'button', iconCls: 'icon-delete', action: 'delete'},'-',
        { xtype: 'button', iconCls: 'icon-printer' },
        { xtype: 'button', iconCls: 'icon-report' }
    ],
    
    bbar:
        {
            xtype: 'pagingtoolbar',
            store: 'group.Groups',
            displayInfo: true,
            displayMsg: 'Displaying items {0} - {1} of {2}',
            emptyMsg: "No items to display"
        }
    
});
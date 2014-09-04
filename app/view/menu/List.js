Ext.define('extjs4.view.menu.List' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.menulist',
    requires: [
        'Ext.toolbar.Paging',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.RowNumberer',
//        'Ext.grid.plugin.RowEditing',
        'Ext.form.field.Checkbox',
        'Ext.grid.column.Boolean',
        'Ext.grid.column.Action'
    ],   
    store: 'menu.Menus',
    selType: 'checkboxmodel',
    
//    plugins: {
//        ptype: 'rowediting'
//    },
    features: {
        ftype: 'filters',
        encode: true
    },
    
    initComponent: function() {
        this.callParent(arguments);
    },

    columns: [
        {xtype: 'rownumberer'},
        {header: 'Name', width: 100, dataIndex: 'name', editor: 'textfield', filterable: true},
        {header: 'Parent', width: 75, dataIndex: 'parent', editor: 'textfield'},
	{header: 'Order No', width: 75, dataIndex: 'order', editor: 'textfield'},
        {header: 'Menu Display', width: 100, dataIndex: 'text', editor: 'textfield', filterable: true},
        {header: 'Expanded', width: 75, dataIndex: 'expanded', xtype: 'booleancolumn', trueText: 'Yes', falseText: 'No', editor: 'checkbox'},
        {header: 'Leaf', width: 75, dataIndex: 'leaf', xtype: 'booleancolumn', trueText: 'Yes', falseText: 'No', editor: 'checkbox'},
        {header: 'Xtype', width: 100, dataIndex: 'xtype', editor: 'textfield'},
        {header: 'Icon', width: 100, dataIndex: 'icon', editor: 'textfield'},
	{header: 'Groups', width: 100, dataIndex: 'groups'},
        
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
            store: 'menu.Menus',
            displayInfo: true,
            displayMsg: 'Displaying items {0} - {1} of {2}',
            emptyMsg: "No items to display"
        }
    
});
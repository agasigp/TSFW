Ext.define('extjs4.view.user.List' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlist',
    requires: [
        'Ext.toolbar.Paging',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.RowNumberer',        
        'Ext.grid.column.Boolean',
        'Ext.grid.column.Action',
        'Ext.ux.grid.FiltersFeature'
    ],
    title: 'User List',
    store: 'user.Users',
    selType: 'checkboxmodel',

    features: {
        ftype: 'filters',
        encode: true
    },
    
    initComponent: function() {
	this.tbar =  [
	    { xtype: 'button', iconCls: 'icon-add', action: 'add', text: 'Add'},
	    { xtype: 'button', iconCls: 'icon-delete', action: 'delete', text: 'Delete'},'-',
	    { xtype: 'button', iconCls: 'icon-printer' },
	    { xtype: 'button', iconCls: 'icon-report' }
	];
    
	this.bbar = 
        {
            xtype: 'pagingtoolbar',
            store: 'user.Users',
            displayInfo: true,
            displayMsg: 'Displaying items {0} - {1} of {2}',
            emptyMsg: "No items to display"
        };
        this.callParent(arguments);
    },

    columns: [
        {xtype: 'rownumberer'},
        {header: 'Username', width: 100, dataIndex: 'username',filterable: true},
        {header: 'Email', width: 150, dataIndex: 'email',filterable: true},
        {header: 'First Name', width: 150, dataIndex: 'first_name',filterable: true},
        {header: 'Last Name', width: 150, dataIndex: 'last_name',filterable: true},
        {header: 'Phone', width: 150, dataIndex: 'phone',filterable: true},
        {header: 'Active', width: 150, dataIndex: 'active',filterable: true},
        {header: 'Group', width: 150, dataIndex: 'groups'},
        
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
    ]
    
});
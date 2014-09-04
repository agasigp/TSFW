Ext.define('extjs4.view.menu.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.menuedit',
    requires: ['Ext.form.Panel'],
    title: 'Edit Menu',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            items: [
                {
                    xtype: 'textfield',
                    name : 'name',
                    fieldLabel: 'Name'
                },    
		{
                    xtype: 'textfield',
                    name : 'parent',
                    fieldLabel: 'Parent'
                },
		{
                    xtype: 'textfield',
                    name : 'order',
                    fieldLabel: 'Order No'
                },
                {
                    xtype: 'textfield',
                    name : 'text',
                    fieldLabel: 'Menu Display'
                },
		{
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Groups',
                    // Arrange checkboxes into two columns, distributed vertically
                    columns: 2,
                    horizontal: true                    
                },
                {
                    xtype: 'checkbox',
                    name : 'expanded',
                    fieldLabel: 'Expanded',
                    inputValue: true
                },
                {
                    xtype: 'checkbox',
                    name : 'leaf',
                    fieldLabel: 'Leaf',
                    inputValue: true
                },
                {
                    xtype: 'textfield',
                    name : 'xtype',
                    fieldLabel: 'Xtype'
                },
                {
                    xtype: 'textfield',
                    name : 'icon',
                    fieldLabel: 'Icon'
                }
		
            ]
        }];
        
        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];
        
        this.callParent(arguments);
    }
    
});
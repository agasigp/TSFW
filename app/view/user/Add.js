Ext.define('extjs4.view.user.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.useradd',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.form.CheckboxGroup'
    ],
    title: 'Add User',
    layout: 'fit',
    width: 300,
    autoShow: true,

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            items: [
                {
                    xtype: 'textfield',
                    name : 'username',
                    fieldLabel: 'Username'
                },
                {
                    xtype: 'textfield',
                    name : 'password',
                    fieldLabel: 'Password',
                    inputType: 'password'
                },                
                {
                    xtype: 'textfield',
                    name : 'email',
                    fieldLabel: 'Email'
                },
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Groups',
                    // Arrange checkboxes into two columns, distributed vertically
                    columns: 2,
                    horizontal: true                    
                },
                {
                    xtype: 'textfield',
                    name : 'first_name',
                    fieldLabel: 'First Name'
                },
                {
                    xtype: 'textfield',
                    name : 'last_name',
                    fieldLabel: 'Last Name'
                },
                {
                    xtype: 'textfield',
                    name : 'phone',
                    fieldLabel: 'Phone'
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
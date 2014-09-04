Ext.define('extjs4.view.user.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.useredit',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.form.CheckboxGroup'
    ],
    title: 'Edit User',
    layout: 'fit',
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
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Groups',
                    // Arrange checkboxes into two columns, distributed vertically
                    columns: 2,
                    horizontal: true                    
                },
                {
                    xtype: 'textfield',
                    name : 'email',
                    fieldLabel: 'Email'
                },
                {
                    xtype: 'checkbox',
                    name : 'active',
                    fieldLabel: 'Active',
                    inputValue: true,
                    uncheckedValue: false
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
//        console.log(this.down('combobox'));
    }
});
Ext.define('extjs4.view.group.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.groupadd',
    requires: ['Ext.form.Panel'],
    title: 'Add Group',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: 'Group'
                    },
                    {
                        xtype: 'textfield',
                        name : 'description',
                        fieldLabel: 'Description'
                    }
                ]
            }
        ];

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
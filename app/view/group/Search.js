Ext.define('extjs4.view.group.Search',{
    extend: 'Ext.form.Panel',
    alias: 'widget.groupsearch',
    requires: [
        'Ext.form.Panel',
        'Ext.layout.container.Column'
    ],
    title: 'Group Search',
    layout: {
        type: 'hbox'
//        align: 'stretch'
    },
    defaults: {
            border: false,
            xtype: 'panel',
            flex: 1,
            layout: 'anchor'
    },
    bodyStyle: 'padding:5px 5px 0',
    collapsible: true,
    collapsed: true,
    
    items: [{
        items: [{
            xtype:'textfield',
            fieldLabel: 'First Name',
            anchor: '-5',
            name: 'first'
        }, {
            xtype:'textfield',
            fieldLabel: 'Company',
            anchor: '-5',
            name: 'company'
        }]
    }, {
        items: [{
            xtype:'textfield',
            fieldLabel: 'Last Name',
            anchor: '100%',
            name: 'last'
        },{
            xtype:'textfield',
            fieldLabel: 'Email',
            anchor: '100%',
            name: 'email',
            vtype:'email'
        }]
    }],
    
    buttons: ['->', {
        text: 'Save'
    }, {
        text: 'Cancel'
    }]
});
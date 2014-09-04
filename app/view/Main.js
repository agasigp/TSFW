Ext.define('extjs4.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.panel.Panel',
        'extjs4.view.Header',
        'extjs4.view.menu.Menu',
        'extjs4.view.menu.Menu2',
        'Ext.layout.container.Border',
        'Ext.layout.container.Accordion'
    ],
    
    xtype: 'app-main',
    itemId: 'maincontainer',
    disabled: true,
    layout: {
        type: 'border'
    },

    items: [
        {
            region: 'north',
            xtype: 'header-app'
        },
        {
            region: 'west',
            xtype: 'panel',
            collapsible: true,
            title: 'Navigation',
            layout: {
                type: 'accordion'
            },
            items: [
                {
                    title: 'Menu',
                    xtype: 'main-menu'
                },
                {
                    title: 'Info',
                    xtype: 'main-menu2'
                }
            ],
            split: true,
            width: 200
        },
        {
            region: 'center',
            xtype: 'tabpanel',
            id: 'tabs',
            items:[
                {
                    id: 'main-tab',
                    title: 'Main Tab'
                }
            ]
        }
    ]
});
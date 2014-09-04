Ext.define('extjs4.view.group.Main',{
    extend: 'Ext.container.Container',
    alias: 'widget.group',
    requires: [
        'extjs4.view.group.List',
        'extjs4.view.group.Search'
    ],
    layout: 'vbox',
    
    items: [{
        xtype: 'groupsearch',
        width: '100%'
//        flex: 1
//        anchor: '100%'
    },{
        xtype: 'grouplist',
        width: '100%',
        flex: 1
    }]
});
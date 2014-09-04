Ext.define('extjs4.view.menu.Menu',{
    extend: 'Ext.tree.Panel',
    xtype: 'main-menu',
    alias: 'widget.menutree',
//    requires: ['extjs4.store.Files'],
    
    rootVisible: false,
    store: 'menu.MenuTrees',
    
    title: 'Menu'
    
});
Ext.define('extjs4.view.menu.Menu2',{
    extend: 'Ext.panel.Panel',
    xtype: 'main-menu2',
//    alias: 'widget.menutree',
//    requires: ['extjs4.store.Files'],
    
//    rootVisible: false,
//    store: 'Menu',
    
    title: 'Menu',
    bodyCls: 'menu-bg',
    html: '<center><img src="resources/images/report.png" class="img-prof"><br/><b>Username</b></center><br/><ul class="menu-list"><a href="#"><li><img src="resources/images/add.png"> Change Password</li></a><a href="#"><li id=logout><img src="resources/images/add.png"> Logout</li></a></ul>'
//    bodyStyle: 'padding:10px;',
    
//    items: {
//        html: 'Menu2'
//    }
    
});
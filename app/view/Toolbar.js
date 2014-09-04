Ext.define('extjs4.view.Toolbar',{
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'toolbar-app',
    requires: [
	'Ext.toolbar.Toolbar'
    ],
    
    items : [{
	text : 'Username',
	itemId: 'usernamebutton',
	menu : [
	    {text:'Profile',itemId: 'userprofile'},
	    {text:'Logout',itemId: 'userlogout'}
	]
    },{
	text: 'About',
	itemId: 'aboutbutton',
	menu: [
	    {text:'Help',itemId: 'menuhelp'},
	    {text:'About',itemId: 'menuabout'}
	]
    }]
});
/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.application({
    name: 'extjs4',
    requires : [
        'extjs4.view.Main'
    ],
    
    controllers: [
        'Main',
        'group.Groups',
        'menu.Menus',
        'user.Users'
    ],
    
    launch: function() {
	this.viewport = Ext.create('Ext.container.Viewport',{
	    layout: 'fit',
	    items: [{
		xtype: 'app-main'
	    }]
	}); 
    }
    
});

Ext.define('extjs4.controller.Main', {
    extend: 'Ext.app.Controller',
    
    views: [
	'extjs4.view.Login',
        'extjs4.view.menu.Menu'
    ],
    
    stores: ['menu.MenuTrees'],
    
    init: function() {
        this.control({
            'menutree': {
                itemclick: this.onLeafClick
            },
	    'app-main': {
		render: this.afterrender
	    }
        });
    },
    
    onLeafClick: function (view, record) {
        var tabs = Ext.getCmp('tabs'),
            activetabs = tabs.getComponent('tab-'+record.get('id'));
        
        if (record.isLeaf()) {
            if (activetabs) {
                tabs.setActiveTab(activetabs);
            } else {
                var tab = tabs.add({
                    itemId: 'tab-' + record.get('id'),
                    title: record.get('text'),
                    layout: 'fit',
                    items : {
                        xtype: record.get('xtype')
                    },
                    closable: true
                });
            
                tabs.setActiveTab(tab);
            }
            
        }
    },
	    
    afterrender: function() {
        Ext.Ajax.request({
            url: 'index.php/user/logged_in',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
//                console.log(obj.success);
                if (obj.success) {
                    Ext.ComponentQuery.query('app-main')[0].setDisabled(false);                    
                } else {
                    Ext.widget('login');               
                }
            },
            failure: function(response, opts) {
//                console.log('server-side failure with status code ' + response.status);
                Ext.Msg.show({
                    title:'Status',
                    msg: 'Server-side failure with status code ' + response.status,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        });	
    }
    
});
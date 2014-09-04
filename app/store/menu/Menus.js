Ext.define('extjs4.store.menu.Menus',{
    extend: 'Ext.data.Store',
    model: 'extjs4.model.menu.Menu',
//    autoLoad: true,
    minChars: 0,
    remoteFilter: true,
    remoteSort: true,
    pageSize: 5,
    sorters: [{
        property: 'name',
        direction: 'ASC'
    }],
    
    proxy: {
        type: 'ajax',
    
        api: {
            read: 'index.php?c=menu&f=menulist',
            update: 'index.php/menu/update',
            create: 'index.php/menu/add',
            destroy: 'index.php/menu/delete'
        },
        
        reader: {
            type: 'json',
            root: 'menus',
            totalProperty: 'total'
        },
        
        writer: {
            type: 'json',
            root: 'menu',
            encode: true
//            successProperty: 'success'
        },
        
        listeners: {
	    exception: function(proxy, exception, operation) {
//		console.log(exception.status);
                if (exception.response == 401) {
                    Ext.Msg.show({
                        title:'Warning!',
                        msg: exception.responseText,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.WARNING,
                        closable: false,
                        fn: function(button) {
                            if (button === 'ok') {
                                Ext.ComponentQuery.query('app-main')[0].setDisabled(true);
                                Ext.widget('login');                       
                            }
                        }
                    });
                } else if (exception.status == 500) {
                    Ext.Msg.show({
                        title:'Status',
                        msg: 'Save/Update/Delete failed!',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }                    
	    }
	}	
    }

});
Ext.define('extjs4.store.user.Users',{
    extend: 'Ext.data.Store',
    model: 'extjs4.model.user.User',
//    autoLoad: true,
    pageSize: 10,
    remoteFilter: true,
    remoteSort: true,
    sorters: [{
        property: 'username',
        direction: 'ASC'
    }],
    
    proxy: {
        type: 'ajax',
    
        api: {
            read: 'index.php?c=user&f=users',
            update: 'index.php/user/update',
            create: 'index.php/user/add',
            destroy: 'index.php/user/delete'
        },
        reader: {
            type: 'json',
            root: 'users',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            root: 'users',
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
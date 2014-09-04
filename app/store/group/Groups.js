Ext.define('extjs4.store.group.Groups',{
    extend: 'Ext.data.Store',
    model: 'extjs4.model.group.Group',
//    autoLoad: true,
    remoteFilter: true,
    remoteSort: true,
    sorters: [{
        property: 'name',
        direction: 'ASC'
    }],

    proxy: {
        type: 'ajax',
    
        api: {
            read: 'index.php/group/groups',
            update: 'index.php/group/update',
            create: 'index.php/group/add',
            destroy: 'index.php/group/delete'
        },
        reader: {
            type: 'json',
            root: 'groups',
            successProperty: 'success',
            totalProperty: 'total'
        },
        writer: {
            type: 'json',
            root: 'groups',
            encode: true,
            successProperty: 'success'
        },
	listeners: {
	    exception: function(proxy, exception, operation) {
		console.log(exception.status);
                if (exception.status == 401) {
                    Ext.Msg.show({
                        title:'Warning!',
                        msg: exception.statusText,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR,
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
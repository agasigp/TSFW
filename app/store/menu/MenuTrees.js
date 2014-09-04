Ext.define('extjs4.store.menu.MenuTrees',{
    extend: 'Ext.data.TreeStore',
    model: 'extjs4.model.menu.Menu',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
    
        api: {
            read: 'index.php?c=menu&f=menus'
//            update: 'index.php/group/update',
//            create: 'index.php/group/add',
//            destroy: 'index.php/group/delete'
        },
        reader: {
            type: 'json',
            root: 'menus'
//            successProperty: 'success',
//            totalProperty: 'total'
        }
    }

});
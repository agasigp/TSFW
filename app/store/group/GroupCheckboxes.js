Ext.define('extjs4.store.group.GroupCheckboxes',{
    extend: 'Ext.data.Store',
    model: 'extjs4.model.group.GroupCheckbox',
//    autoLoad: true,
    
    proxy: {
        type: 'ajax',
    
        api: {
            read: 'index.php/group/groupcheckbox'           
        },
        reader: {
            type: 'json',
            root: 'groupcheckboxes',
            totalProperty: 'total'
        }
    }
});
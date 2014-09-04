Ext.define('extjs4.model.group.Group',{
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'id',type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});
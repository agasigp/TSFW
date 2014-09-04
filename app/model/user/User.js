Ext.define('extjs4.model.user.User',{
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'id',type: 'int'},
        {name: 'groups_id',type: 'auto'},
        {name: 'groups',type: 'auto'},
        {name: 'username', type: 'string'},
        {name: 'password', type: 'string'},        
        {name: 'email', type: 'string'},
        {name: 'first_name', type: 'string'},
        {name: 'last_name', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'active', type: 'boolean'}
    ]
});
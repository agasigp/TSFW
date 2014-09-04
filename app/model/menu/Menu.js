Ext.define('extjs4.model.menu.Menu',{
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'id',type: 'int'},
        {name: 'parent', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'text', type: 'string'},
        {name: 'expanded', type: 'boolean'},
        {name: 'leaf', type: 'boolean'},
        {name: 'xtype', type: 'string'},
        {name: 'icon', type: 'string'},
	{name: 'order',type: 'int'},
	{name: 'groups'},
	{name: 'groups_id'}
    ]
});
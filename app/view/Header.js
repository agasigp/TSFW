Ext.define('extjs4.view.Header',{
    extend: 'Ext.container.Container',
    xtype: 'header-app',
    height: 70,
    requires: [
	'Ext.Component',
	'extjs4.view.Toolbar',
	'Ext.layout.container.VBox'
    ],    
    layout: {
	type: 'vbox'
    },
    
    items: [{
	xtype: 'component',
	html: '<p>Header app</p>',
	width: '100%',
	flex: 1
    },{
	xtype: 'toolbar-app',
	width: '100%',
	flex: 0
    }]
});
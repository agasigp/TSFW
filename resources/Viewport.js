Ext.define('extjs4.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires:[
        'Ext.layout.container.Card',
        'extjs4.view.Main',
	'extjs4.view.Login'
    ],

    layout: {
        type: 'card'
    },

    items: [{
        xtype: 'app-main'
    }]
});

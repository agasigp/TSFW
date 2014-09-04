Ext.define('extjs4.view.Login',{
    extend: 'Ext.window.Window',
    alias: 'widget.login',
    title: 'Login',    
    width: 300,
    autoShow: true,
    closable: false,
    resizable: false,
    border: false,
    requires: ['Ext.form.Panel'],
    
    initComponent: function() {
        this.callParent(arguments);
    },
	    
    items: [{
	xtype: 'form',
	bodyPadding: 5,
	layout: 'anchor',
	frame: true,
	url: 'index.php/user/login',
	defaults: {
	    anchor: '100%'
	},
	
	items: [{ 
	    xtype: 'textfield',
	    fieldLabel: 'Username', 
	    name: 'username', 
	    allowBlank: false 
	},{ 
	    xtype: 'textfield',
	    fieldLabel: 'Password', 
	    name: 'password', 
	    inputType: 'password', 
	    allowBlank: false,
	    enableKeyEvents: true,
	    listeners: {	
		keypress:function(textfield, e) {
		    if (e.button == 12) {
//			doLogin();
		    }
		}
	    }
	}],
    
	buttons:[{ 
	    text: 'Login',
	    formBind: true,
	    disabled: true,
	    action: 'login'
	}]
    }]
});
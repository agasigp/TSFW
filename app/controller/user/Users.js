Ext.define('extjs4.controller.user.Users', {
    extend: 'Ext.app.Controller',
    stores: [
        'user.Users',
        'group.GroupCheckboxes'
    ],
    models: ['user.User'],
    views: [
	'Login',
	'Toolbar',
	'user.List',
	'user.Add',
	'user.Edit',
	'user.UserProfile'
    ],
    
    init: function() {
        this.control({
            'userlist': {
                itemdblclick: this.editUser,
		beforeadd: this.loadUser
            },
            'userlist > toolbar button[action=add]': {
                click: this.addUser
            },
            'useradd button[action=save]': {
                click: this.saveUser
            },
            'useredit button[action=save]': {
                click: this.updateUser
            },
            'userlist actioncolumn': {
                itemclick: this.deleteUser
            },
            'userlist > toolbar button[action=delete]': {
                click: this.deleteUsers
            },
	    'userprofile button[action=save]': {
                click: this.updateUser
            },
	    'toolbar-app button[itemId=usernamebutton] menuitem': {
		click: this.selectedMenu
	    },
	    'toolbar-app button[itemId=aboutbutton] menuitem': {
		click: this.selectedMenu
	    },
	    'login button[action=login]': {
                click: this.login
            }
        });
    },
	    
    loadUser: function() {
	
    },
	    
    addUser: function() {     
        var window = Ext.widget('useradd'),
            form = window.down('form'),
            checkboxgroup = form.down('checkboxgroup');
        var groupcheckboxes = this.getStore('group.GroupCheckboxes');
        var checkboxes = new Array();
        
        groupcheckboxes.each(function(rec) {
            checkboxes.push(rec.getData());
        });
        
        checkboxgroup.add(checkboxes);                      
    },
    
    updateUser: function (button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues(),
            store = this.getStore('user.Users');;

        record.set(values);
        win.close();
        // synchronize the store after editing the record
        store.sync({
            success: function() {
                Ext.Msg.show({
                    title:'Status',
                    msg: 'Save successfull!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
            }
        });
	store.load();
    },
    
    saveUser: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
        var record = Ext.create('extjs4.model.user.User'),
            store = this.getStore('user.Users');
            
	record.set(values);
	store.add(record);
        win.close();
        // synchronize the store after editing the record
        store.sync({
            success: function() {
                Ext.Msg.show({
                    title:'Status',
                    msg: 'Data inserted!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
            }
        });
	store.load();
    },
    
    editUser: function(grid, record) {
        var window = Ext.widget('useredit'),
            form = window.down('form'),
            checkboxgroup = form.down('checkboxgroup');
        var groupcheckboxes = this.getStore('group.GroupCheckboxes');
        var checkboxes = new Array();
        
        groupcheckboxes.each(function(rec) {
            checkboxes.push(rec.getData());
        });
        
        checkboxgroup.add(checkboxes);       
        form.loadRecord(record);
        checkboxgroup.setValue({
            groups_id: record.get('groups_id')
        });
    },
     
    deleteUser: function(column, action, grid, rowIndex, colIndex, record, node) {
        var store = this.getStore('user.Users');
        
        Ext.Msg.show({
            title:'Delete',
            msg: 'Delete group ' + record.get('username') + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button) {
                if (button === 'yes') {
                    store.remove(record);
                    store.sync({
                        success: function() {
                            Ext.Msg.show({
                                title:'Status',
                                msg: 'Delete data successfull',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });
                        }
                    });
                }
            }
        });
    },
//    
    deleteUsers: function(button) {
        var gridpanel = button.up('gridpanel'),
            rowselected = gridpanel.getSelectionModel().getSelection(),
            store = this.getStore('user.Users');        
        
        Ext.Msg.show({
            title:'Delete',
            msg: 'Delete group?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button) {
                if (button === 'yes') {
                    store.remove(rowselected);
                    store.sync({
                        success: function() {
                            Ext.Msg.show({
                                title:'Status',
                                msg: 'Delete data successfull',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });
                        }
                    });
                }
            }
        });
    },
    
    selectedMenu: function(menuoption) {
//	console.log(menuoption.getItemId());
	var menu = menuoption.getItemId();
	var store = this.getStore('user.Users');
	switch (menu) {
	    case 'userprofile' : 
		var window = Ext.widget(menu),
		    form = window.down('form'),
		    record = store.getById(4);
	    
		form.loadRecord(record);
		break;
                
	    case 'userlogout' :
//		console.log(menu);
                Ext.Ajax.request({
                    url: 'index.php/user/logout',                    
                    success: function(response, opts) {
                        var obj = Ext.decode(response.responseText);
                        
//                        console.dir(obj);
                        Ext.ComponentQuery.query('app-main')[0].setDisabled(true);
                        Ext.widget('login');                       
                    },
                    failure: function(response, opts) {
                        Ext.Msg.show({
                            title:'Warning!',
                            msg: 'server-side failure with status code ' + response.status,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
//                        console.log('server-side failure with status code ' + response.status);
                    }
                });

		break;
                
	    case 'menuhelp' :
		console.log(menu);
		break;
                
	    case 'menuabout' :
		console.log(menu);
		break;
	}
    },
    
    login: function(button) {
	var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues(),
            usernamebutton = Ext.ComponentQuery.query('#usernamebutton')[0];
            groupcheckboxstore = this.getStore('group.GroupCheckboxes'),
            groupstore = this.getStore('group.Groups'),
            menustore = this.getStore('menu.Menus'),
            menutreestore = this.getStore('menu.MenuTrees'),
            userstore = this.getStore('user.Users');
        
	if (form.isValid()) {
	    form.submit({
		method: 'POST', 
		waitTitle: 'Connecting', 
		waitMsg: 'Sending data...',
		success: function(form, response) {
                    menutreestore.load();
                    userstore.load();
                    menustore.load();
                    groupstore.load();
                    groupcheckboxstore.load();
                    
		    win.close();
		    Ext.ComponentQuery.query('app-main')[0].setDisabled(false);
//                    console.log(Ext.decode(response.response.responseText).username);
                    usernamebutton.setText(Ext.decode(response.response.responseText).username);
		},
		failure: function(form, response) {
		    if (response.failureType === Ext.form.action.Action.SERVER_INVALID) { 
                        Ext.Msg.show({
                            title:'Login failed!',
                            msg: 'Username/password wrong!',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
//			Ext.Msg.alert('Login failed!', 'Username/password wrong!'); 
		    } else { 
                        Ext.Msg.show({
                            title:'Warning!',
                            msg: 'The authentication server is not responding',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.WARNING
                        });
//			Ext.Msg.alert('Warning!', 'The authentication server is not responding'); 
		    } 
		} 
	    });
	}	
    }
});
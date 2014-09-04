Ext.define('extjs4.controller.menu.Menus', {
    extend: 'Ext.app.Controller',
    stores: [
	'menu.Menus',
	'group.GroupCheckboxes'
    ],
    models: ['menu.Menu'],
    views: [
        'menu.List',
        'menu.Add',
        'menu.Edit'
    ],
    
    init: function() {
        this.control({
            'menulist': {
                itemdblclick: this.editMenu,
		beforeadd: this.loadMenu
            },
            'menulist > toolbar button[action=add]': {
                click: this.addMenu
            },
            'menuadd button[action=save]': {
                click: this.saveMenu
            },
	    'menuedit button[action=save]': {
                click: this.updateMenu
            },
            'menulist actioncolumn': {
                itemclick: this.deleteMenu
            },
            'menulist > toolbar button[action=delete]': {
                click: this.deleteMenus
            }
        });
    },
    loadMenu: function() {
	console.log('load menus from store');
    },
	    
    addMenu: function() {
        var window = Ext.widget('menuadd'),
	    form = window.down('form'),
	    checkboxgroup = form.down('checkboxgroup');
	var groupcheckboxes = this.getStore('group.GroupCheckboxes');
        var checkboxes = new Array();
        
        groupcheckboxes.each(function(rec) {
            checkboxes.push(rec.getData());
        });
        
        checkboxgroup.add(checkboxes);       
    },
    
    saveMenu: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues(),
	    store = this.getStore('menu.Menus'),
	    record = Ext.create('extjs4.model.menu.Menu');
            
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
    
    editMenu: function(grid, record) {
	var window = Ext.widget('menuedit'),
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
	    
    updateMenu: function (button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues(),
            store = this.getStore('menu.Menus');;

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
     
    deleteMenu: function(column, action, grid, rowIndex, colIndex, record, node) {
        var store = this.getStore('menu.Menus');
        
        Ext.Msg.show({
            title:'Delete',
            msg: 'Delete group ' + record.get('name') + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button) {
                if (button === 'yes') {
                    store.remove(record);
                    store.getMenusStore().sync({
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
    deleteMenus: function(button) {
        var gridpanel = button.up('gridpanel'),
            rowselected = gridpanel.getSelectionModel().getSelection(),
	    store = this.getStore('menu.Menus');
        
        Ext.Msg.show({
            title:'Delete',
            msg: 'Delete group?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button) {
                if (button === 'yes') {
                    store.getMenusStore().remove(rowselected);
                    store.getMenusStore().sync({
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
    }
});
Ext.define('extjs4.controller.group.Groups', {
    extend: 'Ext.app.Controller',
    stores: ['group.Groups'],
    models: ['group.Group'],
    views: [
        'group.List',
        'group.Add',
        'group.Edit',
        'group.Search',
        'group.Main'
    ],
    
    init: function() {
        this.control({
            'grouplist': {
                itemdblclick: this.editGroup,
		beforeadd: this.loadGroup
            },
            'groupedit button[action=save]': {
                click: this.updateGroup
            },
            'grouplist > toolbar button[action=add]': {
                click: this.addGroup
            },
            'groupadd button[action=save]': {
                click: this.saveGroup
            },
            'grouplist actioncolumn': {
                itemclick: this.deleteGroup
            },
            'grouplist > toolbar button[action=delete]': {
                click: this.deleteGroups
            }
        });
    },
    loadGroup: function() {
//	var store = this.getStore('group.Groups');
//	store.load();
	console.log('load groups from store');
    },
	
    editGroup: function(grid, record) {
//        console.log('Double clicked on ' + record.get('name') + ' ' + record.get('description'));
        var view = Ext.widget('groupedit');

        view.down('form').loadRecord(record);
    },
    
    updateGroup: function (button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues(),
	    store = this.getStore('group.Groups');

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
    },
    
    addGroup: function () {
        Ext.widget('groupadd');
	console.log(Ext.util.Cookies.get('ci_session'));
    },
    
    saveGroup: function (button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues(),
	    store = this.getStore('group.Groups'),
	    record = Ext.create('extjs4.model.group.Group');            
        
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
    },
    
    deleteGroup: function(column, action, grid, rowIndex, colIndex, record, node) {
        var store = this.getStore('group.Groups');
	
        Ext.Msg.show({
            title:'Delete',
            msg: 'Delete group ' + record.get('name') + '?',
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
    
    deleteGroups: function(button) {
        var gridpanel = button.up('gridpanel'),
            rowselected = gridpanel.getSelectionModel().getSelection(),
	    store = this.getStore('group.Groups');
        
        Ext.Msg.show({
            title:'Delete',
            msg: 'Delete group?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button) {
                if (button === 'yes') {
                    store.remove(rowselected);
                    store.getGroupsStore().sync({
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
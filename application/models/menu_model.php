<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of menu_model
 *
 * @author Agasi
 */
class Menu_model extends CI_Model {
    //put your code here
    function __construct() {
        parent::__construct();
    }
    
    function get_menus($group_id) {
        $sql = "SELECT * FROM menu m WHERE m.id IN 
                    (SELECT menu_id FROM menu_groups mg WHERE mg.group_id IN 
                        (SELECT id FROM groups g WHERE g.id = ?)
                ) AND parent = ?";
        $this->db->order_by('order', 'ASC');
        $query = $this->db->query($sql,array($group_id,0));
        return $query->result_array();
    }
    
    function get_menus_children($group_id,$parent) {
        $sql = "SELECT * FROM menu m WHERE m.id IN 
                    (SELECT menu_id FROM menu_groups mg WHERE mg.group_id IN 
                        (SELECT id FROM groups g WHERE g.id = ?)
                ) AND parent = ?";
        $this->db->order_by('order', 'ASC');
        $query = $this->db->query($sql,array($group_id,$parent));
        return $query->result_array();
    }
    
    function get_menus_list($start, $limit,$sort,$filters) {
	$sortProperty = $sort[0]->property; 
        $sortDirection = $sort[0]->direction;
        
        if (is_array($filters)) {
            foreach ($filters as $filter) {
                $field = $filter->field;
                $value = $filter->value;
                $filterType = $filter->type;
                
                switch($filterType) {
                    case 'string' : $this->db->like($field, $value);Break;
                    case 'boolean' : $this->db->like($field, ($value) ? 1 : 0); Break;
                }
            }
        }
	
        $this->db->order_by($sortProperty, $sortDirection); 
        $this->db->limit($limit,$start);
        $this->db->from('menu');
        $query = $this->db->get();
        return $query->result_array();
    }
    
    function get_users_groups($user_id)
    {
	$sql = "SELECT * FROM groups g WHERE g.id IN (SELECT mg.group_id FROM menu_groups mg WHERE mg.menu_id = ?)";
	$query = $this->db->query($sql,array($user_id));
	return $query->result_array();
    }
    
    function count_menus($filters) {
	if (is_array($filters)) {
            foreach ($filters as $filter) {
                $field = $filter->field;
                $value = $filter->value;
                $filterType = $filter->type;
                
                switch($filterType) {
                    case 'string' : $this->db->like($field, $value);Break;
                    case 'boolean' : $this->db->like($field, ($value) ? 1 : 0); Break;
                }
            }
        }
	
        $this->db->from('menu');
        return $this->db->count_all_results();
    }
    
    function insert_menu($data) {
        $this->db->insert('menu', $data);
    }
    
    function update_menu($id,$data) {
        $where = array('id' => $id);
        $this->db->where($where);
        $this->db->update('menu', $data);
    }
    
    function delete_menu($id) {
//        $this->db->delete('menu', array('parent' => $id));
        $this->db->delete('menu', array('id' => $id));
    }
}

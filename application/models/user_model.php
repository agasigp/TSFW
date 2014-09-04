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
class User_model extends CI_Model {
    //put your code here
    function __construct() {
        parent::__construct();
    }
    
    function get_users_list($start, $limit,$sort,$filters) {
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
        $this->db->from('users');
        $query = $this->db->get();
        return $query->result_array();
    }
    
    function count_users($filters) {
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
	        
        $this->db->from('users');
        return $this->db->count_all_results();
    }
    
    function update_user_group($user_id,$group_id)
    {
	
	foreach ($group_id as $g)
	{
	    $group = array(
		'user_id' => $user_id,
		'group_id' => $g
	    );
	    $this->db->insert('users_groups',$group);
	}
    }

}

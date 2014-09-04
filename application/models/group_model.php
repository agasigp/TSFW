<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of group_model
 *
 * @author Agasi
 */
class Group_model extends CI_Model {
    //put your code here
    function __construct() {
        parent::__construct();
    }
    
    function get_groups_count($filters) {
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
	
        $this->db->from('groups');
        return $this->db->count_all_results();
    }
    
    function get_groups($start, $limit,$sort,$filters) {
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
        $this->db->from('groups');
        $query = $this->db->get();
        return $query->result_array();
    }
}

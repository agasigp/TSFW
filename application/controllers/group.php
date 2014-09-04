<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of group
 *
 * @author Agasi
 */
class Group extends CI_Controller {
    function __construct() {
        parent::__construct();    
	$this->load->model('group_model');
    }
    
    function groups() {
	if (!$this->ion_auth->logged_in()) {
	    $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
	} else {
	    $start = $this->input->get('start');
	    $limit = $this->input->get('limit');
	    $sort = $this->input->get('sort') ? json_decode($this->input->get('sort')) : NULL;
	    $filters = $this->input->get('filter') ? json_decode($this->input->get('filter')) : NULL;

	    $data['success'] = true;
	    $data['total'] = $this->group_model->get_groups_count($filters);
	    $data['groups'] = $this->group_model->get_groups($start, $limit,$sort,$filters);
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));	
	}   
    }
    
    function groupcheckbox() {
	if (!$this->ion_auth->logged_in()) {
	    $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
	} else {
	    $checkbox = array();
	    $groups = $this->ion_auth->groups()->result();
	    foreach ($groups as $g) {
		array_push($checkbox,array(
		    'boxLabel' => $g->name,
		    'name' => "groups_id",
		    'inputValue' => (int)$g->id
		));              
	    }
	    $data['groupcheckboxes'] = $checkbox;
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
	}      
    }
    
    function add() {
        if ($this->ion_auth->logged_in()) {
            $group = json_decode($this->input->post('groups'));
            // pass the right arguments and it's done
            $this->ion_auth->create_group($group->name, $group->description);
        } else {
            $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
        } 
    }
    
    function update() {
        if ($this->ion_auth->logged_in()) {
            $group = json_decode($this->input->post('groups'));
            // pass the right arguments and it's done
            $this->ion_auth->update_group($group->id, $group->name, $group->description);
        } else {
            $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
        } 
    }
    
    function delete() {
        if ($this->ion_auth->logged_in()) {
            $groups = json_decode($this->input->post('groups'));
            if (is_array($groups)) {
                foreach ($groups as $group) {
                    $this->ion_auth->delete_group($group->id);
                }
            } else {
                $this->ion_auth->delete_group($groups->id);
            }
        } else {
            $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
        }  
    }
    
    function group() {
        
    }
}

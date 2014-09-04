<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of user
 *
 * @author Agasi
 */
class User extends CI_Controller {

    //put your code here
    function __construct() {
        parent::__construct();
        $this->load->model('user_model');
    }

    function login() {
        $username = $this->input->post('username');
        $password = $this->input->post('password');
        
        $this->ion_auth->login($username, $password);
        if ($this->ion_auth->logged_in()) {
            $data['success'] = TRUE;
            $data['username'] = $username;
        }
        else {
            $data['success'] = FALSE;
        }

        $this->output->set_content_type('application/json')->set_output(json_encode($data));
    }
    
    function logged_in() {
        if ($this->ion_auth->logged_in()) {
            $data['success'] = TRUE;
        }
        else {
            $data['success'] = FALSE;
        }

        $this->output->set_content_type('application/json')->set_output(json_encode($data));
    }

    function logout() {
        $data['success'] = TRUE;
        $this->ion_auth->logout();
        $this->output->set_content_type('application/json')->set_output(json_encode($data));
    }

    function users() {
        if ($this->ion_auth->logged_in()) {
            $start = $this->input->get('start');
            $limit = $this->input->get('limit');
            $sort = $this->input->get('sort') ? json_decode($this->input->get('sort')) : NULL;
            $filters = $this->input->get('filter') ? json_decode($this->input->get('filter')) : NULL;

            $users = $this->user_model->get_users_list($start, $limit, $sort, $filters);
            foreach ($users as $k => $v) {
                $users_group = $this->ion_auth->get_users_groups($users[$k]['id'])->result();
                $groups_id = array();
                $group = array();
                foreach ($users_group as $g) {
                    array_push($groups_id, (int) $g->id);
                    array_push($group, $g->name);
                }

                $users[$k]['groups_id'] = $groups_id;
                $users[$k]['groups'] = $group;
                if ($users[$k]['active'] == 1) {
                    $users[$k]['active'] = TRUE;
                }
                else {
                    $users[$k]['active'] = FALSE;
                }
            }
            
            $user['total'] = $this->user_model->count_users($filters);
            $user['users'] = $users;
            $this->output->set_content_type('application/json')->set_output(json_encode($user));
        } else {
            $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
        }
    }

    function add() {
        if ($this->ion_auth->logged_in()) {
            $user = json_decode($this->input->post('users'));
            $additional_data = array(
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'phone' => $user->phone
            );

            if (is_array($user->groups_id)) {
                $group = $user->groups_id;
            }
            else {
                $group = array($user->groups_id);
            }

            $this->ion_auth->register($user->username, $user->password, $user->email, $additional_data, $group);
        } else {
            $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
        }      
    }

    function update() {
        if ($this->ion_auth->logged_in()) {
            $user_edit = json_decode($this->input->post('users'));
            $user_db = $this->ion_auth->user($user_edit->id)->row();

            if (strcmp($user_edit->password, $user_db->password) == 0) {
                $data['first_name'] = $user_edit->first_name;
                $data['last_name'] = $user_edit->last_name;
                $data['email'] = $user_edit->email;
                $data['phone'] = $user_edit->phone;
                $data['active'] = ($user_edit->active) ? 1 : 0;
                $this->ion_auth->update($user_edit->id, $data);
            }
            else {
                $data['first_name'] = $user_edit->first_name;
                $data['last_name'] = $user_edit->last_name;
                $data['email'] = $user_edit->email;
                $data['phone'] = $user_edit->phone;
                $data['password'] = $user_edit->password;
                $data['active'] = ($user_edit->active) ? 1 : 0;
                $this->ion_auth->update($user_edit->id, $data);
            }

            $this->ion_auth->remove_from_group(NULL, $user_edit->id);

            if (is_array($user_edit->groups_id)) {
                $group = $user_edit->groups_id;
            }
            else {
                $group = array($user_edit->groups_id);
            }
            $this->user_model->update_user_group($user_edit->id, $group);
        } else {
            $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
        }      
    }

    function delete() {
        if ($this->ion_auth->logged_in()) {
            $users = json_decode($this->input->post('users'));
            if (is_array($users)) {
                foreach ($users as $user) {
                    $this->ion_auth->delete_user($user->id);
                }
            }
            else {
                $this->ion_auth->delete_user($users->id);
            }
        } else {
            $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
        }     
    }
}

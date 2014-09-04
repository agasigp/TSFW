<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of menu
 *
 * @author Agasi
 */
class Menu extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('menu_model');
    }

    function menus() {
        if ($this->ion_auth->logged_in()) {
            if ($this->ion_auth->in_group(1)) {
                $menus = $this->menu_model->get_menus(1);
                foreach ($menus as $mk => $mv) {
                    if ($menus[$mk]['parent'] == 0) {
                        $menus[$mk]['menus'] = $this->menu_model->get_menus_children(1, $menus[$mk]['id']);
                    }
                }

                $menu['menus'] = $menus;
                $this->output->set_content_type('application/json')->set_output(json_encode($menu));
            } else if ($this->ion_auth->in_group(2)) {
                $menus = $this->menu_model->get_menus(2);
                foreach ($menus as $mk => $mv) {
                    if ($menus[$mk]['parent'] == 0) {
                        $menus[$mk]['menus'] = $this->menu_model->get_menus_children(2, $menus[$mk]['id']);
                    }
                }

                $menu['menus'] = $menus;
                $this->output->set_content_type('application/json')->set_output(json_encode($menu));
            } else if ($this->ion_auth->in_group(3)) {
                $menus = $this->menu_model->get_menus(3);
                foreach ($menus as $mk => $mv) {
                    if ($menus[$mk]['parent'] == 0) {
                        $menus[$mk]['menus'] = $this->menu_model->get_menus_children(3, $menus[$mk]['id']);
                    }
                }

                $menu['menus'] = $menus;
                $this->output->set_content_type('application/json')->set_output(json_encode($menu));
            }
        } else {
            $menu['menus'] = "";
            $this->output->set_content_type('application/json')->set_output(json_encode($menu));
        }
    }

    function menulist() {
        if ($this->ion_auth->logged_in()) {
            $start = $this->input->get('start');
            $limit = $this->input->get('limit');
            $sort = $this->input->get('sort') ? json_decode($this->input->get('sort')) : NULL;
            $filters = $this->input->get('filter') ? json_decode($this->input->get('filter')) : NULL;
            $menus = $this->menu_model->get_menus_list($start, $limit, $sort, $filters);

            foreach ($menus as $mk => $mv) {
                $groups_id = array();
                $group = array();
                $menu_groups = $this->menu_model->get_users_groups($menus[$mk]['id']);

                foreach ($menu_groups as $g) {
                    array_push($groups_id, (int) $g['id']);
                    array_push($group, $g['name']);
                }

                $menus[$mk]['groups_id'] = $groups_id;
                $menus[$mk]['groups'] = $group;
            }

            $menu['total'] = $this->menu_model->count_menus($filters);
            $menu['menus'] = $menus;
            $this->output->set_content_type('application/json')->set_output(json_encode($menu));
        } else {
            $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
        }
    } 

    function add() {
        if ($this->ion_auth->logged_in()) {
            $menu = json_decode($this->input->post('menu'));
            $data = array(
                'parent' => $menu->parent,
                'name' => $menu->name,
                'text' => $menu->text,
                'expanded' => var_export($menu->expanded, true),
                'leaf' => var_export($menu->leaf, true),
                'xtype' => $menu->xtype,
                'icon' => $menu->icon);
            $this->menu_model->insert_menu($data);
        } else {
            $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
        }     
    }

    function update() {
        if ($this->ion_auth->logged_in()) {
            $menu = json_decode($this->input->post('menu'));
            $data = array(
                'parent' => $menu->parent,
                'name' => $menu->name,
                'text' => $menu->text,
                'expanded' => $menu->expanded,
                'leaf' => $menu->leaf,
                'xtype' => $menu->xtype,
                'icon' => $menu->icon);
            $this->menu_model->update_menu($menu->id, $data);
        } else {
            $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
        }        
    }

    function delete() {
        if ($this->ion_auth->logged_in()) {
            $menu = json_decode($this->input->post('menu'));
            if (is_array($menu)) {
                foreach ($menu as $m) {
                    $this->menu_model->delete_menu($m->id);
                }
            } else {
                $this->menu_model->delete_menu($menu->id);
            }
        } else {
            $data['success'] = true;
	    $data['message'] = "Session Expired";
	    $this->output->set_status_header(401,'Session Expired');
	    $this->output->set_content_type('application/json')->set_output(json_encode($data));
        }        
    }
}

<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of car_model
 *
 * @author agasi
 */
class Car_model extends CI_Controller {
    //put your code here
    function __construct() {
        parent::__construct();
    }
    
    function get_cars() {
//        $this->db->g
        $this->db->select('id,nopol,tipe_kendaraan');
        $this->db->limit(50);
        $query = $this->db->get('kendaraan');
        return $query->result_array();
    }
}

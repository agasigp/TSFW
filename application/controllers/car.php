<?php
class Car extends CI_Controller{

    function __construct() {
        parent::__construct();
        $this->load->model('car_model');
    }
    
    function cars() {
        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $data['cars'] = $this->car_model->get_cars();

        $this->output->set_content_type('application/json')->set_output(json_encode($data));
    }

}
?>
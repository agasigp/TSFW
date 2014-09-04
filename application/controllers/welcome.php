<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Welcome extends CI_Controller {

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     * 		http://example.com/index.php/welcome
     * 	- or -  
     * 		http://example.com/index.php/welcome/index
     * 	- or -
     * Since this controller is set as the default controller in 
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see http://codeigniter.com/user_guide/general/urls.html
     */
    public function index() {
        $this->ion_auth->logout();
        $this->load->view('welcome_message');
//        $this->load->v
    }
    
    function logout() {
	$this->ion_auth->logout();
    }
    
    function login()
    {
	$this->ion_auth->login("test", "test");
    }
    
    function is_login()
    {
	if ($this->ion_auth->logged_in()) {
	    echo "Logged in";
	    print_r($this->session->all_userdata());
	} else {
	    print_r($this->session->all_userdata());
	    echo "Not logged in";
	}
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
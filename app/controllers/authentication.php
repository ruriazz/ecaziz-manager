<?php

class Authentication {
    public function __construct() {
        
    }

    public function index() {
        $view = new ViewData();
        $view->create_script([Script::CORE_BUNDLE, 'js/pages/auth_index.js']);

        $view->render(false);
    }
}
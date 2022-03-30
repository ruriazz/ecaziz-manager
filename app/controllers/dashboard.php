<?php

class Dashboard {
    public function __construct() {
        
    }

    public function index() {
        $view = new ViewData();
        $view->create_script([Script::CORE_BUNDLE, 'js/pages/dashboard.js']);
        $view->add_body('pages/dashboard_index');

        $view->render();
    }
}
<?php

class Undangan {
    public function __construct() {
        
    }

    public function index() {
        $view = new ViewData();
        $view->create_script([Script::CORE_BUNDLE, 'js/pages/undangan_index.js']);
        $view->create_style(['css/pages/undangan_index.css']);
        $view->add_body('pages/undangan_index');

        $view->render();
    }
}
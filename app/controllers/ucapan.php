<?php

class Ucapan {
    public function __construct() {
        
    }

    public function index() {
        $view = new ViewData();
        $view->create_script([Script::CORE_BUNDLE, 'js/pages/ucapan_index.js']);
        $view->add_body('pages/ucapan_index');

        $view->render();
    }
}
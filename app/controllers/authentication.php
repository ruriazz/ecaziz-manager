<?php

class Authentication {
    public function __construct() {
        
    }

    public function index() {
        $view = new ViewData();
        $view->create_script(Script::CORE_BUNDLE);

        $view->render(false);
    }
}
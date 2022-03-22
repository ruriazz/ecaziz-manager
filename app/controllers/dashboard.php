<?php

class Dashboard {
    public function __construct() {
        
    }

    public function index() {
        $view = new ViewData();

        $view->render();
    }
}
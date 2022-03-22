<?php

$router->set404(function() {
    header('HTTP/1.1 404 Not Found');
    _load_view('errors/404');
});

$router->setBasePath('/');

$router->get('/', function() {
    _load_controllers('dashboard', 'index');
});

$router->get('/auth', function() {
    _load_controllers('authentication', 'index');
});

$router->get('/undangan', function() {
    _load_controllers('undangan', 'index');
});

$router->get('/ucapan', function() {
    _load_controllers('undangan', 'index');
});
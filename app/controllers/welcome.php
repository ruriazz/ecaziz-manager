<?php

class Welcome {
    public function __construct()
    {
        $dist = array(
            'css/style.css',
            'js/jquery.js',
            'js/app.js'
        );

        $view_data = new ViewData();
        $view_data->create_meta([
            [
                "name" => "author",
                "content" => "ruriazz"
            ],
            [
                "name" => "description",
                "content" => "lorem ipsum"
            ],
            [
                "name" => "og:image",
                "content" => "https://www.bootstrapdash.com/azia/img/azia-social.png"
            ]
        ]);
        $view_data->create_style($dist);
        $view_data->create_script($dist);
        $view_data->add_body('welcome');
        $view_data->render();
    }
}
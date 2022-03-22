<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php

    if(isset($view_data->html_meta)) {
        foreach ($view_data->html_meta as $meta) {
            echo $meta;
        }
    }

    if(isset($view_data->link_style)) {
        foreach ($view_data->link_style as $style) {
            echo $style;
        }
    }

    ?>

    <title><?php if(isset($view_data->page_title)) echo $view_data->page_title; ?></title>
</head>
<body>
    <?php

    if(isset($view_data->html_body)) {
        foreach ($view_data->html_body as $body) {
            echo $body;
        }
    }

    if(isset($view_data->script_src)) {
        foreach ($view_data->script_src as $script) {
            echo $script;
        }
    }

    ?>
</body>
</html>
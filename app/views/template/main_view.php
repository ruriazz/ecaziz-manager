<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php
    if (isset($view_data->html_meta)) {
        foreach ($view_data->html_meta as $meta) {
            echo $meta;
        }
    }
    ?>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
    <link href="<?php echo base_url('assets/plugins/global/plugins.bundle.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?php echo base_url('assets/css/style.bundle.css') ?>" rel="stylesheet" type="text/css" />

    <?php
    if (isset($view_data->link_style)) {
        foreach ($view_data->link_style as $style) {
            echo $style;
        }
    }
    ?>

    <title><?php if (isset($view_data->page_title)) echo $view_data->page_title; ?></title>
</head>

<body body id="kt_body" class="aside-enabled" style="display:none;">
    <?php _load_view('template/page_loader'); ?>

    <div class="d-flex flex-column flex-root">
        <div class="page d-flex flex-row flex-column-fluid">

            <?php _load_view('template/menu'); ?>

            <div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                <div id="kt_header" class="header align-items-stretch">
                    <div class="header-brand">
                        <a href="/">
                            <h1>ecaziz</h1>
                        </a>
                        <div class="d-flex align-items-center d-lg-none ms-n3 me-1" title="Show aside menu">
                            <div class="btn btn-icon btn-active-color-primary w-30px h-30px" id="kt_aside_mobile_toggle">
                                <span class="svg-icon svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="black" />
                                        <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="black" />
                                    </svg></span>
                            </div>
                        </div>
                    </div>
                    <div class="topbar">
                        <div class="container-fluid py-6 py-lg-0 d-flex flex-column flex-sm-row align-items-lg-stretch justify-content-sm-between">
                            <div class="page-title d-flex flex-column me-5">
                                <h1 class="d-flex flex-column text-dark fw-bolder fs-2 mb-0"></h1>
                            </div>
                            <div class="d-flex align-items-center pt-3 pt-sm-0"></div>
                        </div>
                    </div>
                </div>
                <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
                    <div id="kt_content_container" class="container-fluid">
                        <?php
                        if (isset($view_data->html_body)) {
                            foreach ($view_data->html_body as $body) {
                                echo $body;
                            }
                        }
                        ?>
                    </div>
                </div>

                <?php _load_view('template/footer'); ?>

            </div>
        </div>
    </div>

    <script src="<?php echo base_url('assets/plugins/global/plugins.bundle.js') ?>"></script>
    <script src="<?php echo base_url('assets/js/scripts.bundle.js') ?>"></script>

    <?php
    if (isset($view_data->script_src)) {
        foreach ($view_data->script_src as $script) {
            echo $script;
        }
    }
    ?>
</body>

</html>
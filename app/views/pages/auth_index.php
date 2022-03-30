<!DOCTYPE html>
<html lang="en">
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />

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

<body style="display: none" id="kt_body" class="auth-bg">
    <?php _load_view('template/page_loader'); ?>

    <div class="d-flex flex-column flex-root">
        <div class="d-flex flex-center flex-column flex-column-fluid">
            <div class="w-lg-500px p-10 p-lg-15 mx-auto">
                <form class="form w-100" id="auth-form">
                    <div class="text-center mb-10">
                        <h1 class="text-dark mb-3">Sign In to manager</h1>
                    </div>
                    <div class="fv-row mb-10">
                        <label class="form-label fs-6 fw-bolder text-dark">Username</label>
                        <input class="form-control form-control-lg form-control-solid" type="text" id="input-username" autocomplete="off" required />
                    </div>
                    <div class="fv-row mb-10">
                        <label class="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
                        <input class="form-control form-control-lg form-control-solid" type="password" id="input-password" autocomplete="off" required />
                    </div>
                    <div class="text-center">
                        <button type="submit" id="kt_sign_in_submit" class="btn btn-lg btn-primary w-100 mb-5">
                            <span class="indicator-label">Continue</span>
                        </button>
                    </div>
                </form>
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
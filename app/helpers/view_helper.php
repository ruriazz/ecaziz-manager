<?php

if(!class_exists('ViewData')) {
    class ViewData {
        public Array $html_meta = [];
        public Array $html_body = [];
        public Array $link_style = [];
        public Array $script_src = [];
        public Array $data = [];
        public String $page_title = "ecaziz";

        public function __construct() {
            $init_meta = array(
                [
                    "name" => "author",
                    "content" => "ruriazz"
                ]
            );

            $this->create_meta($init_meta);
        }

        public function create_meta(Array $data) {
            $meta = '<meta PROP_NAME="PROP_VALUE" content="CONTENT">';

            $meta_created = array();
            foreach ($data as $value) {
                $key = 'property';
                if(array_key_exists('name', $value)) {
                    $key = 'name';
                }

                $key_value = $value[$key];
                $content = $value['content'];
                $new_meta = str_replace('PROP_NAME', $key, $meta);
                $new_meta = str_replace('PROP_VALUE', $key_value, $new_meta);
                $new_meta = str_replace('CONTENT', $content, $new_meta);
                array_push($meta_created, $new_meta);
            }

            if(count($meta_created) > 0)
                array_merge($this->html_meta, $meta_created);

            $this->html_meta = array_unique($this->html_meta);
        }
    
        public function add_body($view) {
            if(is_string($view)) {
                array_push($this->html_body, _load_view($view, [], false));
            } else if(is_array($view)) {
                foreach ($view as $v) {
                    array_push($this->html_body, _load_view($view, [], false));
                }
            }

            $this->html_body = array_unique($this->html_body);
        }

        public function create_style($dist, String $rel = "stylesheet") {
            $style = '<link href="HREF" rel="REL">';

            if(is_string($dist)) {
                return $this->create_style([$dist], $rel);
            } else if(is_array($dist)) {
                foreach ($dist as $path) {
                    if(filter_var($path, FILTER_VALIDATE_URL)) {
                        $new_style = str_replace('HREF', $cdn, $style);
                        $new_style = str_replace('REL', $rel, $new_style);
                        array_push($this->link_style, $new_style);
                    } else {
                        $assets = Assets::create($dist, 'css');
                        if($assets->css) {
                            $new_style = str_replace('HREF', $assets->css, $style);
                            $new_style = str_replace('REL', $rel, $new_style);

                            array_push($this->link_style, $new_style);
                            break;
                        }
                    }
                }
            }

            $this->link_style = array_unique($this->link_style);
        }

        public function create_script($dist = null, String $type = "module") {
            $script = '<script src="SRC" type="TYPE"></script>';

            if(is_string($dist)) {
                return $this->create_script([$dist], $type);
            } else if(is_array($dist)) {
                foreach ($dist as $path) {
                    if(filter_var($path, FILTER_VALIDATE_URL)) {
                        $new_script = str_replace('SRC', $cdn, $script);
                        $new_script = str_replace('TYPE', $type, $new_script);
                        array_push($this->script_src, $new_script);
                    } else {
                        $assets = Assets::create($dist, 'js');
                        if($assets->js) {
                            $new_script = str_replace('SRC', $assets->js, $script);
                            $new_script = str_replace('TYPE', $type, $new_script);
                        }

                        array_push($this->script_src, $new_script);
                        break;
                    }
                }
            }

            $this->script_src = array_unique($this->script_src);
        }

        public function render() {
            _load_view('template/main_view', ['view_data' => $this]);
        }
    }
}
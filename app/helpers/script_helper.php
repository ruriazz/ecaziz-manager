<?php

if(!function_exists('Script')) {
    class Script {
        const CORE_API = array(
            'axios/axios.js',
            'js/api_client.js'
        );

        const CORE_CRYPTO = array(
            'node-forge/forge.min.js',
            'js/encryption.js'
        );

        const CORE_STORAGE = array(
            'localforage/localforage.js',
            'js/storage.js'
        );

        const CORE_APP = array(
            'js/app.js'
        );

        const CORE_BUNDLE = array(
            self::CORE_CRYPTO,
            self::CORE_STORAGE,
            self::CORE_API,
            self::CORE_APP
        );
    }
}
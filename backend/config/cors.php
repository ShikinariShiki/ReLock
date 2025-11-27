<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173')),

    'allowed_origins_patterns' => [
        // Allow all subdomains of vercel.app for deployment
        '#^https://.*\.vercel\.app$#',
        // Allow localhost with any port
        '#^http://localhost:\d+$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['X-RateLimit-Limit', 'X-RateLimit-Remaining'],

    'max_age' => 86400, // 24 hours

    'supports_credentials' => true,
];

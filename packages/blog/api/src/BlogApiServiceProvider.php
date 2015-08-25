<?php

namespace Blog\Api;

use Illuminate\Support\ServiceProvider;

/**
 * Class BlogApiServiceProvider
 * @package Blog\Api
 */
class BlogApiServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        include __DIR__.'/routes.php';
    }
}

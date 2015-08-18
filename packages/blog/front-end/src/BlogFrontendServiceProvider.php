<?php

namespace Blog\Frontend;

use Illuminate\Support\ServiceProvider;

/**
 * Class AcdApiServiceProvider
 *
 * @package Applyit\AcdApi
 */
class BlogFrontEndServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/resources/views', 'blog');

        $this->publishes([
            __DIR__.'/resources/views' => base_path('resources/views/vendor/blog'),
        ]);
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

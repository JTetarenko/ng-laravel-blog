<?php

namespace Blog\db;

use Illuminate\Support\ServiceProvider;

/**
 * Class BlogDBServiceProvider
 * @package Blog\db
 */
class BlogDBServiceProvider extends ServiceProvider
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
        $this->app->bind(
            'Blog\db\Repositories\Interfaces\ArticlesInterface',
            'Blog\db\Repositories\ArticlesRepository'
        );

        $this->app->bind(
            'Blog\db\Repositories\Interfaces\TagsInterface', 
            'Blog\db\Repositories\TagsRepository'
        );

        $this->app->bind(
            'Blog\db\Repositories\Interfaces\CategoriesInterface', 
            'Blog\db\Repositories\CategoriesRepository'
        );

        $this->app->bind(
            'Blog\db\Repositories\Interfaces\CommentsInterface', 
            'Blog\db\Repositories\CommentsRepository'
        );

        $this->app->bind(
            'Blog\db\Repositories\Interfaces\UsersInterface', 
            'Blog\db\Repositories\UsersRepository'
        );
    }
}
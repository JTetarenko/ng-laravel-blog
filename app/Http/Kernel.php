<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array
     */
    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        //\App\Http\Middleware\VerifyCsrfToken::class,
    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'jwt.auth'                      => \Tymon\JWTAuth\Middleware\GetUserFromToken::class,
        'writer_permission'             => \App\Http\Middleware\RedirectIfUserNoPermission::class,
        'admin_permission'              => \App\Http\Middleware\RedirectIfWriterNoPermission::class,
        'article_exsists'               => \App\Http\Middleware\RedirectIfArticleNotExsists::class,
        'create.category.permission'    => \App\Http\Middleware\CreateCategoryPermission::class,
        'edit.comment.permission'       => \App\Http\Middleware\EditCommentPermission::class,
        'user_exists'                   => \App\Http\Middleware\RedirectIfUserNotExsists::class,
        'edit.profile.permission'       => \App\Http\Middleware\UserEditPermission::class,
    ];
}

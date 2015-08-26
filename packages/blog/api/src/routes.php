<?php

Route::group(['prefix' => 'api'], function()
{
    Route::resource('articles', 'Blog\Api\Controllers\ArticlesController');
    Route::resource('users', 'Blog\Api\Controllers\UserController');

    Route::patch('users/{users}/edit/email', 'Blog\Api\Controllers\UserController@changeEmail');
    Route::put('users/{users}/edit/email', 'Blog\Api\Controllers\UserController@changeEmail');

    Route::patch('users/{users}/edit/password', 'Blog\Api\Controllers\UserController@changePassword');
    Route::put('users/{users}/edit/password', 'Blog\Api\Controllers\UserController@changePassword');

    Route::get('articles/users/{user}', 'Blog\Api\Controllers\UserController@filterArticleUsers');
    Route::get('comments/users/{user}', 'Blog\Api\Controllers\UserController@filterUserComments');
    
    Route::resource('categories', 'Blog\Api\Controllers\CategoriesController');

    Route::post('{articles}/comments', 'Blog\Api\Controllers\CommentsController@store');
    Route::get('{articles}/comments/{comments}', 'Blog\Api\Controllers\CommentsController@edit');
    Route::patch('{articles}/comments/{comments}', 'Blog\Api\Controllers\CommentsController@update');
    Route::put('{articles}/comments/{comments}', 'Blog\Api\Controllers\CommentsController@update');
    Route::delete('{articles}/comments/{comments}', 'Blog\Api\Controllers\CommentsController@destroy');

    Route::get('articles/tags/{tag}', 'Blog\Api\Controllers\ArticlesController@filterArticleTags');
    Route::get('tags/{tag}', 'Blog\Api\Controllers\ArticlesController@getTag');
    Route::get('articles/categories/{category}', 'Blog\Api\Controllers\CategoriesController@filterArticleCategories');

    Route::post('/auth/login', 'Blog\Api\Controllers\AuthController@authenticate');
    Route::get('/auth/user', 'Blog\Api\Controllers\AuthController@getAuthenticatedUser');
    Route::get('/auth/refresh-token', 'Blog\Api\Controllers\AuthController@refreshToken');
});
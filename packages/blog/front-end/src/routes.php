<?php

Route::get('/', function()
{
	return view('blog::master');
});

Route::group(['prefix' => '/views'], function()
{
	Route::group(['prefix' => '/auth'], function()
	{
		Route::get('/login', function()
		{
			return view('blog::auth.login');
		});

		Route::get('/register', function()
		{
			return view('blog::auth.register');
		});
	});
	
	Route::get('/articles', function()
	{
		return view('blog::articles.index');
	});

	Route::get('/articles/show', function()
	{
		return view('blog::articles.show');
	});

	Route::get('/articles/filter', function()
	{
		return view('blog::articles.filter');
	});

	Route::get('/articles/create', function()
	{
		return view('blog::articles.create');
	});

	Route::get('/articles/edit', function()
	{
		return view('blog::articles.edit');
	});

	Route::get('/users/show', function()
	{
		return view('blog::users.show');
	});

	Route::get('/users/edit', function()
	{
		return view('blog::users.edit');
	});
});
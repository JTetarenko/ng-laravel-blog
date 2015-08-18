angular.module('blog')	
	.config(function($stateProvider, $urlRouterProvider, $sceProvider, NotificationProvider)
	{
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', 
			{
				url: '/',
				templateUrl: '/views/articles',
				controller: 'articlesIndexController'
			})
			.state('login',
			{
				url: '/auth/login',
				templateUrl: 'views/auth/login',
				controller: 'authController'
			})
			.state('register',
			{
				url: '/auth/register',
				templateUrl: 'views/auth/register',
				controller: 'usersRegisterController'
			})
			.state('logout',
			{
				url: '/auth/logout',
				controller: 'logoutController'
			})
			.state('articles',
			{
				url: '/articles/',
				templateUrl: '/views/articles',
				controller: 'articlesIndexController'
			})
			.state('articles_create',
			{
				url: '/articles/create',
				templateUrl: '/views/articles/create',
				controller: 'articlesCreateController'
			})
			.state('articles_edit',
			{
				url: '/articles/:articleSlug/edit',
				templateUrl: '/views/articles/edit',
				controller: 'articlesEditController'
			})
			.state('comments_edit',
			{
				url: '/articles/:articleSlug/comments/:commentID/edit',
				templateUrl: '/views/articles/show',
				controller: 'articlesShowController'
			})
			.state('articles_show',
			{
				url: '/articles/:articleSlug',
				templateUrl: '/views/articles/show',
				controller: 'articlesShowController'
			})
			.state('articles_filter',
			{
				url: '/articles/:filterBy/:filterID',
				templateUrl: '/views/articles/filter',
				controller: 'articlesFilterController'
			})
			.state('users_show',
			{
				url: '/users/:userID',
				templateUrl: '/views/users/show',
				controller: 'usersShowController'
			})
			.state('users_show_stuff',
			{
				url: '/users/:userID/:showParam',
				templateUrl: '/views/users/show',
				controller: 'usersShowController'
			})
			.state('users_edit',
			{
				url: '/users/:userID/edit/:editParam',
				templateUrl: '/views/users/edit',
				controller: 'usersEditController'
			});

		NotificationProvider.setOptions(
		{
            delay: 5000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });
        
		$sceProvider.enabled(false);
	})
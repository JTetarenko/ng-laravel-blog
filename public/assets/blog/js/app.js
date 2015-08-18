var blog = angular.module('blog', [
	'ui.router',
	'ngAnimate',
	'angular-loading-bar',
	'yaru22.angular-timeago',
	'blockUI',
	'ui.bootstrap',
	'ui-notification',
	'ngStorage',
	'treasure-overlay-spinner',
	'ngCookies'
])
.run(function($rootScope, $cookies, $http, $interval, $state, Notification, $window, $timeout)
{
 	$rootScope.endPoint = 'http://myblog.lv/api';
 	$rootScope.spinner = {
 		active: true
 	};

 	$rootScope.notification = {
 		type: '',
 		msg: '',
 		popup: false
 	};

 	$rootScope.loggedIn = true;

 	if ($cookies.get('token') !== undefined)
 	{
 		$rootScope.userObtained = false;
 		
 		$http.get($rootScope.endPoint + '/auth/user?token=' + $cookies.get('token'))
 			.success(function(response)
 			{
 				$rootScope.token = $cookies.get('token');
 				$rootScope.user = response.user;
 				$rootScope.userObtained = true;
 			})
 			.error(function()
 			{
 				$rootScope.loggedIn = false;
 				delete $rootScope.user;
 				
 				$cookies.remove('user');
 				$cookies.remove('token');

 				$state.go('login');

 				$timeout(function()
 				{
 					$window.location.reload();
 				}, 200);
 			});

 		$interval(function()
 		{
 			$http.get($rootScope.endPoint + '/auth/refresh-token?token=' + $rootScope.token)
 				.success(function(response)
 				{
 					$rootScope.token = response.token;
 					$cookies.put('token', response.token);
 				})
 				.error(function()
 				{
 					delete $rootScope.user;
 					$rootScope.loggedIn = false;
 					
 					$cookies.remove('token');

 					$state.go('login');


 					$timeout(function()
	 				{
	 					$window.location.reload();
	 				}, 200);
 				});
 		}, 60000);
 	}
 	else
 	{
 		$rootScope.loggedIn = false;
 	}
});
angular.module('blog') 
 .directive('postsPagination', function(){  
    return{
       restrict: 'E',
       template: '<ul class="pagination">'+
         '<li ng-show="currentPage != 1"><a href="javascript:void(0)" ng-click="getArticles(1)">&laquo;</a></li>'+
         '<li ng-show="currentPage != 1"><a href="javascript:void(0)" ng-click="getArticles(currentPage-1)">&lsaquo; Prev</a></li>'+
         '<li ng-repeat="i in range" ng-class="{active : currentPage == i}">'+
             '<a href="javascript:void(0)" ng-click="getArticles(i)">{{i}}</a>'+
          '</li>'+
          '<li ng-show="currentPage != totalPages"><a href="javascript:void(0)" ng-click="getArticles(currentPage+1)">Next &rsaquo;</a></li>'+
          '<li ng-show="currentPage != totalPages"><a href="javascript:void(0)" ng-click="getArticles(totalPages)">&raquo;</a></li>'+
        '</ul>'
     };
 });

 angular.module('blog')
  .directive('ckEditor', function() {
    return {
      require: '?ngModel',
      link: function(scope, elm, attr, ngModel) {
        var ck = CKEDITOR.replace(elm[0]);

        if (!ngModel) return;

        ck.on('pasteState', function() {
          scope.$apply(function() {
            ngModel.$setViewValue(ck.getData());
          });
        });

        ngModel.$render = function(value) {
          ck.setData(ngModel.$viewValue);
        };
      }
    };
});
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
var articleFactory = function($http, $rootScope)
{
	var factory = {};

	factory.getArticles = function(pageNumber)
	{
		return $http.get($rootScope.endPoint + '/articles?page=' + pageNumber);
	};

	factory.getCategoryList = function()
	{
		return $http.get($rootScope.endPoint + '/categories');
	};

	factory.getArticle = function(slug)
	{
		return $http.get($rootScope.endPoint + '/articles/' + slug);
	};

	factory.beforeCreateArticle = function(token)
	{
		return $http.get($rootScope.endPoint + '/articles/create?token=' + token);
	};

	factory.createArticle = function(data, token)
	{
		return $http.post($rootScope.endPoint + '/articles?token=' + token, data);
	};

	factory.beforeEditArticle = function(slug, token)
	{
		return $http.get($rootScope.endPoint + '/articles/' + slug + '/edit?token=' + token);
	};

	factory.editArticle = function(slug, dataWithToken)
	{
		return $http.put($rootScope.endPoint + '/articles/' + slug + '?token=' + dataWithToken.token, dataWithToken);
	};

	factory.deleteArticle = function(slug, token)
	{
		return $http.delete($rootScope.endPoint + '/articles/' + slug + '?token=' + token);
	};

	factory.filterByCategory = function(id, pageNumber)
	{
		return $http.get($rootScope.endPoint + '/articles/categories/' + id + '?page=' + pageNumber);
	};

	factory.getCategory = function(id)
	{
		return $http.get($rootScope.endPoint + '/categories/' + id);
	};

	factory.filterByTag = function(id)
	{
		return $http.get($rootScope.endPoint + '/articles/tags/' + id);
	};

	factory.getTag = function(id)
	{
		return $http.get($rootScope.endPoint + '/tags/' + id);
	};

	return factory;
};

articleFactory.$injector = ['$http', '$rootScope'];

angular.module('blog')
	.factory('articleFactory', articleFactory);
var commentFactory = function($http, $rootScope)
{
	var factory = {};

	factory.createComment = function(slug, data, token)
	{
		return $http.post($rootScope.endPoint + '/' + slug + '/comments?token=' + token, data);
	};

	factory.beforeEdit = function(slug, id, token)
	{
		return $http.get($rootScope.endPoint + '/' + slug + '/comments/' + id + '?token=' + token);
	};

	factory.editComment = function(slug, id, dataWithToken)
	{
		return $http.put($rootScope.endPoint + '/' + slug + '/comments/' + id + '?token=' + dataWithToken.token, dataWithToken);
	};

	factory.deleteComment = function(slug, id, token)
	{
		return $http.delete($rootScope.endPoint + '/' + slug + '/comments/' + id + '?token=' + token);
	};

	return factory;
};

commentFactory.$injector = ['$http', '$rootScope'];

angular.module('blog')
	.factory('commentFactory', commentFactory);
var userFactory = function($http, $rootScope)
{
	var factory = {};

	factory.getUser = function(id)
	{
		return $http.get($rootScope.endPoint + '/users/' + id);
	};

	factory.getUserArticles = function(id)
	{
		return $http.get($rootScope.endPoint + '/articles/users/' + id);
	};

	factory.getComments = function(id)
	{
		return $http.get($rootScope.endPoint + '/comments/users/' + id);
	};

	factory.login = function(credentials)
	{
		return $http.post($rootScope.endPoint + '/auth/login', credentials);
	};

	factory.getUserFromToken = function(token)
	{
		return $http.get($rootScope.endPoint + '/auth/user?token=' + token);
	};

	factory.createUser = function(credentials)
	{
		return $http.post($rootScope.endPoint + '/users', credentials);
	};

	factory.changeEmail = function(id, data, token)
	{
		return $http.put($rootScope.endPoint + '/users/' + id + '/edit/email?token=' + token, data);
	};

	factory.changePassword = function(id, data, token)
	{
		return $http.put($rootScope.endPoint + '/users/' + id + '/edit/password?token=' + token, data);
	};

	return factory;
};

userFactory.$injector = ['$http', '$rootScope'];

angular.module('blog')
	.factory('userFactory', userFactory);
var authController = function($scope, $rootScope, Notification, userFactory, $cookies, $window, $state)
{
	if ($rootScope.loggedIn)
	{
		$state.go('home');
	}

	$scope.login = function()
	{
        var credentials = {
            email: $scope.email,
            password: $scope.password
        }

        userFactory.login(credentials)
        	.success(function(response)
        	{
        		$cookies.put('token', response.token);

        		$rootScope.token = response.token;

        		userFactory.getUserFromToken(response.token)
        			.success(function(data)
        			{
        				$rootScope.user = data.user;

        				$window.location.reload();
        			})
        			.error(function(error)
        			{
        				Notification.error('<span class="fa fa-exclamation-circle"></span> ' + error);
        			});
        	})
        	.error(function(response)
        	{
                Notification.error('<span class="fa fa-exclamation-circle"></span> ' + response.error);
        	});
	}
};

authController.$injector = ['$scope', '$rootScope', 'Notification', '$state', '$auth', 'userFactory', '$cookies', '$window', '$state'];

angular.module('blog')
	.controller('authController', authController);
var logoutController = function($rootScope, $localStorage, $cookies, $state, $window)
{
	if ($rootScope.loggedIn)
	{
		delete $localStorage.token;

		$cookies.remove('token');
		$cookies.remove('user');

		$window.location.reload();
	}
	else
	{
		$state.go('home');
	}
};

logoutController.$injector = ['$rootScope', '$localStorage', '$cookies', '$state', '$window'];

angular.module('blog')
	.controller('logoutController', logoutController);
var notificationController = function($scope, $rootScope, Notification)
{
	if ($rootScope.notification.popup)
	{
		if ($rootScope.notification.type === 'success')
		{
			Notification.success($rootScope.notification.msg);
			$rootScope.notification.popup = false;
		}
		
		if ($rootScope.notification.type === 'error')
		{
			Notification.error($rootScope.notification.msg);
			$rootScope.notification.popup = false;
		}
		
		if ($rootScope.notification.type === 'warning')
		{
			Notification.warning($rootScope.notification.msg);
			$rootScope.notification.popup = false;
		}
		
		if ($rootScope.notification.type === 'info')
		{
			Notification.info($rootScope.notification.msg);
			$rootScope.notification.popup = false;
		}
		
		if ($rootScope.notification.type === 'primary')
		{
			Notification($rootScope.notification.msg);
			$rootScope.notification.popup = false;
		}
	}
};

notificationController.$injector = ['$scope', '$rootScope', 'Notification'];

angular.module('blog')
	.controller('notificationController', notificationController);
var articlesCreateController = function($scope, $rootScope, $state, $stateParams, Notification, articleFactory, $interval, blockUI)
{
	$scope.published_at = new Date();

	if ($rootScope.loggedIn)
	{

		blockUI.start();

		var timer = $interval(function()
		{
			if ($rootScope.userObtained)
			{
				$interval.cancel(timer);
				delete timer;
				
				articleFactory.beforeCreateArticle($rootScope.token)
					.success(function(response)
					{
						$scope.category_list = [];
						$scope.tag_list = [];

						$scope.categories = response.categories;
						$scope.tags = response.tags;
						blockUI.stop();
					})
					.error(function(response)
					{
						blockUI.stop();
						$state.go('articles');

						$rootScope.notification.type = 'error';
						$rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
						$rootScope.notification.popup = true;
					});
			}
		}, 100);
	}
	else
	{
		$state.go('articles');

		$rootScope.notification.type = 'error';
		$rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
		$rootScope.notification.popup = true;
	}
	
	$scope.create = function()
	{
		if (tag_list.length > 0)
		{
			data = {
				slug: $scope.slug,
				title: $scope.title,
				category_list: $scope.category_list,
				excerpt: $scope.excerpt,
				body: $scope.body,
				image_url: $scope.image_url,
				published_at: moment($scope.published_at).format('YYYY-MM-DD'),
				tag_list: $scope.tag_list
			}
		}
		else
		{
			data = {
				slug: $scope.slug,
				title: $scope.title,
				category_list: $scope.category_list,
				excerpt: $scope.excerpt,
				body: $scope.body,
				image_url: $scope.image_url,
				published_at: moment($scope.published_at).format('YYYY-MM-DD')
			}
		}
		
		articleFactory.createArticle(data, $rootScope.token)
			.success(function()
			{
				$state.go('articles');

        		$rootScope.notification.type = 'success';
				$rootScope.notification.msg = '<span class="fa fa-check-circle"></span> You successfully added article!';
				$rootScope.notification.popup = true;
			})
			.error(function(response)
			{
				if (response.errors.slug[0] !== undefined)
				{
					Notification.error({
	        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.slug[0],
	        			delay: 10000
	        		});
				}

				if (response.errors.title[0] !== undefined)
				{
					Notification.error({
	        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.title[0],
	        			delay: 10000
	        		});
				}

				if (response.errors.category_list[0] !== undefined)
				{
					Notification.error({
	        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.category_list[0],
	        			delay: 10000
	        		});
				}

				if (response.errors.excerpt[0] !== undefined)
				{
					Notification.error({
	        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.excerpt[0],
	        			delay: 10000
	        		});
				}

				if (response.errors.body[0] !== undefined)
				{
					Notification.error({
	        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.body[0],
	        			delay: 10000
	        		});
				}

				if (response.errors.image_url[0] !== undefined)
				{
					Notification.error({
	        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.image_url[0],
	        			delay: 10000
	        		});
				}

				if (response.errors.published_at[0] !== undefined)
				{
					Notification.error({
	        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.published_at[0],
	        			delay: 10000
	        		});
				}

				if (response.errors.tag_list[0] !== undefined)
				{
					Notification.error({
	        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.tag_list[0],
	        			delay: 10000
	        		});
				}
			});
	};
};

articlesCreateController.$injector = ['$scope', '$rootScope', '$state', 'Notification', 'articleFactory', '$interval', 'blockUI'];

angular.module('blog')
	.controller('articlesCreateController', articlesCreateController);
var articlesEditController = function($scope, $rootScope, $state, $stateParams, $interval, Notification, blockUI, articleFactory)
{
	if ($rootScope.loggedIn)
	{
		blockUI.start();

		var timer = $interval(function()
		{
			if ($rootScope.userObtained)
			{
				$interval.cancel(timer);
				delete timer;

				articleFactory.beforeEditArticle($stateParams.articleSlug, $rootScope.token)
					.success(function(response)
					{
						$scope.article = response.article;
						$scope.categories = response.categories;
						$scope.tags = response.tags;

						$scope.slug = response.article.slug;
						$scope.category_list = response.article.categories;
						$scope.title = response.article.title;
						$scope.excerpt = response.article.excerpt;
						$scope.body = response.article.body;
						$scope.image_url = response.article.image_url;
						$scope.published_at = new Date(response.article.published_at.date);
						$scope.tag_list = response.article.tags;

						$scope.category_list = [];
						$scope.tag_list = [];

						for (i=0; i<response.categories.length; i++)
						{
							for(j=0; j<response.article.categories.length; j++)
							{
								if (response.categories[i].id === response.article.categories[j].id)
								{
									$scope.category_list.push(response.categories[i]);
								}
							}
						}				

						$scope.$watch('category_list', function(nowSelected){
					        $scope.selectedCategories = [];
					        
					        if( ! nowSelected ){
					            // here we've initialized selected already
					            // but sometimes that's not the case
					            // then we get null or undefined
					            return;
					        }
					        angular.forEach(nowSelected, function(val){
					            $scope.selectedCategories.push( val.id.toString() );
					            $('#category_list').select2("val", $scope.selectedCategories);				            
					        });
					    });

						blockUI.stop();
					})
					.error(function(response)
					{
						blockUI.stop();
						$state.go('articles');

						$rootScope.notification.type = 'error';
						$rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
						$rootScope.notification.popup = true;
					});

				$scope.edit = function()
				{
					console.log($rootScope.token);
					if (tag_list.length > 0)
					{
						data = {
							token: $rootScope.token,
							slug: $scope.slug,
							title: $scope.title,
							category_list: $scope.selectedCategories,
							excerpt: $scope.excerpt,
							body: $scope.body,
							image_url: $scope.image_url,
							published_at: moment($scope.published_at).format('YYYY-MM-DD'),
							tag_list: $scope.tag_list
						}
					}
					else
					{
						data = {
							token: $rootScope.token,
							slug: $scope.slug,
							title: $scope.title,
							category_list: $scope.category_list,
							excerpt: $scope.excerpt,
							body: $scope.body,
							image_url: $scope.image_url,
							published_at: moment($scope.published_at).format('YYYY-MM-DD')
						}
					}
					
					articleFactory.editArticle($scope.slug, data)
						.success(function()
						{
							$state.go('articles');

			        		$rootScope.notification.type = 'success';
							$rootScope.notification.msg = '<span class="fa fa-check-circle"></span> You successfully edited article!';
							$rootScope.notification.popup = true;
						})
						.error(function(response)
						{
							console.log(response);
							if (response.errors.slug[0] !== undefined)
							{
								Notification.error({
				        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.slug[0],
				        			delay: 10000
				        		});
							}

							if (response.errors.title[0] !== undefined)
							{
								Notification.error({
				        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.title[0],
				        			delay: 10000
				        		});
							}

							if (response.errors.category_list[0] !== undefined)
							{
								Notification.error({
				        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.category_list[0],
				        			delay: 10000
				        		});
							}

							if (response.errors.excerpt[0] !== undefined)
							{
								Notification.error({
				        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.excerpt[0],
				        			delay: 10000
				        		});
							}

							if (response.errors.body[0] !== undefined)
							{
								Notification.error({
				        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.body[0],
				        			delay: 10000
				        		});
							}

							if (response.errors.image_url[0] !== undefined)
							{
								Notification.error({
				        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.image_url[0],
				        			delay: 10000
				        		});
							}

							if (response.errors.published_at[0] !== undefined)
							{
								Notification.error({
				        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.published_at[0],
				        			delay: 10000
				        		});
							}

							if (response.errors.tag_list[0] !== undefined)
							{
								Notification.error({
				        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.tag_list[0],
				        			delay: 10000
				        		});
							}
						});
				};
			}
		}, 100);
	}
	else
	{
		$state.go('articles');

		$rootScope.notification.type = 'error';
		$rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
		$rootScope.notification.popup = true;
	}
};

articlesEditController.$injector = ['$scope', '$rootScope', '$state', '$stateParams', '$interval', 'Notification', 'blockUI', 'articleFactory'];

angular.module('blog')
	.controller('articlesEditController', articlesEditController);
var articlesFilterController = function($scope, $rootScope, $state, $stateParams, Notification, articleFactory)
{
	$scope.totalPages = 0;
	$scope.currentPage = 1;
	$scope.range = [];

	$scope.getArticles = function(pageNumber)
	{
		if(pageNumber===undefined)
		{
			pageNumber = '1';
		}

		if ($stateParams.filterBy === 'categories')
		{
			articleFactory.filterByCategory($stateParams.filterID, pageNumber)
				.success(function(response)
				{
					$scope.articles     = response.data;
					$scope.totalPages   = response.last_page;
					$scope.currentPage  = response.current_page;
		
					// Pagination Range
					var pages = [];
		
					for(var i=1;i<=response.last_page;i++) {          
			 			pages.push(i);
					}
		
					$scope.range = pages;

					articleFactory.getCategory($stateParams.filterID)
						.success(function(response)
						{
							$scope.filterCategory = response;
						});
				})
				.error(function(response)
				{
					$state.go('articles');
				});
		}
		else if ($stateParams.filterBy === 'tags')
		{
			articleFactory.filterByTag($stateParams.filterID, pageNumber)
				.success(function(response)
				{
					$scope.articles     = response.data;
					$scope.totalPages   = response.last_page;
					$scope.currentPage  = response.current_page;
		
					// Pagination Range
					var pages = [];
		
					for(var i=1;i<=response.last_page;i++) {          
			 			pages.push(i);
					}
		
					$scope.range = pages;

					articleFactory.getTag($stateParams.filterID)
						.success(function(response)
						{
							$scope.filterTag = response;
						});
				})
				.error(function(response)
				{
					$state.go('articles');
				});
		}
		else
		{
			$state.go('articles');
		}

		$scope.delete = function(slug)
		{
			articleFactory.deleteArticle(slug, $rootScope.token)
				.success(function()
				{
					Notification.success('<span class="fa fa-check-circle"></span> You successfully deleted article!');
				})
				.error(function(response)
				{
					Notification.error('<span class="fa fa-exclamation-circle"></span> You do not have permission!');
				});
		};
	};
};

articlesFilterController.$injector = ['$scope', '$rootScope', '$state', '$stateParams', 'Notification', 'articleFactory'];

angular.module('blog')
	.controller('articlesFilterController', articlesFilterController);
var articlesIndexController = function($scope, $rootScope, articleFactory, Notification)
{
	$scope.totalPages = 0;
	$scope.currentPage = 1;
	$scope.range = [];

	$scope.getArticles = function(pageNumber)
	{
		if(pageNumber===undefined)
		{
			pageNumber = '1';
		}

		articleFactory.getArticles(pageNumber)
			.success(function(response)
			{
				$scope.articles     = response.data;
				$scope.totalPages   = response.last_page;
				$scope.currentPage  = response.current_page;
	
				// Pagination Range
				var pages = [];
	
				for(var i=1;i<=response.last_page;i++) {          
		 			pages.push(i);
				}
	
				$scope.range = pages;

				$scope.delete = function(slug)
				{
					articleFactory.deleteArticle(slug, $rootScope.token)
						.success(function()
						{
							Notification.success('<span class="fa fa-check-circle"></span> You successfully deleted article!');
						})
						.error(function(response)
						{
							Notification.error('<span class="fa fa-exclamation-circle"></span> You do not have permission!');
						});
				};
			});
	};
};

articleFactory.$injector = ['$scope', '$rootScope', 'articleFactory', 'Notification'];

angular.module('blog')
	.controller('articlesIndexController', articlesIndexController);
var articlesShowController = function($scope, $rootScope, articleFactory, $stateParams, $timeout, $state, Notification, commentFactory, $window)
{
	var amount = 5;
	articleFactory.getArticle($stateParams.articleSlug)
		.success(function(article)
		{
			$scope.article = article;

			$scope.amount = amount;

			$scope.delete = function()
			{
				articleFactory.deleteArticle($stateParams.articleSlug, $rootScope.token)
					.success(function()
					{
						$state.go('articles');
			
						$rootScope.notification.type = 'success';
						$rootScope.notification.msg = '<span class="fa fa-check-circle"></span> You successfully deleted article!';
						$rootScope.notification.popup = true;
					})
					.error(function(response)
					{
						Notification.error('<span class="fa fa-exclamation-circle"></span> You do not have permission!');
					});
			};

			$scope.deleteComment = function(id)
			{
				commentFactory.deleteComment($stateParams.articleSlug, id, $rootScope.token)
					.success(function()
					{
						$window.location.reload();
					})
					.error(function(response)
					{
						Notification.error('<span class="fa fa-exclamation-circle"></span> You do not have permission!');
					});
			}

			$scope.loadComments = function() 
			{
		    	$rootScope.spinner.active = true;

				$timeout(function()
				{
					$rootScope.spinner.active = false;
					$scope.amount = $scope.amount + amount;
				}, 1000);
			};

			$timeout(function()
			{
				$rootScope.spinner.active = false;
			}, 1000);
		})
		.error(function(resource, status)
		{
			$state.go('articles');
			
			$rootScope.notification.type = 'error';
			$rootScope.notification.msg = '<span class="fa fa-exclamation-circle"></span> ' + resource.error;
			$rootScope.notification.popup = true;
		});
};

articlesShowController.$injector = ['$scope', '$rootScope', 'articleFactory', '$stateParams', '$timeout', '$state', 'Notification', 'commentFactory', '$window'];

angular.module('blog')
	.controller('articlesShowController', articlesShowController);
var sideBarController = function($scope, articleFactory)
{
	articleFactory.getCategoryList()
		.success(function(categories)
		{
			$scope.categories = categories;
		});
};

sideBarController.$injector = ['$scope', 'articleFactory'];

angular.module('blog')
	.controller('sideBarController', sideBarController);
var commentsCEController = function($scope, $rootScope, commentFactory, $state, $stateParams, Notification, $window, $interval)
{
	if ($stateParams.commentID === undefined)
	{
		$scope.type = "create";

		$scope.create = function()
		{
			data = {
				body: $scope.create_body
			};

			commentFactory.createComment($stateParams.articleSlug, data, $rootScope.token)
				.success(function()
				{
					$window.location.reload();
				})
				.error(function()
				{
					Notification.error('<span class="fa fa-exclamation-triangle"></span> You do not have permission!');
				});
		};
	}
	else
	{
		$scope.type = "edit";

		if ($rootScope.loggedIn)
		{
			var timer = $interval(function()
			{
				if ($rootScope.userObtained)
				{
					$interval.cancel(timer);
					delete timer;

					commentFactory.beforeEdit($stateParams.articleSlug, $stateParams.commentID, $rootScope.token)
						.success(function(response)
						{
							$scope.edit_body = response.body;

							$scope.edit = function()
							{
								data = {
									body: $scope.edit_body,
									token: $rootScope.token
								}

								commentFactory.editComment($stateParams.articleSlug, $stateParams.commentID, data)
									.success(function()
									{
										$state.go('articles_show', { articleSlug: $stateParams.articleSlug });
									})
									.error(function(response)
									{
										if (response.errors.body[0] !== undefined)
										{
											Notification.error({
							        			message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.body[0],
							        			delay: 10000
							        		});
										}
									});
							};
						})
						.error(function(response)
						{
							$state.go('articles_show', { articleSlug: $stateParams.articleSlug });

							$rootScope.notification.type = 'error';
							$rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
							$rootScope.notification.popup = true;
						});
				}
			});
		}
		else
		{
			$state.go('articles_show', { articleSlug: $stateParams.articleSlug });

			$rootScope.notification.type = 'error';
			$rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
			$rootScope.notification.popup = true;
		}
	}
};

commentsCEController.$injector = ['$scope', '$rootScope', 'commentFactory', 'Notification', '$window', '$interval'];

angular.module('blog')
	.controller('commentsCEController', commentsCEController);
var usersController = function($scope, $rootScope, $interval, blockUI)
{
	if ($rootScope.loggedIn)
	{
		blockUI.start();

		$scope.auth = {};

		$scope.auth.loggedIn = true;

		$interval(function()
		{
			if ($rootScope.userObtained)
			{
				$interval.cancel();
				$scope.auth.user = $rootScope.user;
				$scope.auth.token = $rootScope.token;
				blockUI.stop();
			}
		}, 100);
	}
	else
	{
		$scope.loggedIn = false;
	}
};

usersController.$injector = ['$scope', '$rootScope', '$interval', 'blockUI'];

angular.module('blog')
	.controller('usersController', usersController);
var usersEditController = function($scope, $rootScope, $stateParams, $state, userFactory, Notification)
{
	userFactory.getUser($stateParams.userID)
		.success(function(user, status)
		{
			$scope.user = user;

			if ($stateParams.editParam === 'email')
			{
				if ($rootScope.user.id === user.id || $rootScope.user.group_id === 1)
				{
					$scope.edit = 'email';
				}
				else
				{
					$state.go('users_show', { userID: $stateParams.userID });
				}
			}
			else if ($stateParams.editParam === 'password')
			{
				if ($rootScope.user.id === user.id || $rootScope.user.group_id === 1)
				{
					$scope.edit = 'password';
				}
				else
				{
					$state.go('users_show', { userID: $stateParams.userID });
				}
			}
			else
			{
				$state.go('users_show', { userID: $stateParams.userID });
			}
		})
		.error(function(resource, status)
		{
			$state.go('articles');
			
			$rootScope.notification.type = 'error';
			$rootScope.notification.msg = '<span class="fa fa-exclamation-circle"></span> ' + resource.error;
			$rootScope.notification.popup = true;
		});

	$scope.editEmail = function()
	{
		$state.go('users_edit', { userID: $stateParams.userID, editParam: 'email' });
	};

	$scope.editPassword = function()
	{
		$state.go('users_edit', { userID: $stateParams.userID, editParam: 'password' });
	};

	$scope.changeEmail = function()
	{
		var credentials = {
			email: $scope.email,
			email_confirmation: $scope.email_confirmation
		};

		userFactory.changeEmail($scope.user.id, credentials, $rootScope.token)
			.success(function()
			{
				$state.go('users_show', { userID: $stateParams.userID });

        		$rootScope.notification.type = 'success';
				$rootScope.notification.msg = '<span class="fa fa-check-circle"></span> You successfully changed email!';
				$rootScope.notification.popup = true;
			})
			.error(function(response)
			{
				Notification.error({
        				message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.email[0],
        				delay: 10000
        			});
			});
	};

	$scope.changePassword = function()
	{
		var credentials = {
			password: $scope.password,
			password_confirmation: $scope.password_confirmation
		};

		console.log($rootScope.token);
		
		userFactory.changePassword($scope.user.id, credentials, $rootScope.token)
			.success(function()
			{
				$state.go('users_show', { userID: $stateParams.userID });

        		$rootScope.notification.type = 'success';
				$rootScope.notification.msg = '<span class="fa fa-check-circle"></span> You successfully changed password!';
				$rootScope.notification.popup = true;
			})
			.error(function(response)
			{
				Notification.error({
        				message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.password[0],
        				delay: 10000
        			});
			});
	};
};

usersEditController.$injector = ['$scope', '$rootScope', '$stateParams', '$state', 'userFactory', 'Notification'];

angular.module('blog')
	.controller('usersEditController', usersEditController);
var usersRegisterController = function($rootScope, $scope, $state, userFactory, Notification)
{
    if ($rootScope.loggedIn)
    {
        $state.go('articles');
    }
    
	$scope.register = function()
	{
		var credentials = {
			username: $scope.username,
            email: $scope.email,
            password: $scope.password,
            password_confirmation: $scope.password_confirmation
        };

        userFactory.createUser(credentials)
        	.success(function()
        	{
        		$state.go('login');

        		$rootScope.notification.type = 'success';
				$rootScope.notification.msg = '<span class="fa fa-check-circle"></span> You successfully created account!';
				$rootScope.notification.popup = true;
        	})
        	.error(function(response)
        	{
        		if (response.errors.username !== undefined)
        		{
        			Notification.error({
        				message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.username[0],
        				delay: 10000
        			});
        		}

        		if (response.errors.email !== undefined)
        		{
        			Notification.error({
        				message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.email[0],
        				delay: 10000
        			});
        		}
        		
        		if (response.errors.password !== undefined)
        		{
        			Notification.error({
        				message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.password[0],
        				delay: 10000
        			});
        		}
        	})
	};
};

usersRegisterController.$injector = ['$rootScope', '$scope', '$state', '$window', '$cookies', 'userFactory'];

angular.module('blog')
	.controller('usersRegisterController', usersRegisterController);
var usersShowController = function($scope, userFactory, $stateParams, $rootScope, $timeout, $window, $state, Notification, $interval)
{
	userFactory.getUser($stateParams.userID)
		.success(function(user, status)
		{
			$scope.user = user;

			if ($stateParams.showParam !== undefined)
			{
				if ($stateParams.showParam === 'articles')
				{
					$scope.hideActivities = true;
					$scope.hideArticles = false;
					$scope.hideComments = true;
					$scope.lastActive = "";
					$scope.articlesActive = "active";
					$scope.commentsActive = "";

					$rootScope.spinner.active = true;

					userFactory.getUserArticles(user.id)
						.success(function(resource, status)
						{
							$scope.articles = resource.articles;
							$scope.articlesAmount = 6;

							$timeout(function()
							{
								$rootScope.spinner.active = false;
							}, 500);
						})
						.error(function(resource, status)
						{
							Notification.error(
							{
								message: '<span class="fa fa-exclamation-circle"></span> ' + resource.error
							});
						});
				}
				else if ($stateParams.showParam === 'comments')
				{
					$scope.hideActivities = true;
					$scope.hideArticles = true;
					$scope.hideComments = false;
					$scope.lastActive = "";
					$scope.articlesActive = "";
					$scope.commentsActive = "active";

					$rootScope.spinner.active = true;

					userFactory.getComments(user.id)
						.success(function(resource, status)
						{
							$scope.comments = resource.comments;
							$scope.commentsAmount = 5;

							$timeout(function()
							{
								$rootScope.spinner.active = false;
							}, 500);
						})
						.error(function(resource, status)
						{
							Notification.error(
							{
								message: '<span class="fa fa-exclamation-circle"></span> ' + resource.error
							});
						});
				}
				else
				{
					$state.go('users_show', { userID: $stateParams.userID });
				}
			}
			else
			{
				$scope.hideActivities = false;
				$scope.hideArticles = true;
				$scope.hideComments = true;
				$scope.lastActive = "active";
				$scope.articlesActive = "";
				$scope.commentsActive = "";
			}

			$scope.getActivities = function()
			{
				$scope.hideActivities = false;
				$scope.hideArticles = true;
				$scope.hideComments = true;
				$scope.lastActive = "active";
				$scope.articlesActive = "";
				$scope.commentsActive = "";
			};
			
			$scope.getArticles = function()
			{
				$scope.hideActivities = true;
				$scope.hideArticles = false;
				$scope.hideComments = true;
				$scope.lastActive = "";
				$scope.articlesActive = "active";
				$scope.commentsActive = "";

				$rootScope.spinner.active = true;

				userFactory.getUserArticles(user.id)
					.success(function(resource, status)
					{
						$scope.articles = resource.articles;
						$scope.articlesAmount = 6;

						$timeout(function()
						{
							$rootScope.spinner.active = false;
						}, 500);
					})
					.error(function(resource, status)
					{
						Notification.error(
						{
							message: '<span class="fa fa-exclamation-circle"></span> ' + resource.error
						});
					});
			};

			$scope.getComments = function()
			{
				$scope.hideActivities = true;
				$scope.hideArticles = true;
				$scope.hideComments = false;
				$scope.lastActive = "";
				$scope.articlesActive = "";
				$scope.commentsActive = "active";

				$rootScope.spinner.active = true;

				userFactory.getComments(user.id)
					.success(function(resource, status)
					{
						$scope.comments = resource.comments;
						$scope.commentsAmount = 5;

						$timeout(function()
						{
							$rootScope.spinner.active = false;
						}, 500);
					})
					.error(function(resource, status)
					{
						Notification.error(
						{
							message: '<span class="fa fa-exclamation-circle"></span> ' + resource.error
						});
					});
			};

			$scope.loadArticles = function()
			{
				$rootScope.spinner.active = true;

				$timeout(function()
				{
					$rootScope.spinner.active = false;
					$scope.articlesAmount = $scope.articlesAmount + 3;
				}, 1000);
			}
		})
		.error(function(resource, status)
		{
			$state.go('articles');
			
			$rootScope.notification.type = 'error';
			$rootScope.notification.msg = '<span class="fa fa-exclamation-circle"></span> ' + resource.error;
			$rootScope.notification.popup = true;
		});

	$scope.go = function(path) 
	{
		$window.open(path, '_blank');
	};

	$scope.getFirstPart = function(str) 
	{
    	return str.split('@')[0];
	}

	$scope.getSecondPart = function(str) 
	{
    	return str.split('@')[1];
	}
};

usersShowController.$injector = ['$scope', 'userFactory', '$stateParams', '$rootScope', '$timeout', '$window', '$state', 'Notification', '$interval'];

angular.module('blog')
	.controller('usersShowController', usersShowController);
//# sourceMappingURL=app.js.map
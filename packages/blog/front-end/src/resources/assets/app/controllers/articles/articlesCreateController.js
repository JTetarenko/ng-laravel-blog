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
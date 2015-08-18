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
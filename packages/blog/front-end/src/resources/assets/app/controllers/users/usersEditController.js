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
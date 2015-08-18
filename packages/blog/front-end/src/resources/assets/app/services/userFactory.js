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
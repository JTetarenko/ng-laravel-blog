angular.module('blog')
    .factory('userFactory', ['$http', '$rootScope',
        function($http, $rootScope)
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

            factory.getUserFromToken = function()
            {
                return $http.get($rootScope.endPoint + '/auth/user');
            };

            factory.createUser = function(credentials)
            {
                return $http.post($rootScope.endPoint + '/users', credentials);
            };

            factory.changeEmail = function(id, data)
            {
                return $http.put($rootScope.endPoint + '/users/' + id + '/edit/email', data);
            };

            factory.changePassword = function(id, data)
            {
                return $http.put($rootScope.endPoint + '/users/' + id + '/edit/password', data);
            };

            return factory;
        }
]);
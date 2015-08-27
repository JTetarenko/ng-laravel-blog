angular.module('blog')
    .factory('commentFactory', ['$http', '$rootScope',
        function($http, $rootScope)
        {
            var factory = {};

            factory.createComment = function(slug, data)
            {
                return $http.post($rootScope.endPoint + '/' + slug + '/comments', data);
            };

            factory.beforeEdit = function(slug, id)
            {
                return $http.get($rootScope.endPoint + '/' + slug + '/comments/' + id);
            };

            factory.editComment = function(slug, id, data)
            {
                return $http.put($rootScope.endPoint + '/' + slug + '/comments/' + id, data);
            };

            factory.deleteComment = function(slug, id)
            {
                return $http.delete($rootScope.endPoint + '/' + slug + '/comments/' + id);
            };

            return factory;
        }
]);
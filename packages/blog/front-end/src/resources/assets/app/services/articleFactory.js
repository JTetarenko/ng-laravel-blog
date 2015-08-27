angular.module('blog')
    .factory('articleFactory', ['$http', '$rootScope',
        function($http, $rootScope)
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

            factory.beforeCreateArticle = function()
            {
                return $http.get($rootScope.endPoint + '/articles/create');
            };

            factory.createArticle = function(data)
            {
                return $http.post($rootScope.endPoint + '/articles', data);
            };

            factory.beforeEditArticle = function(slug)
            {
                return $http.get($rootScope.endPoint + '/articles/' + slug + '/edit');
            };

            factory.editArticle = function(slug, data)
            {
                return $http.put($rootScope.endPoint + '/articles/' + slug, data);
            };

            factory.deleteArticle = function(slug)
            {
                return $http.delete($rootScope.endPoint + '/articles/' + slug);
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
        }
]);
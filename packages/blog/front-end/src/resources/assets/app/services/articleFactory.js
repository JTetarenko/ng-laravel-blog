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
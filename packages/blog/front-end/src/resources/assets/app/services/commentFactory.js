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
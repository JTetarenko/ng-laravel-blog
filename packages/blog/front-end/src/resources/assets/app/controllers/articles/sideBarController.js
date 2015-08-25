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
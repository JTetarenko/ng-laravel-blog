angular.module('blog')
    .controller('sideBarController', ['$scope', 'articleFactory',
        function($scope, articleFactory)
        {
            articleFactory.getCategoryList()
                .success(function(categories)
                {
                    $scope.categories = categories;
                });
        }
]);
var articlesEditController = function($scope, $rootScope, $state, $stateParams, $interval, Notification, blockUI, articleFactory)
{
    if ($rootScope.loggedIn)
    {
        blockUI.start();

        var timer = $interval(function()
        {
            if ($rootScope.userObtained)
            {
                $interval.cancel(timer);
                delete timer;

                articleFactory.beforeEditArticle($stateParams.articleSlug, $rootScope.token)
                    .success(function(response)
                    {
                        $scope.article = response.article;
                        $scope.categories = response.categories;
                        $scope.tags = response.tags;

                        $scope.slug = response.article.slug;
                        $scope.category_list = response.article.categories;
                        $scope.title = response.article.title;
                        $scope.excerpt = response.article.excerpt;
                        $scope.body = response.article.body;
                        $scope.image_url = response.article.image_url;
                        $scope.published_at = new Date(response.article.published_at.date);
                        $scope.tag_list = response.article.tags;

                        $scope.category_list = [];
                        $scope.tag_list = [];

                        for (i=0; i<response.categories.length; i++)
                        {
                            for(j=0; j<response.article.categories.length; j++)
                            {
                                if (response.categories[i].id === response.article.categories[j].id)
                                {
                                    $scope.category_list.push(response.categories[i]);
                                }
                            }
                        }               

                        $scope.$watch('category_list', function(nowSelected){
                            $scope.selectedCategories = [];
                            
                            if( ! nowSelected ){
                                // here we've initialized selected already
                                // but sometimes that's not the case
                                // then we get null or undefined
                                return;
                            }
                            angular.forEach(nowSelected, function(val){
                                $scope.selectedCategories.push( val.id.toString() );
                                $('#category_list').select2("val", $scope.selectedCategories);                          
                            });
                        });

                        blockUI.stop();
                    })
                    .error(function(response)
                    {
                        blockUI.stop();
                        $state.go('articles');

                        $rootScope.notification.type = 'error';
                        $rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
                        $rootScope.notification.popup = true;
                    });

                $scope.edit = function()
                {
                    console.log($rootScope.token);
                    if (tag_list.length > 0)
                    {
                        data = {
                            token: $rootScope.token,
                            slug: $scope.slug,
                            title: $scope.title,
                            category_list: $scope.selectedCategories,
                            excerpt: $scope.excerpt,
                            body: $scope.body,
                            image_url: $scope.image_url,
                            published_at: moment($scope.published_at).format('YYYY-MM-DD'),
                            tag_list: $scope.tag_list
                        }
                    }
                    else
                    {
                        data = {
                            token: $rootScope.token,
                            slug: $scope.slug,
                            title: $scope.title,
                            category_list: $scope.category_list,
                            excerpt: $scope.excerpt,
                            body: $scope.body,
                            image_url: $scope.image_url,
                            published_at: moment($scope.published_at).format('YYYY-MM-DD')
                        }
                    }
                    
                    articleFactory.editArticle($scope.slug, data)
                        .success(function()
                        {
                            $state.go('articles');

                            $rootScope.notification.type = 'success';
                            $rootScope.notification.msg = '<span class="fa fa-check-circle"></span> You successfully edited article!';
                            $rootScope.notification.popup = true;
                        })
                        .error(function(response)
                        {
                            console.log(response);
                            if (response.errors.slug[0] !== undefined)
                            {
                                Notification.error({
                                    message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.slug[0],
                                    delay: 10000
                                });
                            }

                            if (response.errors.title[0] !== undefined)
                            {
                                Notification.error({
                                    message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.title[0],
                                    delay: 10000
                                });
                            }

                            if (response.errors.category_list[0] !== undefined)
                            {
                                Notification.error({
                                    message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.category_list[0],
                                    delay: 10000
                                });
                            }

                            if (response.errors.excerpt[0] !== undefined)
                            {
                                Notification.error({
                                    message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.excerpt[0],
                                    delay: 10000
                                });
                            }

                            if (response.errors.body[0] !== undefined)
                            {
                                Notification.error({
                                    message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.body[0],
                                    delay: 10000
                                });
                            }

                            if (response.errors.image_url[0] !== undefined)
                            {
                                Notification.error({
                                    message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.image_url[0],
                                    delay: 10000
                                });
                            }

                            if (response.errors.published_at[0] !== undefined)
                            {
                                Notification.error({
                                    message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.published_at[0],
                                    delay: 10000
                                });
                            }

                            if (response.errors.tag_list[0] !== undefined)
                            {
                                Notification.error({
                                    message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.tag_list[0],
                                    delay: 10000
                                });
                            }
                        });
                };
            }
        }, 100);
    }
    else
    {
        $state.go('articles');

        $rootScope.notification.type = 'error';
        $rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
        $rootScope.notification.popup = true;
    }
};

articlesEditController.$injector = ['$scope', '$rootScope', '$state', '$stateParams', '$interval', 'Notification', 'blockUI', 'articleFactory'];

angular.module('blog')
    .controller('articlesEditController', articlesEditController);
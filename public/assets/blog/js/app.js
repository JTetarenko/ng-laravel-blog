var blog = angular.module('blog', [
    'ui.router',
    'ngAnimate',
    'angular-loading-bar',
    'yaru22.angular-timeago',
    'blockUI',
    'ui.bootstrap',
    'ui-notification',
    'treasure-overlay-spinner',
    'ngCookies'
], 
function($interpolateProvider) 
{
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
})

.config(['$httpProvider', '$provide', function($httpProvider, $provide) 
{
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $provide.factory('ErrorInterceptor', function ($q) {
            return {
                responseError: function(rejection) {
                    return $q.reject(rejection);
                }
            };
        });
        
        $httpProvider.interceptors.push('ErrorInterceptor');
        $httpProvider.interceptors.push('AuthInterceptor');
}])

.run(function($rootScope, $cookies, $http, $interval, $state, Notification, $window, $timeout)
{
    $rootScope.endPoint = 'http://myblog.lv/api';
    $rootScope.spinner = {
        active: true
    };

    $rootScope.notification = {
        type: '',
        msg: '',
        popup: false
    };

    if ($cookies.get('token') !== undefined)
    {
        $interval(function()
        {
            $http.get($rootScope.endPoint + '/auth/refresh-token?token=' + $rootScope.token)
                .success(function(response)
                {
                    $cookies.put('token', response.token);
                })
                .error(function()
                {
                    $cookies.remove('user');
                    $cookies.remove('token');

                    $state.go('login');


                    $timeout(function()
                    {
                        $window.location.reload();
                    }, 200);
                });
        }, 60000);
    }
});
angular.module('blog') 
    .directive('postsPagination', function()
    {  
        return {
           restrict: 'E',
           template: '<ul class="pagination">'+
             '<li ng-show="currentPage != 1"><a href="javascript:void(0)" ng-click="getArticles(1)">&laquo;</a></li>'+
             '<li ng-show="currentPage != 1"><a href="javascript:void(0)" ng-click="getArticles(currentPage-1)">&lsaquo; Prev</a></li>'+
             '<li ng-repeat="i in range" ng-class="{active : currentPage == i}">'+
                 '<a href="javascript:void(0)" ng-click="getArticles(i)">{{i}}</a>'+
              '</li>'+
              '<li ng-show="currentPage != totalPages"><a href="javascript:void(0)" ng-click="getArticles(currentPage+1)">Next &rsaquo;</a></li>'+
              '<li ng-show="currentPage != totalPages"><a href="javascript:void(0)" ng-click="getArticles(totalPages)">&raquo;</a></li>'+
            '</ul>'
        };
    })
    .directive('ckEditor', function() {
        return {
            require: '?ngModel',
            link: function(scope, elm, attr, ngModel) {
                var ck = CKEDITOR.replace(elm[0]);

                if (!ngModel) return;

                ck.on('pasteState', function() {
                  scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                  });
                });

                ngModel.$render = function(value) {
                    ck.setData(ngModel.$viewValue);
                };
            }
        };
    });
angular.module('blog')  
    .config(function($stateProvider, $urlRouterProvider, $sceProvider, NotificationProvider)
    {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', 
            {
                url: '/',
                templateUrl: '/views/articles',
                controller: 'articlesIndexController'
            })
            .state('login',
            {
                url: '/auth/login',
                templateUrl: 'views/auth/login',
                controller: 'authController'
            })
            .state('register',
            {
                url: '/auth/register',
                templateUrl: 'views/auth/register',
                controller: 'usersRegisterController'
            })
            .state('logout',
            {
                url: '/auth/logout',
                controller: 'logoutController'
            })
            .state('articles',
            {
                url: '/articles/',
                templateUrl: '/views/articles',
                controller: 'articlesIndexController'
            })
            .state('articles_create',
            {
                url: '/articles/create',
                templateUrl: '/views/articles/create',
                controller: 'articlesCreateController'
            })
            .state('articles_edit',
            {
                url: '/articles/:articleSlug/edit',
                templateUrl: '/views/articles/edit',
                controller: 'articlesEditController'
            })
            .state('comments_edit',
            {
                url: '/articles/:articleSlug/comments/:commentID/edit',
                templateUrl: '/views/articles/show',
                controller: 'articlesShowController'
            })
            .state('articles_show',
            {
                url: '/articles/:articleSlug',
                templateUrl: '/views/articles/show',
                controller: 'articlesShowController'
            })
            .state('articles_filter',
            {
                url: '/articles/:filterBy/:filterID',
                templateUrl: '/views/articles/filter',
                controller: 'articlesFilterController'
            })
            .state('users_show',
            {
                url: '/users/:userID',
                templateUrl: '/views/users/show',
                controller: 'usersShowController'
            })
            .state('users_show_stuff',
            {
                url: '/users/:userID/:showParam',
                templateUrl: '/views/users/show',
                controller: 'usersShowController'
            })
            .state('users_edit',
            {
                url: '/users/:userID/edit/:editParam',
                templateUrl: '/views/users/edit',
                controller: 'usersEditController'
            });

        NotificationProvider.setOptions(
        {
            delay: 5000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });
        
        $sceProvider.enabled(false);
    });
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
angular.module('blog')
  .factory('AuthInterceptor', ['$rootScope', '$q', '$location', '$injector', '$window', '$cookies',
    function ($rootScope, $q, $state, $injector, $window, $cookies) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($cookies.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookies.get('token');
                }
                return config;
            },
            'response': function (response) {
                if(response.headers('Authorization')) {
                    var token = response.headers('Authorization').replace('Bearer ', '');
                    $cookies.put('token', token);
                }
                return response;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403 || response.status === 400 || response.status === 404) {
                    if (response.data.error === 'token_not_provided' ||
                        response.data.error === 'token_expired' ||
                        response.data.error === 'token_invalid' ||
                        response.data.error === 'user_not_found') {
                        $state.go('login');
                    }
                }
                return $q.reject(response);
            }
        };
    }]);
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
angular.module('blog')
    .controller('authController', ['$scope', '$rootScope', 'Notification', 'userFactory', '$cookies', '$window', '$state',
        function($scope, $rootScope, Notification, userFactory, $cookies, $window, $state)
        {
            if ($cookies.get('token') !== undefined)
            {
                $state.go('home');
            }

            $scope.login = function()
            {
                var credentials = {
                    email: $scope.email,
                    password: $scope.password
                }

                userFactory.login(credentials)
                    .success(function(response)
                    {
                        $cookies.put('token', response.token);

                        userFactory.getUserFromToken($cookies.get('token'))
                            .success(function(data)
                            {
                                $cookies.putObject('user', data.user);

                                $window.location.reload();
                            })
                            .error(function(error)
                            {
                                Notification.error('<span class="fa fa-exclamation-circle"></span> ' + error);
                            });
                    })
                    .error(function(response)
                    {
                        Notification.error('<span class="fa fa-exclamation-circle"></span> ' + response.error);
                    });
            }
        }
]);
angular.module('blog')
    .controller('logoutController', ['$rootScope', '$cookies', '$state', '$window',
        function($rootScope, $cookies, $state, $window)
        {
            if ($cookies.get('token') !== undefined)
            {
                $cookies.remove('token');
                $cookies.remove('user');

                $window.location.reload();
            }
            else
            {
                $state.go('home');
            }
        }
]);
angular.module('blog')
    .controller('notificationController', ['$scope', '$rootScope', 'Notification',
        function($scope, $rootScope, Notification)
        {
            if ($rootScope.notification.popup)
            {
                if ($rootScope.notification.type === 'success')
                {
                    Notification.success($rootScope.notification.msg);
                    $rootScope.notification.popup = false;
                }
                
                if ($rootScope.notification.type === 'error')
                {
                    Notification.error($rootScope.notification.msg);
                    $rootScope.notification.popup = false;
                }
                
                if ($rootScope.notification.type === 'warning')
                {
                    Notification.warning($rootScope.notification.msg);
                    $rootScope.notification.popup = false;
                }
                
                if ($rootScope.notification.type === 'info')
                {
                    Notification.info($rootScope.notification.msg);
                    $rootScope.notification.popup = false;
                }
                
                if ($rootScope.notification.type === 'primary')
                {
                    Notification($rootScope.notification.msg);
                    $rootScope.notification.popup = false;
                }
            }
        }
]);
angular.module('blog')
    .controller('articlesCreateController', ['$scope', '$state', 'Notification', 'articleFactory',
        function($scope, $state, Notification, articleFactory)
        {
            $scope.published_at = new Date();

            articleFactory.beforeCreateArticle()
                .success(function(response)
                {
                    $scope.category_list = [];
                    $scope.tag_list = [];

                    $scope.categories = response.categories;
                    $scope.tags = response.tags;
                })
                .error(function(response)
                {
                    $state.go('articles');

                    $rootScope.notification.type = 'error';
                    $rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
                    $rootScope.notification.popup = true;
                });
            
            $scope.create = function()
            {
                if (tag_list.length > 0)
                {
                    data = {
                        slug: $scope.slug,
                        title: $scope.title,
                        category_list: $scope.category_list,
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
                        slug: $scope.slug,
                        title: $scope.title,
                        category_list: $scope.category_list,
                        excerpt: $scope.excerpt,
                        body: $scope.body,
                        image_url: $scope.image_url,
                        published_at: moment($scope.published_at).format('YYYY-MM-DD')
                    }
                }
                
                articleFactory.createArticle(data)
                    .success(function()
                    {
                        $state.go('articles');

                        $rootScope.notification.type = 'success';
                        $rootScope.notification.msg = '<span class="fa fa-check-circle"></span> You successfully added article!';
                        $rootScope.notification.popup = true;
                    })
                    .error(function(response)
                    {
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
            }
        }
]);
angular.module('blog')
    .controller('articlesEditController', ['$scope', '$state', '$stateParams', 'Notification', 'articleFactory',
        function($scope, $state, $stateParams, Notification, articleFactory)
        {
            articleFactory.beforeEditArticle($stateParams.articleSlug)
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
                })
                .error(function(response)
                {
                    $state.go('articles');

                    $rootScope.notification.type = 'error';
                    $rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
                    $rootScope.notification.popup = true;
                });

                $scope.edit = function()
                {
                    if (tag_list.length > 0)
                    {
                        data = {
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
]);
angular.module('blog')
    .controller('articlesFilterController', ['$scope', '$state', '$stateParams', 'Notification', 'articleFactory',
        function($scope, $state, $stateParams, Notification, articleFactory)
        {
            $scope.totalPages = 0;
            $scope.currentPage = 1;
            $scope.range = [];

            $scope.getArticles = function(pageNumber)
            {
                if(pageNumber===undefined)
                {
                    pageNumber = '1';
                }

                if ($stateParams.filterBy === 'categories')
                {
                    articleFactory.filterByCategory($stateParams.filterID, pageNumber)
                        .success(function(response)
                        {
                            $scope.articles     = response.data;
                            $scope.totalPages   = response.last_page;
                            $scope.currentPage  = response.current_page;
                
                            // Pagination Range
                            var pages = [];
                
                            for(var i=1;i<=response.last_page;i++) {          
                                pages.push(i);
                            }
                
                            $scope.range = pages;

                            articleFactory.getCategory($stateParams.filterID)
                                .success(function(response)
                                {
                                    $scope.filterCategory = response;
                                });
                        })
                        .error(function(response)
                        {
                            $state.go('articles');
                        });
                }
                else if ($stateParams.filterBy === 'tags')
                {
                    articleFactory.filterByTag($stateParams.filterID, pageNumber)
                        .success(function(response)
                        {
                            $scope.articles     = response.data;
                            $scope.totalPages   = response.last_page;
                            $scope.currentPage  = response.current_page;
                
                            // Pagination Range
                            var pages = [];
                
                            for(var i=1;i<=response.last_page;i++) {          
                                pages.push(i);
                            }
                
                            $scope.range = pages;

                            articleFactory.getTag($stateParams.filterID)
                                .success(function(response)
                                {
                                    $scope.filterTag = response;
                                });
                        })
                        .error(function(response)
                        {
                            $state.go('articles');
                        });
                }
                else
                {
                    $state.go('articles');
                }

                $scope.delete = function(slug)
                {
                    articleFactory.deleteArticle(slug)
                        .success(function()
                        {
                            Notification.success('<span class="fa fa-check-circle"></span> You successfully deleted article!');
                        })
                        .error(function(response)
                        {
                            Notification.error('<span class="fa fa-exclamation-circle"></span> You do not have permission!');
                        });
                };
            };
        }
]);
angular.module('blog')
    .controller('articlesIndexController', ['$scope', 'articleFactory', 'Notification', '$window',
        function($scope, articleFactory, Notification, $window)
        {
            $scope.totalPages = 0;
            $scope.currentPage = 1;
            $scope.range = [];

            $scope.getArticles = function(pageNumber)
            {
                if(pageNumber===undefined)
                {
                    pageNumber = '1';
                }

                articleFactory.getArticles(pageNumber)
                    .success(function(response)
                    {
                        $scope.articles     = response.data;
                        $scope.totalPages   = response.last_page;
                        $scope.currentPage  = response.current_page;
            
                        // Pagination Range
                        var pages = [];
            
                        for(var i=1;i<=response.last_page;i++) 
                        {
                            pages.push(i);
                        }
            
                        $scope.range = pages;

                        $scope.delete = function(slug)
                        {
                            articleFactory.deleteArticle(slug)
                                .success(function()
                                {
                                    Notification.success('<span class="fa fa-check-circle"></span> You successfully deleted article!');
                                    $window.location.reload();
                                })
                                .error(function(response)
                                {
                                    Notification.error('<span class="fa fa-exclamation-circle"></span> You do not have permission!');
                                });
                        };
                    });
            };
        }
]);
angular.module('blog')
    .controller('articlesShowController', ['$scope', 'articleFactory', '$stateParams', '$timeout', '$state', 'Notification', 'commentFactory', '$window',
        function($scope, articleFactory, $stateParams, $timeout, $state, Notification, commentFactory, $window)
        {
            var amount = 5;
            articleFactory.getArticle($stateParams.articleSlug)
                .success(function(article)
                {
                    $scope.article = article;

                    $scope.amount = amount;

                    $scope.delete = function()
                    {
                        articleFactory.deleteArticle($stateParams.articleSlug)
                            .success(function()
                            {
                                $state.go('articles');
                    
                                $rootScope.notification.type = 'success';
                                $rootScope.notification.msg = '<span class="fa fa-check-circle"></span> You successfully deleted article!';
                                $rootScope.notification.popup = true;
                            })
                            .error(function(response)
                            {
                                Notification.error('<span class="fa fa-exclamation-circle"></span> You do not have permission!');
                            });
                    };

                    $scope.deleteComment = function(id)
                    {
                        commentFactory.deleteComment($stateParams.articleSlug, id)
                            .success(function()
                            {
                                $window.location.reload();
                            })
                            .error(function(response)
                            {
                                Notification.error('<span class="fa fa-exclamation-circle"></span> You do not have permission!');
                            });
                    }

                    $scope.loadComments = function() 
                    {
                        $rootScope.spinner.active = true;

                        $timeout(function()
                        {
                            $rootScope.spinner.active = false;
                            $scope.amount = $scope.amount + amount;
                        }, 1000);
                    };

                    $timeout(function()
                    {
                        $rootScope.spinner.active = false;
                    }, 1000);
                })
                .error(function(resource, status)
                {
                    $state.go('articles');
                    
                    $rootScope.notification.type = 'error';
                    $rootScope.notification.msg = '<span class="fa fa-exclamation-circle"></span> ' + resource.error;
                    $rootScope.notification.popup = true;
                });
        }
]);
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
angular.module('blog')
    .controller('commentsCEController', ['$scope', '$cookies', 'commentFactory', '$state', '$stateParams', 'Notification', '$window',
        function($scope, $cookies, commentFactory, $state, $stateParams, Notification, $window)
        {
            if ($stateParams.commentID === undefined)
            {
                $scope.type = "create";

                $scope.create = function()
                {
                    data = {
                        body: $scope.create_body
                    };

                    commentFactory.createComment($stateParams.articleSlug, data)
                        .success(function()
                        {
                            $window.location.reload();
                        })
                        .error(function()
                        {
                            Notification.error('<span class="fa fa-exclamation-triangle"></span> You do not have permission!');
                        });
                };
            }
            else
            {
                $scope.type = "edit";

                commentFactory.beforeEdit($stateParams.articleSlug, $stateParams.commentID)
                    .success(function(response)
                    {
                        $scope.edit_body = response.body;

                        $scope.edit = function()
                        {
                            data = {
                                body: $scope.edit_body,
                                token: $rootScope.token
                            }

                            commentFactory.editComment($stateParams.articleSlug, $stateParams.commentID, data)
                                .success(function()
                                {
                                    $state.go('articles_show', { articleSlug: $stateParams.articleSlug });
                                })
                                .error(function(response)
                                {
                                    if (response.errors.body[0] !== undefined)
                                    {
                                        Notification.error({
                                            message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.body[0],
                                            delay: 10000
                                        });
                                    }
                                });
                        };
                    })
                    .error(function(response)
                    {
                        $state.go('articles_show', { articleSlug: $stateParams.articleSlug });

                        $rootScope.notification.type = 'error';
                        $rootScope.notification.msg = '<span class="fa fa-exclamation-triangle"></span> You do not have permission to access this page!';
                        $rootScope.notification.popup = true;
                    });
            }
        }
]);
angular.module('blog')
    .controller('usersController', ['$scope', '$cookies',
        function($scope, $cookies)
        {
            $scope.auth = {};

            if ($cookies.get('token') !== undefined)
            {
                $scope.auth.loggedIn = true;

                $scope.auth.user = $cookies.getObject('user');
            }
            else
            {
                $scope.auth.loggedIn = false;
            }
        }
]);
angular.module('blog')
    .controller('usersEditController', ['$scope', '$cookies', '$stateParams', '$state', 'userFactory', 'Notification',
        function($scope, $cookies, $stateParams, $state, userFactory, Notification)
        {
            userFactory.getUser($stateParams.userID)
                .success(function(user)
                {
                    $scope.user = user;

                    authedUser = $cookies.getObject('user');

                    if ($stateParams.editParam === 'email')
                    {
                        if (authedUser.id === user.id || authedUser.group_id === 1)
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
                        if (authedUser.id === user.id || authedUser.group_id === 1)
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

                userFactory.changeEmail($scope.user.id, credentials)
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
                
                userFactory.changePassword($scope.user.id, credentials)
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
        }
]);
angular.module('blog')
    .controller('usersRegisterController', ['$scope', '$state', 'userFactory', 'Notification', '$cookies',
        function($scope, $state, userFactory, Notification, $cookies)
        {
            if ($cookies.get('token') !== undefined)
            {
                $state.go('articles');
            }
            
            $scope.register = function()
            {
                var credentials = {
                    username: $scope.username,
                    email: $scope.email,
                    password: $scope.password,
                    password_confirmation: $scope.password_confirmation
                };

                userFactory.createUser(credentials)
                    .success(function()
                    {
                        $state.go('login');

                        $rootScope.notification.type = 'success';
                        $rootScope.notification.msg = '<span class="fa fa-check-circle"></span> You successfully created account!';
                        $rootScope.notification.popup = true;
                    })
                    .error(function(response)
                    {
                        if (response.errors.username !== undefined)
                        {
                            Notification.error({
                                message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.username[0],
                                delay: 10000
                            });
                        }

                        if (response.errors.email !== undefined)
                        {
                            Notification.error({
                                message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.email[0],
                                delay: 10000
                            });
                        }
                        
                        if (response.errors.password !== undefined)
                        {
                            Notification.error({
                                message: '<i class="fa fa-exclamation-circle"></i> ' + response.errors.password[0],
                                delay: 10000
                            });
                        }
                    })
            };
        }
]);
angular.module('blog')
    .controller('usersShowController', ['$scope', 'userFactory', '$stateParams', '$rootScope', '$timeout', '$window', '$state', 'Notification',
        function($scope, userFactory, $stateParams, $rootScope, $timeout, $window, $state, Notification)
        {
            userFactory.getUser($stateParams.userID)
                .success(function(user, status)
                {
                    $scope.user = user;

                    if ($stateParams.showParam !== undefined)
                    {
                        if ($stateParams.showParam === 'articles')
                        {
                            $scope.hideActivities = true;
                            $scope.hideArticles = false;
                            $scope.hideComments = true;
                            $scope.lastActive = "";
                            $scope.articlesActive = "active";
                            $scope.commentsActive = "";

                            $rootScope.spinner.active = true;

                            userFactory.getUserArticles(user.id)
                                .success(function(resource, status)
                                {
                                    $scope.articles = resource.articles;
                                    $scope.articlesAmount = 6;

                                    $timeout(function()
                                    {
                                        $rootScope.spinner.active = false;
                                    }, 500);
                                })
                                .error(function(resource, status)
                                {
                                    Notification.error(
                                    {
                                        message: '<span class="fa fa-exclamation-circle"></span> ' + resource.error
                                    });
                                });
                        }
                        else if ($stateParams.showParam === 'comments')
                        {
                            $scope.hideActivities = true;
                            $scope.hideArticles = true;
                            $scope.hideComments = false;
                            $scope.lastActive = "";
                            $scope.articlesActive = "";
                            $scope.commentsActive = "active";

                            $rootScope.spinner.active = true;

                            userFactory.getComments(user.id)
                                .success(function(resource, status)
                                {
                                    $scope.comments = resource.comments;
                                    $scope.commentsAmount = 5;

                                    $timeout(function()
                                    {
                                        $rootScope.spinner.active = false;
                                    }, 500);
                                })
                                .error(function(resource, status)
                                {
                                    Notification.error(
                                    {
                                        message: '<span class="fa fa-exclamation-circle"></span> ' + resource.error
                                    });
                                });
                        }
                        else
                        {
                            $state.go('users_show', { userID: $stateParams.userID });
                        }
                    }
                    else
                    {
                        $scope.hideActivities = false;
                        $scope.hideArticles = true;
                        $scope.hideComments = true;
                        $scope.lastActive = "active";
                        $scope.articlesActive = "";
                        $scope.commentsActive = "";
                    }

                    $scope.getActivities = function()
                    {
                        $scope.hideActivities = false;
                        $scope.hideArticles = true;
                        $scope.hideComments = true;
                        $scope.lastActive = "active";
                        $scope.articlesActive = "";
                        $scope.commentsActive = "";
                    };
                    
                    $scope.getArticles = function()
                    {
                        $scope.hideActivities = true;
                        $scope.hideArticles = false;
                        $scope.hideComments = true;
                        $scope.lastActive = "";
                        $scope.articlesActive = "active";
                        $scope.commentsActive = "";

                        $rootScope.spinner.active = true;

                        userFactory.getUserArticles(user.id)
                            .success(function(resource, status)
                            {
                                $scope.articles = resource.articles;
                                $scope.articlesAmount = 6;

                                $timeout(function()
                                {
                                    $rootScope.spinner.active = false;
                                }, 500);
                            })
                            .error(function(resource, status)
                            {
                                Notification.error(
                                {
                                    message: '<span class="fa fa-exclamation-circle"></span> ' + resource.error
                                });
                            });
                    };

                    $scope.getComments = function()
                    {
                        $scope.hideActivities = true;
                        $scope.hideArticles = true;
                        $scope.hideComments = false;
                        $scope.lastActive = "";
                        $scope.articlesActive = "";
                        $scope.commentsActive = "active";

                        $rootScope.spinner.active = true;

                        userFactory.getComments(user.id)
                            .success(function(resource, status)
                            {
                                $scope.comments = resource.comments;
                                $scope.commentsAmount = 5;

                                $timeout(function()
                                {
                                    $rootScope.spinner.active = false;
                                }, 500);
                            })
                            .error(function(resource, status)
                            {
                                Notification.error(
                                {
                                    message: '<span class="fa fa-exclamation-circle"></span> ' + resource.error
                                });
                            });
                    };

                    $scope.loadArticles = function()
                    {
                        $rootScope.spinner.active = true;

                        $timeout(function()
                        {
                            $rootScope.spinner.active = false;
                            $scope.articlesAmount = $scope.articlesAmount + 3;
                        }, 1000);
                    }
                })
                .error(function(resource, status)
                {
                    $state.go('articles');
                    
                    $rootScope.notification.type = 'error';
                    $rootScope.notification.msg = '<span class="fa fa-exclamation-circle"></span> ' + resource.error;
                    $rootScope.notification.popup = true;
                });

            $scope.go = function(path) 
            {
                $window.open(path, '_blank');
            };

            $scope.getFirstPart = function(str) 
            {
                return str.split('@')[0];
            }

            $scope.getSecondPart = function(str) 
            {
                return str.split('@')[1];
            }
        }
]);
//# sourceMappingURL=app.js.map
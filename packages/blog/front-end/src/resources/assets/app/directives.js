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
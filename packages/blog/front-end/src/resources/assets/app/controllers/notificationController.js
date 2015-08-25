var notificationController = function($scope, $rootScope, Notification)
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
};

notificationController.$injector = ['$scope', '$rootScope', 'Notification'];

angular.module('blog')
    .controller('notificationController', notificationController);
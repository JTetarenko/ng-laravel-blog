<!DOCTYPE html>
<html ng-app="blog">
<head>
    <title>@yield('title', 'My Blog - Articles')</title>

    <!-- Stylesheets !-->
    {!! HTML::style('assets/blog/bower_components/bootstrap/dist/css/bootstrap.css') !!}
    {!! HTML::style('assets/blog/bower_components/bootstrap/dist/css/bootstrap-theme.min.css') !!}
    {!! HTML::style('assets/blog/bower_components/angular-loading-bar/build/loading-bar.css') !!}
    {!! HTML::style('assets/blog/bower_components/angular-block-ui/dist/angular-block-ui.css') !!}
    {!! HTML::style('https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css') !!}
    {!! HTML::style('assets/blog/bower_components/angular-ui-notification/dist/angular-ui-notification.min.css') !!}
    {!! HTML::style('assets/blog/bower_components/angular-treasure-overlay-spinner/src/treasure-overlay-spinner.css') !!}
    {!! HTML::style('http://fonts.googleapis.com/css?family=Roboto:300,400,500,700') !!}
    {!! HTML::style('//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css') !!}
    {!! HTML::style('assets/blog/css/main.css') !!}

</head>
<body>

    @include('blog::partials.navbar')

    <div class="container">

        <div ui-view class="fade"></div>

        @include('blog::partials.footer')

    </div>

    <!-- Scripts !-->
    {!! HTML::script('assets/blog/bower_components/jquery/dist/jquery.js') !!}
    {!! HTML::script('https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.min.js') !!}
    {!! HTML::script('assets/blog/bower_components/angular-ui-router/release/angular-ui-router.js') !!}
    {!! HTML::script('assets/blog/bower_components/angular-animate/angular-animate.js') !!}
    {!! HTML::script('assets/blog/bower_components/angular-bootstrap/ui-bootstrap.js') !!}
    {!! HTML::script('assets/blog/bower_components/angular-bootstrap/ui-bootstrap-tpls.js') !!}
    {!! HTML::script('assets/blog/bower_components/angular-loading-bar/build/loading-bar.js') !!}
    {!! HTML::script('assets/blog/bower_components/angular-block-ui/dist/angular-block-ui.js') !!}
    {!! HTML::script('assets/blog/bower_components/angular-timeago/src/timeago.js') !!}
    {!! HTML::script('assets/blog/bower_components/angular-ui-notification/dist/angular-ui-notification.min.js') !!}
    {!! HTML::script('assets/blog/bower_components/angular-cookies/angular-cookies.min.js') !!}
    {!! HTML::script('assets/blog/bower_components/angular-treasure-overlay-spinner/src/treasure-overlay-spinner.js') !!}
    {!! HTML::script('assets/blog/bower_components/ng-busy/build/angular-busy.min.js') !!}
    {!! HTML::script('//cdn.ckeditor.com/4.5.1/standard/ckeditor.js') !!}
    {!! HTML::script('//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.min.js') !!}
    {!! HTML::script('assets/blog/bower_components/moment/min/moment.min.js') !!}
    {!! HTML::script('assets/blog/js/app.js') !!}

</body>
</html>
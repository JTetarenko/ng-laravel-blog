<span ng-controller="usersController">
<nav class="navbar navbar-inverse navbar-static-top" role="navigation">
    <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="">Blog</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li>
                    <a ui-sref="articles"><span class="glyphicon glyphicon-home"></span> Home</a>
                </li>
                <li ng-show="auth.loggedIn && auth.user.group_id <= 2">
                    <a ui-sref="articles_create"><span class="glyphicon glyphicon-plus"></span> Add article</a>
                </li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
                <a ng-hide="auth.loggedIn" ui-sref="login" class="btn btn-primary navbar-btn"><span class="glyphicon glyphicon-log-in"></span> Sign in</a>
                <li ng-show="loggedIn" dropdown dropdown-nav-account>
                  <a href="" id="nav-account" class="dropdown-toggle" dropdown-toggle role="button"><span class="glyphicon glyphicon-user"></span> <b style="text-transform: capitalize">@{{ auth.user.username }}</b> <span class="caret"></span></a>
                  <ul class="dropdown-menu" role="menu" aria-labelledby="nav-account">
                    <li role="menuitem"><a ng-click="showProfile()" ui-sref="users_show({ userID: auth.user.id })">Show Profile</a></li>
                    <li ng-hide="auth.user.group_id > 2" role="menuitem"><a ng-click="showArticles()" ui-sref="users_show_stuff({ userID: auth.user.id, showParam: 'articles' })">My Articles</a></li>
                    <li role="menuitem"><a ng-click="showComments()" ui-sref="users_show_stuff({ userID: auth.user.id, showParam: 'comments' })">My Comments</a></li>
                    <li class="divider"></li>
                    <li role="menuitem"><a ui-sref="logout">Log out</a></li>
                  </ul>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>
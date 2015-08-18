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
            <a class="navbar-brand" href="#">Blog</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li>
                    <a href="{{ url('/articles') }}"><span class="glyphicon glyphicon-home"></span> Home</a>
                </li>
                @if(Auth::check())
                    @if(Auth::user()->group_id <= 2) 
                    <li>
                        <a href="{{ url('/articles/create') }}"><span class="glyphicon glyphicon-plus"></span> Add article</a>
                    </li>
                    @endif                
                    @if(Auth::user()->group_id === 1)
                    <li>
                        <a href="#"><span class="glyphicon glyphicon-cog"></span> Manage blog</a>
                    </li>
                    @endif
                @endif
            </ul>

            <ul class="nav navbar-nav navbar-right">
                @if(Auth::check())
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span> <b>{{ ucfirst(Auth::user()->username) }}</b> <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li><a href="{{ url('/users/'. Auth::user()->id) }}">Show Profile</a></li>
                    @unless(Auth::user()->group_id > 2)
                    <li><a href="{{ url('/articles/users/'. Auth::user()->id) }}">My Articles</a></li>
                    @endunless
                    <li><a href="{{ url('/comments/users/'. Auth::user()->id) }}">My Comments</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="{{ url('/auth/logout') }}">Log out</a></li>
                  </ul>
                </li>
                @else
                <a href="{{ url('/auth/login') }}" type="button" class="btn btn-primary navbar-btn"><span class="glyphicon glyphicon-log-in"></span> Sign in</a>
                @endif
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>
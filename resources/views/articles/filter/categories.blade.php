@extends('app')

@section('content')

    <!-- Blog Entries Column -->
    <div class="col-md-8">

        <!-- Blog Posts -->
        @if(count($articles) < 1)
            <h4>No posts to display</h4>
        @else

            <!-- Page Breadcrumb -->
            @include('articles._breadcrumb', ['route' => 'filter categories'])

            @foreach($articles as $article)

                @if(Auth::check())
                    @if((Auth::user()->username === $article->user->username) or (Auth::user()->group_id === 1))

                        {!! Form::open(['method' => 'delete', 'url' => 'articles/'. $article->slug, 'id' => $article->id]) !!}

                            <!-- Article -->
                            @include('articles._article', ['article' => $article, 'route' => 'index', 'routeCategory' => 'true'])

                        {!! Form::close() !!}

                        <!-- Modal message on deleting article -->
                        @include('articles.modals.delete_article', ['id' => $article->id, 'title' => $article->title])

                    @else

                        <!-- Article -->
                        @include('articles._article', ['article' => $article, 'route' => 'index', 'routeCategory' => 'true'])

                    @endif
                @else

                    <!-- Article -->
                    @include('articles._article', ['article' => $article, 'route' => 'index', 'routeCategory' => 'true'])
                    
                @endif

                <hr>

            @endforeach

        <!-- Pager -->
        {!! $articles->render() !!}
        @endif

    </div>
@endsection

@section('sidebar')
    @include('articles._sidebar')
@endsection

@section('footer')

<script>
    function deleteArticle(id) {
        document.getElementById(id).submit();
    }
</script>

@endsection
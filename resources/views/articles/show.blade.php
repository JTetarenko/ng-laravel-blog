@extends('app')

@section('content')
	<!-- Blog Entries Column -->
    <div class="col-md-8">

        <!-- Page Breadcrumb -->
        @include('articles._breadcrumb', ['route' => 'show'])

        <!-- Article -->
        @if(Auth::check())
            @if((Auth::user()->username === $article->user->username) or (Auth::user()->group_id === 1))

                {!! Form::open(['method' => 'delete', 'url' => 'articles/'. $article->slug, 'id' => $article->id]) !!}

                    <!-- Article -->
                    @include('articles._article', ['article' => $article, 'route' => 'show'])

                {!! Form::close() !!}

                <!-- Modal message on deleting article -->
                @include('articles.modals.delete_article', ['id' => $article->id, 'title' => $article->title])

            @else

                <!-- Article -->
                @include('articles._article', ['article' => $article, 'route' => 'show'])

            @endif
        @else

            <!-- Article -->
            @include('articles._article', ['article' => $article, 'route' => 'show'])

        @endif

        <!-- Article comments -->
        @include('articles.comments.show')

    </div>
@endsection

@section('sidebar')
	@include('articles._sidebar')
@endsection

@section('footer')

<script type="text/javascript">

    function deleteArticle(id) {
        document.getElementById(id).submit();
    }

    function deleteComment(id){
        document.getElementById("comment" + id).submit();
    }

    CKEDITOR.replace( 'body', { 
        customConfig: "{{ asset('ckeditor/comments-config.js') }}"
    });
</script>

@endsection
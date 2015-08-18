<article>
    <h2>
        @if($route === 'show')
            {!! $article->title !!}
        @elseif ($route === 'index')
    	    <a href="{{ url('/articles/'. $article->slug) }}">{{ $article->title }}</a>
        @endif
    	@if(Auth::check())
            @if((Auth::user()->username === $article->user->username) or (Auth::user()->group_id === 1))
            <a role="button" class="btn btn-xs btn-default" href="{{ url('/articles/'. $article->slug .'/edit') }}" style="margin-right: -5px"><span class="glyphicon glyphicon-pencil"></span></a>
            <button type="button" class="btn btn-xs btn-default" data-toggle="modal" data-target=".bs-{{ $article->id }}-modal-sm"><span class="glyphicon glyphicon-remove"></span></button>
            @endif
        @endif
    </h2>
    <p class="lead">
        by <a href="{{ url('/users/'. $article->user_id) }}">{{ ucfirst($article->user->username) }}</a>
    </p>
    <p>
        <span class="glyphicon glyphicon-book"></span>
        @foreach($article->categories()->get() as $category)
            @if (isset($routeCategory))
                @if ($filterCategory->id === $category->id)
                    <a href="{{ url('articles/categories/'. $category->id) }}" class="label label-danger">{{ $category->name }}</a>
                @else
                    <a href="{{ url('articles/categories/'. $category->id) }}" class="label label-default">{{ $category->name }}</a>
                @endif
            @else
                <a href="{{ url('articles/categories/'. $category->id) }}" class="label label-default">{{ $category->name }}</a>
            @endif
        @endforeach
    </p>
    <p><span class="glyphicon glyphicon-time"></span> {{ $article->published_at->diffForHumans() }}</p>
    @if($route === 'index')
        <p>
            <span class="glyphicon glyphicon-edit"></span> 
            @if (count($article->comments) > 1)
                <a href="{{ url('/articles/'. $article->slug .'#comments') }}">{{ count($article->comments) }} comments</a>
            @elseif (count($article->comments) === 1)
                <a href="{{ url('/articles/'. $article->slug .'#comments') }}">1 comment</a>
            @else
                No comments
            @endif
        </p>
    @endif
    <hr>
    <img class="img-responsive" src="{{ $article->image_url }}" alt="">
    <hr>

    @if($route === 'show')

        {!! $article->body !!}

        <hr id="comments">

        <!-- Article tags -->
        @unless($article->tags->isEmpty())
            <p>
                <span class="glyphicon glyphicon-tags" style="margin-right: 5px"></span> 
                @foreach($article->tags()->get() as $tag)
                    <a href="{{ url('articles/tags/'. $tag->id) }}" class="label label-primary"><b>#</b><i>{{ $tag->name }}</i></a>
                @endforeach
            </p>
        @endunless

    @elseif ($route === 'index')

        {!! $article->excerpt !!}
        <a class="btn btn-primary" href="{{ url('/articles/'. $article->slug) }}" style="font-size: 11px">Read More <span class="glyphicon glyphicon-chevron-right"></span></a>
        
        @if (isset($filterTag))
            <!-- Article tags -->
            @unless($article->tags->isEmpty())
                <p style="margin-top: 10px">
                    <span class="glyphicon glyphicon-tags" style="margin-right: 5px"></span> 
                    @foreach($article->tags()->get() as $tag)
                        @if ($filterTag->id === $tag->id)
                            <a href="{{ url('articles/tags/'. $tag->id) }}" class="label label-danger"><b>#</b><i>{{ $tag->name }}</i></a>
                        @else
                            <a href="{{ url('articles/tags/'. $tag->id) }}" class="label label-primary"><b>#</b><i>{{ $tag->name }}</i></a>
                        @endif
                    @endforeach
                </p>
            @endunless
        @endif
    @endif
</article>
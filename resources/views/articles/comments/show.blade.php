@if (count($article->comments) > 0)
    <fieldset>
        <legend>Comments ({{ count($article->comments) }})</legend>
        @foreach($comments = \App\Article::find($article->id)->comments()->latest('created_at')->paginate(5) as $comment)

        @if(Auth::check())
            @if((Auth::user()->username === $comment->user->username) or (Auth::user()->group_id === 1))
               {!! Form::open(['method' => 'delete', 'url' => 'comments/'. $article->slug .'/'. $comment->id, 'id' => 'comment'. $comment->id]) !!}
            @endif
        @endif
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
                <a href="{{ url('/users/'. $comment->user->id) }}"><b>{{ ucfirst($comment->user->username) }}</b></a> {{ $comment->created_at->diffForHumans() }}
            @if(Auth::check())
                @if((Auth::user()->username === $comment->user->username) or (Auth::user()->group_id === 1))
                <a role="button" class="btn btn-xs btn-default" href="{{ url('/comments/'. $article->slug .'/'. $comment->id .'/edit#comment-form') }}" style="margin-right: -3px"><span class="glyphicon glyphicon-pencil"></span></a>
                <button type="button" class="btn btn-xs btn-default" data-toggle="modal" data-target=".bs-comment{{ $comment->id }}-modal-sm"><span class="glyphicon glyphicon-remove"></span></button>
                @endif
            @endif
            </h3>
          </div>
          <div class="panel-body">
            {!! $comment->body !!}
          @if ($comment->created_at != $comment->updated_at)
          </div>
          <div class="panel-footer">
          <i>{{ ucfirst($comment->edited) }} edited {{ $comment->updated_at->diffForHumans() }}</i>  
          </div>
          @else
          </div>
          @endif
        </div>
        @if(Auth::check())
            @if((Auth::user()->username === $comment->user->username) or (Auth::user()->group_id === 1))

                {!! Form::close() !!}

                @if(Auth::check())
                    @include('articles.modals.delete_comment')
                @endif
            @endif
        @endif

        @endforeach
        <!-- Pager -->
        {!! $comments->render() !!}
    </fieldset>
@else
    <div class="well">No comments</div>
@endif

<span id="comment-form"></span>
@if(Auth::check())
    @if(isset($id))

        @include('articles.comments.edit', ['caption' => 'Edit comment', 'comment_id' => $id])

    @else

        @include('articles.comments.create', ['caption' => 'Create comment'])
        
    @endif
@endif
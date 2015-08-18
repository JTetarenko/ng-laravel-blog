@extends('app')

@section('content')

    <!-- Comments Column -->
    <div class="col-md-8">

      <!-- Page Breadcrumb -->
      @include('articles._breadcrumb', ['route' => 'filter user comments'])

      @if(count($comments) < 1)
        <h4>No comments to display</h4>
      @else

      <!-- Comments -->
      <comment>
        <fieldset>

          @foreach($comments as $comment)
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">
                    {{ $comment->created_at->diffForHumans() }}, 
                    <a href="{{ url('/users/'. $comment->user->id) }}"><b>{{ ucfirst($comment->user->username) }}</b></a> commented in <b><a href="{{ url('articles/'. $comment->article->slug .'#comments') }}">{{ $comment->article->title }}</a></b></h3>
              </div>
              <div class="panel-body">
                {!! $comment->body !!}
              </div>
            </div>
          @endforeach
        </fieldset>
      </comment>

      <!-- Pager -->
      {!! $comments->render() !!}
      @endif

    </div>
@endsection

@section('sidebar')
  @include('articles._sidebar')
@endsection

@endsection
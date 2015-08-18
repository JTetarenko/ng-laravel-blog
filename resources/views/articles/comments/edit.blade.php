<fieldset>
	<legend>{{ $caption }}</legend>
	{!! Form::model(\App\Comment::find($comment_id), ['method' => 'PATCH', 'url' => 'comments/'. $article->slug .'/'. $comment_id]) !!}
		@include('articles.comments._form')
	{!! Form::close() !!}
</fieldset>
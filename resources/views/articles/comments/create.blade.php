<fieldset>
	<legend>{{ $caption }}</legend>

	{!! Form::model($comment = new \App\Comment, ['url' => 'comments/'. $article->slug]) !!}
		@include('articles.comments._form')
	{!! Form::close() !!}
</fieldset>
@extends('app')

@section('content')
	@include('articles._breadcrumb', ['route' => 'edit'])
	
	<hr>
	{!! Form::model($article, ['method' => 'PATCH', 'url' => 'articles/' . $article->slug]) !!}
		@include('articles._form', ['SubmitButtonCaption' => 'Edit Article'])
	{!! Form::close() !!}

@endsection
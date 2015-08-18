@extends('app')

@section('content')
	@include('articles._breadcrumb', ['route' => 'create'])
	
	<hr>
	{!! Form::model($article = new \App\Article, ['url' => 'articles']) !!}
		@include('articles._form', ['SubmitButtonCaption' => 'Create Article'])
	{!! Form::close() !!}

@endsection
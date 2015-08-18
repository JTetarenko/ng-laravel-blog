{!! Form::token() !!}

@include('errors.errors')

<div class="form-group">
	{!! Form::textarea('body', null, ['class' => 'body', 'id' => 'body']) !!}
</div>

<div class="form-group">
	{!! Form::submit($caption, ['class' => 'btn btn-primary form-control']) !!}
</div>
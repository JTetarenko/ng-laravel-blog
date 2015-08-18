{!! Form::token() !!}

@include('errors.errors')

<div class="form-group">
	{!! Form::label('slug', 'Slug:') !!}
	{!! Form::text('slug', null, ['class' => 'form-control', 'placeholder' => 'Article slug']) !!}
</div>

<div class="form-group">
	{!! Form::label('category_list', 'Categories:') !!}
	{!! Form::select('category_list[]', $categories, null, ['id' => 'category_list', 'class' => 'form-control', 'multiple']) !!}
</div>

<div class="form-group">
	{!! Form::label('title', 'Title:') !!}
	{!! Form::text('title', null, ['class' => 'form-control', 'placeholder' => 'Article title']) !!}
</div>

<div class="form-group">
	{!! Form::label('excerpt', 'Excerpt:') !!}
	{!! Form::textarea('excerpt', null, ['class' => 'excerpt', 'id' => 'excerpt']) !!}
</div>

<div class="form-group">
	{!! Form::label('body', 'Body:') !!}
	{!! Form::textarea('body', null, ['class' => 'excerpt', 'id' => 'excerpt']) !!}
</div>

<div class="form-group">
	{!! Form::label('image_url', 'Image URL (900x300):') !!}
	{!! Form::text('image_url', null, ['class' => 'form-control', 'placeholder' => 'Image url...']) !!}
</div>

<div class="form-group">
	{!! Form::label('publish_at', 'Publish on:') !!}
	{!! Form::input('date', 'published_at', $article->published_at->format('Y-m-d'), ['class' => 'form-control']) !!}
</div>

<div class="form-group">
	{!! Form::label('tag_list', 'Tags (Optional):') !!}
	{!! Form::select('tag_list[]', $tags, null, ['id' => 'tag_list', 'class' => 'form-control', 'multiple']) !!}
</div>

<div class="form-group">
	{!! Form::submit($SubmitButtonCaption, ['class' => 'btn btn-primary form-control']) !!}
</div>

@section('footer')
	<script src="//cdn.ckeditor.com/4.5.1/full/ckeditor.js"></script>
	<script type="text/javascript">
		CKEDITOR.replace( 'excerpt', { 
			customConfig: "{{ asset('ckeditor/excerpt-config.js') }}"
		});

		CKEDITOR.replace( 'body', { 
			customConfig: "{{ asset('ckeditor/body-config.js') }}"
		});
		
		$('#category_list').selectpicker();

		$('#tag_list').select2({
			placeholder: 'Choose tags',
			tags: true,
			maximumSelectionSize: 10,
		});
	</script>
@endsection
<!-- Validation errors block !-->
@if ($errors->any())
<div class="alert alert-danger">
	<b>Woops!</b> There were some problems with your input:
	<ul style="list-style-type: circle">
	@foreach($errors->all() as $error)
	<li>{{ $error }}</li>
	@endforeach
	</ul>
</div>
@endif
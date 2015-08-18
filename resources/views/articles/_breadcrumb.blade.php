@if ($route === 'index')
	<ol class="breadcrumb">
	  <li class="active">Articles</li>
	</ol>
@elseif ($route === 'show')
	<ol class="breadcrumb">
	  <li><a href="{{ url('/articles') }}">Articles</a></li>
	  <li class="active">{{ $article->title }}</li>
	</ol>
@elseif ($route === 'create')
	<ol class="breadcrumb">
	  <li><a href="{{ url('/articles') }}">Articles</a></li>
	  <li class="active">Creating article</li>
	</ol>
@elseif ($route === 'edit')
	<ol class="breadcrumb">
	  <li><a href="{{ url('/articles') }}">Articles</a></li>
	  <li><a href="{{ url('/articles/'. $article->slug) }}">{{ $article->title }}</a></li>
	  <li class="active">Editing {{ $article->title }}</li>
	</ol>
@elseif ($route === 'users')
	<ol class="breadcrumb">
	  <li><a href="{{ url('/articles') }}">Articles</a></li>
	  <li class="active">{{ ucfirst($user->username) }}</li>
	</ol>
@elseif ($route === 'filter categories')
	<ol class="breadcrumb">
	  <li><a href="{{ url('/articles') }}">Articles</a></li>
	  <li class="active">Filtered by category: <b>{{ $filterCategory->name }}</b></li>
	</ol>
@elseif ($route === 'filter tags')
	<ol class="breadcrumb">
	  <li><a href="{{ url('/articles') }}">Articles</a></li>
	  <li class="active">Filtered by tag: <b>{{ $filterTag->name }}</b></li>
	</ol>
@elseif ($route === 'filter authors')
	<ol class="breadcrumb">
	  <li><a href="{{ url('/articles') }}">Articles</a></li>
	  <li><a href="{{ url('/users/'. $filter->id) }}">{{ ucfirst($filter->username) }}</a></li>
	  <li class="active">Filtered by author: <b>{{ ucfirst($filter->username) }}</b></li>
	</ol>
@elseif ($route === 'filter user comments')
	<ol class="breadcrumb">
	  <li><a href="{{ url('/articles') }}">Articles</a></li>
	  <li><a href="{{ url('/users/'. $user->id) }}">{{ ucfirst($user->username) }}</a></li>
	  <li class="active"><b>{{ ucfirst($user->username) }}'s</b> comments ({{ count($user->comments) }})</li>
	</ol>
@elseif ($route === 'search articles')
	<ol class="breadcrumb">
	  <li><a href="{{ url('/articles') }}">Articles</a></li>
	  <li class="active">Search where: <b>{{ $filter->name }}</b></li>
	</ol>
@endif
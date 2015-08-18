<ol class="breadcrumb">
	<li><a ui-sref="articles">Articles</a></li>
	<li><a ui-sref="articles_show({ articleSlug: article.slug })">@{{ article.title }}</a></li>
	<li class="active">Edit article</li>
</ol>

<div class="form-group">
	<label>Slug:</label>
	<input type="text" ng-model="slug" class="form-control" placeholder="Article slug">
</div>

<div class="form-group">
	<label>Categories:</label>
	<select id="category_list" ng-model="selectedCategories" multiple="multiple" class="form-control">
	    <option ng-repeat="category in categories" value="@{{category.id}}">@{{ category.name }}</option>
	</select>
</div>

<div class="form-group">
	<label>Title:</label>
	<input type="text" ng-model="title" class="form-control" placeholder="Article title"> 
</div>

<div class="form-group">
	<label>Excerpt:</label>
	<textarea ng-model="excerpt" ck-editor></textarea>
</div>

<div class="form-group">
	<label>Body:</label>
	<textarea ng-model="body" ck-editor></textarea>
</div>

<div class="form-group">
	<label>Image URL (900x300):</label>
	<input type="text" ng-model="image_url" class="form-control" placeholder="Image URL..."> 
</div>

<div class="form-group">
	<label>Publish on:</label>
	<input type="date" ng-model="published_at" class="form-control"> 
</div>

<div class="form-group">
	<label>Tags (Optional):</label>
	<select id="tag_list" ng-model="tag_list" multiple="multiple" class="form-control" placeholder="Select or type tags">
	    <option ng-repeat="tag in tags" value="@{{tag.id}}">@{{ tag.name }}</option>
	</select>
</div>

<div class="form-group">
	<button class="btn btn-primary" ng-click="edit()">Edit article</button>
</div>

<script type="text/javascript">
	$('#category_list').select2({
		tags: false,
		placeholder: "Select categories"
	});

	$('#tag_list').select2({
		tags: true,
  		placeholder: "Select or type tags"
	});
</script>
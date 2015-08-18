<div ng-controller="notificationController"></div>

<!-- Blog Entries Column -->
<div class="col-md-8">

	<ol class="breadcrumb">
		<li><a ui-sref="articles">Articles</a></li>
		<li class="active" ng-show="filterCategory !== undefined">Filtered by category: @{{ filterCategory.name }}</li>
		<li class="active" ng-show="filterTag !== undefined">Filtered by tag: @{{ filterTag.name }}</li>
	</ol>

	<articles ng-init="getArticles()">

		<div ng-hide="articles.length > 0">
			<p>No articles to display</p>
		</div>

		<div ng-show="articles.length > 0">
			<div ng-repeat="article in articles" class="fade">
		
				<h2>
					<a ui-sref="articles_show({ articleSlug: article.slug })">@{{ article.title }}</a>
					<span ng-show="auth.user.id === article.user.id || auth.user.group_id === 1">
						<a role="button" class="btn btn-xs btn-default" ui-sref="articles_edit({ articleSlug: article.slug })" style="margin-right: -5px"><span class="glyphicon glyphicon-pencil"></span></a>
	            		<button type="button" class="btn btn-xs btn-default" ng-click="delete(article.slug)"><span class="glyphicon glyphicon-remove"></span></button>
            		</span>
				</h2>

				<p class="lead" style="margin-bottom: 10px">
			        by <a ui-sref="users_show({ userID: article.user.id })" style="text-transform: capitalize">@{{ article.user.username }}</a>
			    </p>
			    <p>
			        <span class="glyphicon glyphicon-book"></span>
			        <a ng-repeat="category in article.categories" ui-sref="articles_filter({ filterBy: 'categories', filterID: category.id })" class="label label-default" style="margin-right: 2px">@{{ category.name }}</a>
			    </p>
			    <p><span class="glyphicon glyphicon-time"></span> <span time-ago from-time='@{{ article.published_at.date }}'></span time-ago></p>
			    <p>
			        <span class="fa fa-comments"></span> 
			        <a ui-sref="articles_show({ articleSlug: article.slug })" ng-if="article.comments.length>1">@{{ article.comments.length }} comments</a>
			        <a ui-sref="articles_show({ articleSlug: article.slug })" ng-if="article.comments.length === 1">1 comment</a>
			        <span ng-if="article.comments.length === 0">No comments</span>
			    </p>
			    <hr>
			    <img class="img-responsive" ng-src="@{{ article.image_url }}" alt="" width="900px" height="300px">
			    <hr>
			    <span ng-bind-html="article.excerpt"></span>
			    <a ui-sref="articles_show({ articleSlug: article.slug })" class="btn btn-default" style="font-size: 11px">Read more...</a>
			</div>

			<div>
				<posts-pagination></posts-pagination>
			</div>
		</div>

	</articles>

</div>

@include('blog::articles._sidebar')
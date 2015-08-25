<div ng-controller="notificationController"></div>

<!-- Blog Entries Column -->
<div class="col-md-8">

    <ol class="breadcrumb">
        <li><a ui-sref="articles">Articles</a></li>
        <li class="active">@{{ article.title }}</li>
    </ol>

    <article>

        <h2>
            @{{ article.title }}
            <span ng-show="auth.user.id === article.user.id || auth.user.group_id === 1">
                <a role="button" class="btn btn-xs btn-default" ui-sref="articles_edit({ articleSlug: article.slug })" style="margin-right: -5px"><span class="glyphicon glyphicon-pencil"></span></a>
                <button type="button" class="btn btn-xs btn-default" ng-click="delete()"><span class="glyphicon glyphicon-remove"></span></button>
            </span>
        </h2>

        <p class="lead" style="margin-bottom: 10px">
            by <a ui-sref="users_show({ userID: article.user.id })" style="text-transform: capitalize">@{{ article.user.username }}</a>
        </p>
        <p>
            <span class="glyphicon glyphicon-book"></span>
            <a ng-repeat="category in article.categories" ui-sref="articles_filter({ filterBy: 'categories', filterID: category.id })" class="label label-default" style="margin-right: 3px">@{{ category.name }}</a>
        </p>
        <p><span class="glyphicon glyphicon-time"></span> <span time-ago from-time='@{{ article.published_at.date }}'></span time-ago></p>
        <hr>
        <img class="img-responsive" ng-src="@{{ article.image_url }}" alt="" width="900px" height="300px">
        <hr>
        <span ng-bind-html="article.body"></span>

        <div ng-if="article.tags.length > 0" style="margin-top: 1em">
            <span class="glyphicon glyphicon-tags" style="margin-right: 5px"></span> 
            <a ng-repeat="tag in article.tags" ui-sref="articles_filter({ filterBy: 'tags', filterID: tag.id })" class="label label-primary" style="margin-right: 2px"><b>#</b><i>@{{ tag.name }}</i></a>
        </div>

    </article>

    <comments id="comments">

        <fieldset style="margin-top: 1em">
            <legend>Comments (@{{ article.comments.length }})</legend>

            <div class="well" ng-if="article.comments.length === 0">
                No comments
            </div>

        <div ng-if="article.comments.length > 0">
            <treasure-overlay-spinner active='spinner.active'>
            <div ng-repeat="comment in article.comments | orderBy: '+created_at' | limitTo: amount" class="fade">
                <div class="panel panel-default">
                 <div class="panel-heading">
                   <h3 class="panel-title">
                        <a ui-sref="users_show({ userID: comment.user.id })"><b style="text-transform: capitalize">@{{ comment.user.username }}</b></a> <span time-ago from-time="@{{ comment.created_at }}"></span time-ago>

                        <span ng-show="auth.user.id === comment.user.id || auth.user.group_id === 1">
                            <a role="button" class="btn btn-xs btn-default" ui-sref="comments_edit({ articleSlug: article.slug, commentID: comment.id })" style="margin-right: -3px"><span class="glyphicon glyphicon-pencil"></span></a>
                            <button type="button" class="btn btn-xs btn-default" ng-click="deleteComment(comment.id)"><span class="glyphicon glyphicon-remove"></span></button>
                        </span>
                   </h3>
                  </div>
                  <div class="panel-body">
                   <span ng-bind-html="comment.body"></span>
                  </div>
                  <div class="panel-footer" ng-if="comment.created_at !== comment.updated_at">
                   <i><span style="text-transform: capitalize">@{{ comment.edited }}</span> edited <span time-ago from-time="@{{ comment.updated_at }}"></span time-ago></i>  
                  </div>
                </div>
            </div>
            </treasure-overlay-spinner>
            
            <span ng-hide="amount >= article.comments.length">
                <button class="btn btn-default" ng-click="loadComments()" ng-hide="loading">Load more...</button>
                <span ng-show="loading" ng-bind-html="loadSpinner"></span>
            </span>
        </div>
        </fieldset>

        <fieldset ng-controller="commentsCEController" ng-show="auth.loggedIn" style="margin-top: 1em">
            <div ng-show="type === 'create'">
                <legend>Add comment</legend>

                <div class="form-group">
                    <textarea ck-editor ng-model="create_body"></textarea>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary form-control" ng-click="create()">Add comment</button> 
                </div>
            </div>

            <div ng-show="type === 'edit'">
                <legend>Edit comment</legend>

                <div class="form-group">
                    <textarea ck-editor ng-model="edit_body"></textarea>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary form-control" ng-click="edit()">Edit comment</button> 
                </div>
            </div>
        </fieldset>

    </comments>

</div>

@include('blog::articles._sidebar')
<div ng-controller="notificationController"></div>

<ol class="breadcrumb">
    <li><a ui-sref="articles">Articles</a></li>
    <li class="active" style="text-transform: capitalize"><% user.username %></li>
</ol>

<div class="row">
    <div class="col-md-2">
        <div class="panel panel-primary" width="">
            <div class="panel-heading" ng-init="fontSize = '15px'">
                <p class="panel-title" style="text-transform: capitalize">
                    <span ng-hide="user.username.length<8" style="font-size: 13px"><% user.username %>'s profile</span>
                    <span ng-hide="user.username.length>7" style="font-size: 16px"><% user.username %>'s profile</span>
                </p>
            </div>
            <div class="panel-footer">
                <info>
                    <p><span class="fa fa-envelope" style="margin-right: 5px"></span> <span style="font-size: 11px"><% user.email %></span></p>
                    <p><span class="fa fa-users" style="margin-right: 5px"></span> <span style="font-size: 11px; color: blue"><% user.group.name %></span></p>
                </info>

                <div ng-show="auth.user.id === user.id || auth.user.group_id === 1" class="btn-group" dropdown dropdown-edit-user style="margin-left: 12px; margin-right: 12px">
                  <button id="edit-user" type="button" class="btn btn-primary" dropdown-toggle>
                    <span style="text-transform: capitalize">Edit profile</span> <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" role="menu" aria-labelledby="edit-user">
                    <li role="menuitem"><a ui-sref="users_edit({ userID: user.id, editParam: 'email' })">Change e-mail address</a></li>
                    <li role="menuitem"><a ui-sref="users_edit({ userID: user.id, editParam: 'password' })">Change password</a></li>
                  </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-10">
        <ul class="nav nav-pills" style="margin-bottom: 1em; margin-right: 30%; margin-left: 30%">
            <li ng-class="lastActive">
                 <a href="" ng-click="getActivities()">Last activities</a>
            </li>
            <li ng-class="articlesActive">
                 <a href="" ng-click="getArticles()"> <span class="badge pull-right"><% articles.length %></span> Articles</a>
            </li>
            <li ng-class="commentsActive">
                 <a href="" ng-click="getComments()"> <span class="badge pull-right"><% comments.length %></span> Comments</a>
            </li>
        </ul>

        <activities ng-hide="hideActivities">
            <p ng-hide="user.latest_activities.length > 0">No activities to display</p>
            <table class="table table-striped table-hover">
            <tr ng-repeat="activity in user.latest_activities">
                <td width="30px" style="font-size: 20px">
                    <span ng-hide="getFirstPart(activity.text) !== 'created article '" class="fa fa-plus-circle"></span> 
                    <span ng-hide="getFirstPart(activity.text) !== 'edited article '" class="fa fa-pencil-square"></span> 
                    <span ng-hide="getFirstPart(activity.text) !== 'deleted article '" class="fa fa-minus-circle"></span> 
                    <span ng-hide="getFirstPart(activity.text) !== 'commented in '" class="fa fa-commenting"></span> 
                    <span ng-hide="getFirstPart(activity.text) !== 'edited comment in '" class="fa fa-pencil-square"></span> 
                    <span ng-hide="getFirstPart(activity.text) !== 'deleted comment in '" class="fa fa-minus-circle"></span> 
                    <span ng-hide="getFirstPart(activity.text) !== 'edited profile '" class="fa fa-user-md"></span> 
                </td>
                <td style="text-align: left; font-size: 15px">
                    <span ng-hide="(getSecondPart(activity.text) === ' ' + user.username) || (getFirstPart(activity.text) === 'edited profile ')"><% getFirstPart(activity.text) %> <b><% getSecondPart(activity.text) %></b></span>
                    <span ng-hide="(getFirstPart(activity.text) !== 'edited profile ') || (getSecondPart(activity.text) === ' ' + user.username)">edited <b style="text-transform: capitalize"><% getSecondPart(activity.text) %></b> profile</span>
                    <span ng-hide="getSecondPart(activity.text) !== ' ' + user.username">edited his profile</span>
                </td>
                <td style="text-align: right">
                    <span class="fa fa-clock-o"></span> <span time-ago from-time='<% activity.created_at %>'></span time-ago>
                </td>
            </tr>
            </table>
        </activities>
        
        <articles ng-hide="hideArticles" style="background-color: #f5f5f5; border-radius: 4px">
            <treasure-overlay-spinner active='spinner.active'>
            <p ng-hide="articles.length > 0">No articles to display</p>
            <div class="row" ng-init="status = ''; watermark = 'passive-watermark'">
                <div class="fade col-md-4" ng-repeat="article in articles | limitTo: articlesAmount">
                    <div class="thumbnail" ng-class="status" ng-click="go('#/articles/' + article.slug)" ng-mouseenter="status = 'unselectable activated'; watermark = 'activated-watermark'" ng-mouseleave="status = ''; watermark = 'passive-watermark'">
                        <div class="caption" style="margin-bottom: -4.4em;">
                            <h4 ng-class="watermark" style="padding: 2px">
                                <% article.title %>
                            </h4>
                        </div>
                        <img ng-src="<% article.image_url %>">
                    </div>
                </div>
            </div>
            </treasure-overlay-spinner>
            <button ng-hide="articlesAmount>articles.length" class="btn btn-primary" ng-click="loadArticles()"><span class="fa fa-cloud-download"></span> Load more</button>
        </articles>

        <div ng-hide="hideComments">
            <treasure-overlay-spinner active='spinner.active'>
                <p ng-hide="comments.length > 0">No comments to display</p>
                <blockquote ng-repeat="comment in comments | limitTo: commentsAmount">
                    <span ng-bind-html="comment.body"></span>
                    <small style="margin-top: 5px"><span class="fa fa-user"></span> <span style="text-transform: capitalize"><% user.username %></span> <span class="fa fa-at"></span> <a href="#/articles/<% comment.article.slug %>" target="_blank"><% comment.article.title %></a> <span class="fa fa-clock-o"></span> <span time-ago from-time='<% comment.created_at %>'></span time-ago></small>
                </blockquote>
            </treasure-overlay-spinner>
        </div>
    </div>
</div>
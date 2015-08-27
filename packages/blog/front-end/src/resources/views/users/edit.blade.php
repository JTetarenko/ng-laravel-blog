<ol class="breadcrumb">
    <li><a ui-sref="articles">Articles</a></li>
    <li><a ui-sref="users_show({ userID: user.id })" style="text-transform: capitalize"><% user.username %></a></li>
    <li class="active">Change <% edit %></li>
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
                    <p><span class="fa fa-envelope" style="margin-right: 5px"></span> <span style="font-size: 10px"><% user.email %></span></p>
                    <p><span class="fa fa-users" style="margin-right: 5px"></span> <span style="font-size: 10px; color: blue"><% user.group.name %></span></p>
                </info>

                <div ng-show="auth.user.id === user.id" class="btn-group" dropdown dropdown-edit-user style="margin-left: 12px; margin-right: 12px">
                  <button id="edit-user" type="button" class="btn btn-primary" dropdown-toggle>
                    <span style="text-transform: capitalize">Edit profile</span> <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" role="menu" aria-labelledby="edit-user">
                    <li role="menuitem"><a ng-click="editEmail()" href="">Change e-mail address</a></li>
                    <li role="menuitem"><a ng-click="editPassword()" href="">Change password</a></li>
                  </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-10">
        <div class="form-horizontal">
        <div ng-show="edit === 'email'">
            <div class="form-group">
                <label class="col-md-4 control-label">New E-mail Address</label>
                <div class="col-md-6">
                    <input type="email" class="form-control" name="email" ng-model="email" required autofocus>
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-4 control-label">Confirm new E-mail Address</label>
                <div class="col-md-6">
                    <input type="email" class="form-control" name="email" ng-model="email_confirmation" required>
                </div>
            </div>

            <div class="form-group">
                <div class="col-md-6 col-md-offset-4">
                    <button ng-click="changeEmail()" class="btn btn-primary" style="margin-right: 15px;">
                        Change
                    </button>
                </div>
            </div>
        </div>

        <div ng-show="edit === 'password'">
            <div class="form-group">
                <label class="col-md-4 control-label">New Password</label>
                <div class="col-md-6">
                    <input type="password" class="form-control" name="password" ng-model="password" required autofocus>
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-4 control-label">Confirm New Password</label>
                <div class="col-md-6">
                    <input type="password" class="form-control" name="password_confirmation" ng-model="password_confirmation" required>
                </div>
            </div>

            <div class="form-group">
                <div class="col-md-6 col-md-offset-4">
                    <button ng-click="changePassword()" class="btn btn-primary" style="margin-right: 15px;">
                        Change
                    </button>
                </div>
            </div>
        </div>
        </div>
    </div>
</div>
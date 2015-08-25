<div ng-controller="notificationController"></div>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Login</div>
                <div class="panel-body">
                    <form class="form-horizontal">

                        <div class="form-group">
                            <label class="col-md-4 control-label">E-mail Address</label>
                            <div class="col-md-6">
                                <input type="email" class="form-control" name="email" ng-model="email" required autofocus>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Password</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control" name="password" ng-model="password" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button ng-click="login()" class="btn btn-primary" style="margin-right: 15px;">
                                    Login
                                </button>
                            </div>
                            <div class="col-md-6 col-md-offset-4" style="margin-top: 15px">
                                <a href="" ui-sref="register">Don't have account?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
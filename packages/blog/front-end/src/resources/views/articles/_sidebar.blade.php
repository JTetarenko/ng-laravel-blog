<!-- Blog Sidebar Widgets Column -->
<div class="col-md-4" ng-controller="sideBarController">

    <!-- Blog Categories Well -->
    <div class="well">
        <h4>
            Blog Categories
        </h4>
        <div class="row">
            <div class="col-lg-6">
                <ul class="category_list">
                    <li class="fade" ng-repeat="category in categories | orderBy: '+name'"><a ui-sref="articles_filter({ filterBy: 'categories', filterID: category.id })">@{{ category.name }}</a></li>
                </ul>
            </div>
        </div>
        <!-- /.row -->
    </div>

</div>
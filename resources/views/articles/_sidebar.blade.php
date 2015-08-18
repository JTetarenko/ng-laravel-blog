<!-- Blog Sidebar Widgets Column -->
<div class="col-md-4">

    <!-- Blog Search Well -->
    <div class="well">
        <h4>Blog Search</h4>
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search...">
            <span class="input-group-btn">
                <button class="btn btn-default" type="button">
                    <span class="glyphicon glyphicon-search"></span>
            </button>
            </span>
        </div>
        <!-- /.input-group -->
    </div>

    <!-- Blog Categories Well -->
    <div class="well">
        <h4>
            Blog Categories
            @if(Auth::check())
                @if(Auth::user()->group_id === 1)
                <button type="button" class="btn btn-xs btn-default" data-toggle="modal" data-target=".bs-create-modal-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>

                @include('categories._create')
                
                @endif
            @endif
        </h4>
        <div class="row">
            <div class="col-lg-6">
                @if (count($categories) < 1)
                No categories
                @else
                <ul class="list-unstyled">
                    @foreach($categories as $category)
                    <li><a href="{{ url('articles/categories/'. $category->id) }}">{{ $category->name }}</a>
                    </li>
                    @endforeach
                </ul>
                @endif
            </div>
        </div>
        <!-- /.row -->
    </div>

</div>
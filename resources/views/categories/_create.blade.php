@if(Auth::check())
    @if(Auth::user()->group_id === 1)
    <!-- Create category modal form -->
    {!! Form::open(['url' => '/categories']) !!}
    <div class="modal fade bs-create-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
           <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Create category</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    {!! Form::text('name', null, ['class' => 'form-control', 'placeholder' => 'Category name']) !!}
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              {!! Form::submit('Create', ['class' => 'btn btn-primary']) !!}
            </div>
        </div>
      </div>
    </div>
    {!! Form::close() !!}
    @endif
@endif
<!-- Deleting modal message -->
<div class="modal fade bs-{{ $id }}-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Are you sure?</h4>
        </div>
        <div class="modal-body">
          You try to delete <i>{{ $title }}</i>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" onClick="deleteArticle({{ $id }})" class="btn btn-primary">Delete</button>
        </div>
    </div>
  </div>
</div>
<?php 

namespace Blog\db\Repositories\Interfaces;

/**
 * Interface CommentsInterface
 * @package Blog\db\Repositories\Interfaces
 */
interface CommentsInterface
{
    public function saveComment($request, $slug);
    public function editComment($request, $slug, $id);
    public function deleteComment($slug, $id);
}
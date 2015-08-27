<?php 

namespace Blog\db\Repositories\Interfaces;

/**
 * Interface CommentsInterface
 * @package Blog\db\Repositories\Interfaces
 */
interface CommentsInterface
{
    public function saveComment($body, $slug);
    public function editComment($body, $slug, $id);
    public function deleteComment($slug, $id);
}
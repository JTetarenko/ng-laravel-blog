<?php 

namespace Blog\db\Repositories;

use Blog\db\Repositories\Interfaces\CommentsInterface;
use Blog\db\Repositories\Repository;

// Eloquent models
use Blog\db\Models\Comment;

/**
 * Class CommentsRepository
 * @package Blog\db\Repositories
 */
class CommentsRepository extends Repository implements CommentsInterface
{
    /**
     * Define model
     */
    public function __construct()
    {
        $this->model = new Comment;
    }

    /**
     * Save comment
     * 
     * @param  string   $body
     * @param  string   $slug
     */
    public function saveComment($body, $slug)
    {
        return $this->model->saveComment($body, $slug);
    }

    /**
     * Edit comment
     * 
     * @param  string   $body
     * @param  string   $slug
     * @param  integer  $id
     */
    public function editComment($body, $slug, $id)
    {
        return $this->model->editComment($body, $slug, $id);
    }

    /**
     * Delete comment
     * 
     * @param  string   $slug
     * @param  integer  $id
     */
    public function deleteComment($article, $id)
    {
        $article->comments()->find($id)->delete();

        return $article;
    }
}
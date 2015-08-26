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
     * @param  Request  $request
     * @param  string   $slug
     */
    public function saveComment($request, $slug)
    {
        return $this->model->saveComment($request, $slug);
    }

    /**
     * Edit comment
     * 
     * @param  Request  $request
     * @param  string   $slug
     * @param  integer  $id
     */
    public function editComment($request, $slug, $id)
    {
        return $this->model->editComment($request, $slug, $id);
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
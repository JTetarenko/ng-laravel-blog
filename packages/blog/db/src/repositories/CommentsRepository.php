<?php 

namespace Blog\db\Repositories;

use Blog\db\Repositories\Interfaces\CommentsInterface;
use Blog\db\Repositories\Repository;

// Eloquent models
use Blog\db\Models\Comment;

use Spatie\Activitylog\ActivitylogFacade as Activity;
use JWTAuth;

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
        Comment::saveComment($request, $slug);
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
        Comment::editComment($request, $slug, $id);
    }

    /**
     * Delete comment
     * 
     * @param  string   $slug
     * @param  integer  $id
     */
    public function deleteComment($article, $id)
    {
        $title = $article->title;

        $article->comments()->find($id)->delete();

        Activity::log('deleted comment in @ '. $title, JWTAuth::parseToken()->authenticate());
    }
}
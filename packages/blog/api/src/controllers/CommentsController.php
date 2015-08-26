<?php

namespace Blog\Api\Controllers;

use Blog\Api\Requests;
use Blog\Api\Controllers\Controller;

// Repositories
use Blog\db\Repositories\Interfaces\CommentsInterface as Comment;
use Blog\db\Repositories\Interfaces\ArticlesInterface as Article;

// Requests
use Blog\Api\Requests\CommentRequest;

// Events
use App\Events\UserDoneActivity;

use Illuminate\Support\Facades\Response;

/**
 * Class CommentsController
 * @package Blog\Api\Controllers
 */
class CommentsController extends Controller
{
    /**
     * Comment repository
     */
    protected $comment;

    /**
     * Article repository
     */
    protected $article;

    /**
     * Edit comments can only user who created it or administator
     * Create comments can only authorised users
     *
     * @param Comment     $comment
     * @param Article     $article
     */
    public function __construct(Comment $comment, Article $article)
    {
        $this->middleware('edit.comment.permission', ['except' => ['store']]);
        $this->middleware('jwt.auth', ['only' => ['store']]);

        $this->comment = $comment;
        $this->article = $article;
    }

    /**
     * Create comment
     * 
     * @param  CommentRequest $request
     * @param  string         $slug    Article slug
     * @return json response                  
     */
    public function store(CommentRequest $request, $slug)
    {
        $article = $this->comment->saveComment($request, $slug);

        event(new UserDoneActivity('commented in @ '. $article->title));

        return response()->json(['success' => 'Comment successfully created!'], 200);
    }

    /**
     * Edit comment form
     * 
     * @param  string   $slug   Article slug
     * @param  integer  $id     Comment id
     * @return json response       
     */
    public function edit($slug, $id)
    {
        $article = $this->article->findArticle($slug);

        return ['article' => $article, 'body' => $this->comment->find($id)->body];
    }

    /**
     * Update comment
     * 
     * @param  CommentRequest $request 
     * @param  string         $slug    Article slug
     * @param  integer        $id      Comment id
     * @return json response
     */
    public function update(CommentRequest $request, $slug, $id)
    {
        $article = $this->comment->editComment($request, $slug, $id);

        event(new UserDoneActivity('edited comment in @ '. $article->title));

        return response()->json(['success' => 'Comment successfully edited!'], 200);
    }

    /**
     * Delete comment
     * 
     * @param  string   $slug   Article slug
     * @param  integer  $id     Comment id
     * @return json response       
     */
    public function destroy($slug, $id)
    {
        $article = $this->article->findArticle($slug);

        $this->comment->deleteComment($article, $id);

        event(new UserDoneActivity('deleted comment in @ '. $article->title));

        return response()->json(['success' => 'Category successfully deleted!'], 200);
    }
}

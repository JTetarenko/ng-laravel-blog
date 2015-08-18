<?php

namespace Blog\db\Models;

use Illuminate\Database\Eloquent\Model;

use Spatie\Activitylog\ActivitylogFacade as Activity;
use JWTAuth;

class Comment extends Model
{
	/**
	 * Fillable fields for comments
	 * 
	 * @var array
	 */
    protected $fillable = ['body'];

    /**
     * Comment have only one article
     * 
     * @return Relations Belongs-To-Articles
     */
    public function article()
    {
    	return $this->belongsTo(Article::class);
    }

    /**
     * Comment have only one user
     * 
     * @return Relations Belongs-To-Users
     */
    public function user()
    {
    	return $this->belongsTo(User::class);
    }

    /**
     * Save comment in database
     * 
     * @param  Request $request
     * @param  string $slug
     */
    public static function saveComment($request, $slug)
    {
        $article = Article::whereSlug($slug)->first();

        $comment = new Comment;

        $comment->user_id = JWTAuth::parseToken()->authenticate()->id;
        $comment->body = $request->body;

        $article->comments()->save($comment);

        Activity::log('commented in @ '. $article->title, JWTAuth::parseToken()->authenticate());
    }

    /**
     * Update comment in database
     * 
     * @param  Request $request 
     * @param  string $slug    
     * @param  integer $id      
     */
    public static function editComment($request, $slug, $id)
    {
        $article = Article::whereSlug($slug)->first();

        $comment = Comment::find($id);

        $comment->body = $request->body;
        $comment->edited = JWTAuth::parseToken()->authenticate()->username;

        $article->comments()->save($comment);

        Activity::log('edited comment in @ '. $article->title, JWTAuth::parseToken()->authenticate());
    }
}

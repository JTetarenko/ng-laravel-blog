<?php

namespace Blog\db\Models;

use Illuminate\Database\Eloquent\Model;

use Auth;

/**
 * Class Comment
 * @package Blog\db\Models
 */
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

        $comment->user_id = Auth::user()->id;
        $comment->body = $request->body;

        $article->comments()->save($comment);

        return $article;
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
        $comment->edited = Auth::user()->username;

        $article->comments()->save($comment);

        return $article;
    }
}

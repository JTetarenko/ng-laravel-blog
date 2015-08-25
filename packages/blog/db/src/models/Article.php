<?php

namespace Blog\db\Models;

use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;
use JWTAuth;
use Spatie\Activitylog\ActivitylogFacade as Activity;

/**
 * Class Article
 * @package Blog\db\Models
 */
class Article extends Model
{
    /**
     * Article model fillable columns
     * 
     * @var Array
     */
    protected $fillable = [
        'slug',
        'title',
        'excerpt',
        'body',
        'published_at',
        'image_url',
    ];

    /**
     * Set published_at attribute carbon date
     * 
     * @param Date $date
     */
    public function setPublishedAtAttribute($date)
    {
        $this->attributes['published_at'] = Carbon::createFromFormat('Y-m-d', $date);
    }

    /**
     * Put array in tag_list
     * 
     * @return Array of tags ids
     */
    public function getTagListAttribute()
    {
        return $this->tags->lists('id')->toArray();
    }

    /**
     * Put array in category_list
     * 
     * @return Array of categories ids
     */
    public function getCategoryListAttribute()
    {
        return $this->categories->lists('id')->toArray();
    }

    /**
     * Edit published_at attribute to Carbon object
     * 
     * @param Date $date
     * @return Carbon object
     */
    public function getPublishedAtAttribute($date)
    {
        return new Carbon($date);
    }

    /**
     * An user of articles
     * 
     * @return User model relationship (Many-One)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Article categories
     * 
     * @return Category model relationship (Many-Many)
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }

    /**
     * Article tags
     * 
     * @return Tag model relationship (Many-Many)
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }

    /**
     * Article comments
     * 
     * @return Comment model relationship (Has-Many)
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Scope published articles
     * 
     * @param Query-builder $query
     */
    public function scopePublished($query)
    {
        $query->where('published_at', '<=', Carbon::now());
    }

    /**
     * Scope articles by slug
     * 
     * @param Query-builder $query
     */
    public function scopeWhereSlug($query, $slug)
    {
        $query->where('slug', '=', $slug);
    }

    /**
     * Save article
     *
     * @param Request $request
     */
    public static function saveArticle($request)
    {
        $article = JWTAuth::parseToken()->authenticate()->articles()->create($request->all());

        $article->syncCategories($article, $request->category_list);

        if (!is_null($request->tag_list))
        {
            $article->syncTags($article, $request->tag_list);
        }

        Activity::log('created article @ '. $article->title, JWTAuth::parseToken()->authenticate());
    }

    /**
     * Edit article
     *
     * @param Article $article Article model
     * @param Request $request
     */
    public static function editArticle(Article $article, $request)
    {
        $article->update($request->except(['category_list', 'tag_list']));

        $article->syncCategories($article, $request->category_list);

        if (count($request->tag_list) > 0)
        {
            $article->syncTags($article, $request->tag_list);
        }
        else
        {
            $tags = $article->tags;

            $article->tags()->delete();
        }

        Activity::log('edited article @ '. $article->title, JWTAuth::parseToken()->authenticate());
    }

    /**
     * Syncing tags
     *
     * @param Article $article Article model
     * @param Array $tags
     */
    private function syncTags(Article $article, array $tags)
    {
        $currentTags = array_filter($tags, 'is_numeric');
        $newTags = array_diff($tags, $currentTags);

        foreach ($newTags as $newTag)
        {
          if ($tag = Tag::create(['name' => $newTag]))
            $currentTags[] = $tag->id;
        }

        $article->tags()->sync($currentTags);
    }

    /**
     * Syncing categories
     *
     * @param Article $article Article model
     * @param Array $categories
     */
    private function syncCategories(Article $article, array $categories)
    {
        $article->categories()->sync($categories);
    }
}
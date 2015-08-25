<?php

namespace Blog\db\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Category
 * @package Blog\db\Models
 */
class Category extends Model
{
    /**
     * Fillable fields for categories
     * 
     * @var array
     */
    protected $fillable = ['name'];
    
    /**
     * Category have many articles
     * 
     * @return Relations Belongs-To-Many-Articles
     */
    public function articles()
    {
        return $this->belongsToMany(Article::class);
    }
}

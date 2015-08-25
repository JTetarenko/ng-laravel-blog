<?php

namespace Blog\db\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Tag
 * @package Blog\db\Models
 */
class Tag extends Model
{
    /**
     * Fillable fields for tags
     * 
     * @var array
     */
    protected $fillable = ['name'];
    
    /**
     * Tag have many articles
     * 
     * @return Relations Belongs-To-Many-Articles
     */
    public function articles()
    {
        return $this->belongsToMany(Article::class);
    }
}

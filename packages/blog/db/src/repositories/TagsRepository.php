<?php 

namespace Blog\db\Repositories;

use Blog\db\Repositories\Interfaces\TagsInterface;
use Blog\db\Repositories\Repository;

// Eloquent models
use Blog\db\Models\Tag;

/**
 * Class TagsRepository
 * @package Blog\db\Repositories
 */
class TagsRepository extends Repository implements TagsInterface
{
    /**
     * Define model
     */
    public function __construct()
    {
        $this->model = new Tag;
    }

    /**
     * Find tag
     * 
     * @param  integer $id 
     * @return Tag     
     */
    public function findTag($id)
    {
        return $this->find($id);
    }

    /**
     * Get tags array
     * 
     * @return array
     */
    public function getTags()
    {
        $tags = $this->getList('name', 'id');

        $array = [];

        foreach($tags as $key => $value)
        {
            $array[] = [
                'id' => $key,
                'name' => $value
            ];
        }

        return $array;
    }

    /**
     * Find articles by tag
     * 
     * @param  integer $id 
     * @return Article     
     */
    public function findArticlesByTag($id)
    {
        $tag = $this->findTag($id);

        return $tag->articles()
        ->latest('published_at')
        ->with('categories')
        ->with('user')
        ->with('tags')
        ->with('comments')
        ->published()->paginate($this::PAGES);
    }
}
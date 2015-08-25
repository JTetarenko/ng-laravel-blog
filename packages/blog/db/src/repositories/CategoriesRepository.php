<?php 

namespace Blog\db\Repositories;

use Blog\db\Repositories\Interfaces\CategoriesInterface;
use Blog\db\Repositories\Repository;

// Eloquent models
use Blog\db\Models\Category;

/**
 * Class CategoriesRepository
 * @package Blog\db\Repositories
 */
class CategoriesRepository extends Repository implements CategoriesInterface
{
    /**
     * Define model
     */
    public function __construct()
    {
        $this->model = new Category;
    }

    /**
     * Save category
     * 
     * @param  Request $request
     */
    public function saveCategory($request)
    {
        Category::create($request->all());
    }

    /**
     * Find category
     * 
     * @param  integer $id
     * @return Category
     */
    public function findCategory($id)
    {
        return $this->find($id);
    }

    /**
     * Find articles by category
     * 
     * @param  integer $int
     * @return Category collection
     */
    public function findArticlesByCategory($id)
    {
        $category = $this->findCategory($id);

        return $category->articles()
            ->with('categories')
            ->with('user')
            ->with('tags')
            ->with('comments')
            ->latest('published_at')->published()->paginate($this::PAGES);
    }

    /**
     * Get categories list
     * 
     * @return array
     */
    public function getCategories()
    {
        $categories = $this->getList('name', 'id');

        $array = [];

        foreach($categories as $key => $value)
        {
            $array[] = [
                'id' => $key,
                'name' => $value
            ];
        }

        return $array;
    }

    /**
     * Get categories collection
     * @return Collection
     */
    public function getCategoriesCollection()
    {
        return Category::all();
    }
}
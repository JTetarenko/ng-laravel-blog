<?php 

namespace Blog\db\Repositories\Interfaces;

/**
 * Interface CategoriesInterface
 * @package Blog\db\Repositories\Interfaces
 */
interface CategoriesInterface
{
    public function saveCategory($request);
    public function findCategory($id);
    public function findArticlesByCategory($id);
    public function getCategories();
    public function getCategoriesCollection();
}
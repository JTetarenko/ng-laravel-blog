<?php 

namespace Blog\db\Repositories\Interfaces;

/**
 * Interface ArticlesInterface
 * @package Blog\db\Repositories\Interfaces
 */
interface ArticlesInterface
{
    public function getPublishedArticles();
    public function findArticle($slug);
    public function saveArticle($data, $category_list, $tag_list);
    public function editArticle($slug, $data, $category_list, $tag_list);
    public function deleteArticle($slug);
}
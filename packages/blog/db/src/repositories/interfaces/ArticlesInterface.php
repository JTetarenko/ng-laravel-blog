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
    public function saveArticle($request);
    public function editArticle($slug, $request);
    public function deleteArticle($slug);
}
<?php 

namespace Blog\db\Repositories;

use Blog\db\Repositories\Interfaces\ArticlesInterface;
use Blog\db\Repositories\Repository;

// Eloquent models
use Blog\db\Models\Article;

use Spatie\Activitylog\ActivitylogFacade as Activity;
use JWTAuth;

/**
 * Class ArticlesRepository
 * @package Blog\db\Repositories
 */
class ArticlesRepository extends Repository implements ArticlesInterface
{
    /**
     * Define model
     */
    public function __construct()
    {
        $this->model = new Article;
    }

    /**
     * Get published articles
     * 
     * @return Article collection
     */
    public function getPublishedArticles()
    {
        return $this->model->with('comments')
            ->with('categories')
            ->with('tags')
            ->with('user')
            ->latest('published_at')->published()->paginate($this::PAGES);;
    }

    /**
     * Find article
     * 
     * @param  string $slug
     * @return Article
     */
    public function findArticle($slug)
    {
        return $this->model->whereSlug($slug)
            ->with('user')
            ->with('comments')
            ->with('comments.user')
            ->with('categories')
            ->with('tags')->get()[0];
    }

    /**
     * Save article
     * 
     * @param  array   $data
     * @param  array   $category_list
     * @param  array   $tag_list
     */
    public function saveArticle($data, $category_list, $tag_list)
    {
        return $this->model->saveArticle($data, $category_list, $tag_list);
    }

    /**
     * Edit article
     * 
     * @param  string   $slug
     * @param  array    $data
     * @param  array    $category_list
     * @param  array    $tag_list
     */
    public function editArticle($slug, $data, $category_list, $tag_list)
    {
        $article = $this->findArticle($slug);

        return $this->model->editArticle($article, $data, $category_list, $tag_list);
    }

    /**
     * Delete article
     * 
     * @param  string $slug
     */
    public function deleteArticle($slug)
    {
        $article = $this->findArticle($slug);

        $article->delete();

        return $article;
    }
}
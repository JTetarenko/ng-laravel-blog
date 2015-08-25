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
     * @param  Request $request
     */
    public function saveArticle($request)
    {
        return $this->model->saveArticle($request);
    }

    /**
     * Edit article
     * 
     * @param  string   $slug
     * @param  Request  $request
     */
    public function editArticle($slug, $request)
    {
        $article = $this->findArticle($slug);

        return $this->model->editArticle($article, $request);
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
    }
}
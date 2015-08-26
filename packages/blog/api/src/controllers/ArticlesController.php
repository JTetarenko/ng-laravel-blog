<?php

namespace Blog\Api\Controllers;

use Blog\Api\Controllers\Controller as Controller;

// Repositories
use Blog\db\Repositories\Interfaces\ArticlesInterface as Article;
use Blog\db\Repositories\Interfaces\CategoriesInterface as Category;
use Blog\db\Repositories\Interfaces\TagsInterface as Tag;

// Requests
use Blog\Api\Requests\CreateArticleRequest;
use Blog\Api\Requests\EditArticleRequest;

// Events
use App\Events\UserDoneActivity;

use Illuminate\Support\Facades\Response;

/**
 * Class ArticlesController
 * @package Blog\Api\Controllers
 */
class ArticlesController extends Controller
{
    /**
     * Article repository
     */
    protected $article;

    /**
     * Tag repository
     */
    protected $tag;

    /**
     * Category list
     * 
     * @var array
     */
    protected $categoryList;

    /**
     * Tag list
     * 
     * @var array
     */
    protected $tagList;

    /** 
     * Edit article can only writers who created article or administrators
     * Create article can administrators and writers
     * Check article exsistance
     *
     * @param Article     $article
     * @param Category    $category
     * @param Tag         $tag
     */
    public function __construct(Article $article, Category $category, Tag $tag)
    {
        $this->middleware('admin_permission', ['only' => ['edit', 'update', 'destroy']]);
        $this->middleware('writer_permission', ['only' => ['create', 'store']]);
        $this->middleware('article_exsists', ['only' => ['show']]);

        $this->article = $article;
        $this->tag = $tag;

        $this->categoryList = $category->getCategories();
        $this->tagList = $this->tag->getTags();
    }

    /**
     * Display published articles
     *
     * @return json
     */
    public function index()
    {
        $articles = $this->article->getPublishedArticles();

        return $articles;
    }

    /**
     * Show form to create article
     *
     * @return json
     */
    public function create()
    {
        $tags = $this->tagList;

        $categories = $this->categoryList;

        return ['tags' => $tags, 'categories' => $categories];
    }

    /**
     * Save article in database
     *
     * @return json response
     */
    public function store(CreateArticleRequest $request)
    {
        $article = $this->article->saveArticle($request);

        event(new UserDoneActivity('created article @ '. $article->title));

        return response()->json(['success' => 'Article successfully created!'], 200);
    }

    /**
     * Show article
     *
     * @param  string $slug
     * @return json
     */
    public function show($slug)
    {
        $article = $this->article->findArticle($slug);

        return $article;
    }

    /**
     * Show form to edit article
     *
     * @param  string $slug
     * @return json
     */
    public function edit($slug)
    {
        $article = $this->article->findArticle($slug);

        $tags = $this->tagList;

        $categories = $this->categoryList;

        return ['article' => $article, 'tags' => $tags, 'categories' => $categories];
    }

    /**
     * Edit article in database
     *
     * @param  string $slug
     * @param  EditArticleRequest $request
     * @return json response
     */
    public function update($slug, EditArticleRequest $request)
    {
        $article = $this->article->editArticle($slug, $request);

        event(new UserDoneActivity('edited article @ '. $article->title));

        return response()->json(['success' => 'Article successfully edited'], 200);
    }

    /**
     * Remove article from database
     *
     * @param  string $slug
     * @return json response
     */
    public function destroy($slug)
    {
        $article = $this->article->deleteArticle($slug);

        event(new UserDoneActivity('deleted article @ '. $article->title));

        return response()->json(['success' => 'Article successfully deleted!'], 200);
    }

    /**
     * Filter articles by tags
     * 
     * @param  integer $id
     * @return json     
     */
    public function filterArticleTags($id)
    {
        $articles = $this->tag->findArticlesByTag($id);

        return $articles;
    }

    /**
     * Find tag
     * 
     * @param  integer $id 
     * @return json     
     */
    public function getTag($id)
    {
        return $this->tag->findTag($id);
    }
}

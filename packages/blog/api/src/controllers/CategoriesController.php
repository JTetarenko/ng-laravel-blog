<?php

namespace Blog\Api\Controllers;

use Illuminate\Http\Request;
use Blog\Api\Controllers\Controller;

// Laravel facade
use Illuminate\Support\Facades\Validator;

// Repository
use Blog\db\Repositories\Interfaces\CategoriesInterface as Category;

//Requests
use Blog\Api\Requests\CreateCategoryRequest;

use Illuminate\Support\Facades\Response;

/**
 * Class CategoriesController
 * @package Blog\Api\Controllers
 */
class CategoriesController extends Controller
{
    protected $category;

    /**
     * Only administators can create new category
     */
    public function __construct(Category $category)
    {
        $this->middleware('create.category.permission', ['only' => ['store']]);

        $this->category = $category;
    }

    /**
     * Display category list
     * 
     * @return json 
     */
    public function index()
    {
        $categories = $this->category->getCategoriesCollection();

        return $categories;
    }

    /**
     * Show category
     *
     * @param integer $id Category id
     * @return json
     */
    public function show($id)
    {
        return $this->category->findCategory($id);
    }

    /**
     * Create category
     * 
     * @param  Request $request 
     * @return json response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:categories|min:3|max:20',
        ]);

        if ($validator->fails())
        {
            return response()->json(['error' => 'Category not created! Please check category name and try again...'], 422);
        }

        $this->category->saveCategory($request);

        return response()->json(['success' => 'Category successfully created!'], 200);
    }

    /**
     * Filter articles by categories
     * @param  integer $id 
     * @return json     
     */
    public function filterArticleCategories($id)
    {
        $articles = $this->category->findArticlesByCategory($id);

        return $articles;
    }
}

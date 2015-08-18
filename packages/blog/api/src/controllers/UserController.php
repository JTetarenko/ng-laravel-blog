<?php

namespace Blog\Api\Controllers;

use Blog\Api\Controllers\Controller;

// Requests
use Blog\Api\Requests\EditPasswordRequest;
use Blog\Api\Requests\EditEmailRequest;
use Blog\Api\Requests\RegisterUserRequest;

// Repository
use Blog\db\Repositories\Interfaces\UsersInterface as User;

use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
        $this->middleware('user_exists', ['only' => ['show']]);
    }

    /**
     * Show user information
     * 
     * @param  integer $id
     * @return json
     */
    public function show($id)
    {
        $user = $this->user->findUser($id);

    	$latestActivities = $this->user->getUserLatestActivities($id);

        $json = array_add($user, 'latest_activities', $latestActivities);

    	return $json;
    }

    /**
     * Create user
     * 
     * @param  RegisterUserRequest $request 
     * @return json response
     */
    public function store(RegisterUserRequest $request)
    {
        $this->user->registerUser($request);

        return response()->json(['success' => 'User successfully created!'], 200);
    }

    /**
     * Change user e-mail address
     * 
     * @param  EditEmailRequest     $request 
     * @param  integer              $id      
     * @return json               
     */
    public function changeEmail(EditEmailRequest $request, $id)
    {
        $this->user->editProfile($request, $id);

        return response()->json(['success' => 'User successfully edited!'], 200);
    }

    /**
     * Change user password
     * 
     * @param  EditPasswordRequest  $request 
     * @param  integer              $id      
     * @return json                
     */
    public function changePassword(EditPasswordRequest $request, $id)
    {
        $this->user->editProfile($request, $id);

        return response()->json(['success' => 'User successfully edited!'], 200);
    }

    /**
     * Filter articles by users
     * 
     * @param  integer $id
     * @return json       
     */
    public function filterArticleUsers($id)
    {
        $articles = $this->user->findUserArticles($id);

        $filter = $this->user->findUser($id);

        return ['articles' => $articles, 'filter' => $filter];
    }

    /**
     * Filter user comments
     * 
     * @param  integer $id
     * @return json       
     */
    public function filterUserComments($id)
    {
        $comments = $this->user->findUserComments($id);

        $user = $this->user->findUser($id);

        return ['comments' => $comments, 'user' => $user];
    }
}

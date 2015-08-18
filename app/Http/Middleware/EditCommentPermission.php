<?php

namespace App\Http\Middleware;

use Tymon\JWTAuth\Middleware\BaseMiddleware;

use Closure;
use Illuminate\Support\Facades\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

use Blog\db\Models\Article;

class EditCommentPermission extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        /**
         * Check article and comment exsistance.
         */
        $article = Article::whereSlug($request->segment(2))->first();

        if ( is_null($article) )
        {
            return response()->json(['error' => 'Article not found!'], 404);
        }
        elseif ( is_null($article->comments->find($request->segment(4)) ))
        {
            return response()->json(['error' => 'Comment not found!'], 404);
        }

        /**
         * Check if user authenticated.
         */
        if (! $token = $this->auth->setRequest($request)->getToken()) {
            return $this->respond('tymon.jwt.absent', 'token_not_provided', 400);
        }

        try {
            $user = $this->auth->authenticate($token);
        } catch (TokenExpiredException $e) {
            return $this->respond('tymon.jwt.expired', 'token_expired', $e->getStatusCode(), [$e]);
        } catch (JWTException $e) {
            return $this->respond('tymon.jwt.invalid', 'token_invalid', $e->getStatusCode(), [$e]);
        }

        if (! $user) {
            return $this->respond('tymon.jwt.user_not_found', 'user_not_found', 404);
        }

        $this->events->fire('tymon.jwt.valid', $user);

        /**
         * Check if user have admin permissions or this comment is user's
         */
        if (($user->group_id > 1) and ($article->comments->find($request->segment(4))->user_id != $user->id))
        {
            return response()->json(['error' => 'You do not have permission, to access this page!'], 403);
        }

        return $next($request);
    }
}

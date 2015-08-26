<?php

namespace App\Http\Middleware;

use Tymon\JWTAuth\Middleware\BaseMiddleware;

use Closure;

use Illuminate\Support\Facades\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

/**
 * Class UserEditPermission
 * @package App\Http\Middleware
 */
class UserEditPermission extends BaseMiddleware
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
         * Check if user is authenticated.
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
         * Check if user have admin permissions or this is user profile
         */
        if ($request->segment(3) != $user->id)
        {
            if ($user->group_id > 1)
            {
                return response()->json(['error' => 'You do not have premission, to access this page!'], 403);
            }
        }

        return $next($request);
    }
}

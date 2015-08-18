<?php

namespace Blog\Api\Controllers;

use Blog\Api\Controllers\Controller;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class AuthController
 *
 * @package Blog\Api\Controllers
 */
class AuthController extends Controller
{
    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials))
            {
                return response()->json([ 'error' => 'Wrong email or password' ], 401);
            }
        }

        catch (JWTException $e)
        {
            // something went wrong whilst attempting to encode the token

            return response()->json([ 'error' => 'Could not create token!' ], 500);
        }

        // all good so return the token
        return response()->json(compact('token'), 200);
    }

    /**
     * Get authenticated user
     * 
     * @return json
     */
    public function getAuthenticatedUser()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

    /**
     * Refresh auth token
     * 
     * @return json
     */
    public function refreshToken()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], 401);

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], 401);

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], 401);
            
        }

        $token = JWTAuth::getToken();

        $user = JWTAuth::toUser($token);

        $newToken = JWTAuth::fromUser($user);

        return response()->json(['token' => $newToken], 200);
    }


}
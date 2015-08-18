<?php

namespace App\Http\Middleware;

use Closure;
use Blog\db\Models\User;
use Illuminate\Support\Facades\Response;

class RedirectIfUserNotExsists
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
        if (User::where('id', '=', $request->segment(3))->get()->isEmpty())
        {
            return response()->json(['error' => 'User not found!'], 404);
        }

        return $next($request);
    }
}